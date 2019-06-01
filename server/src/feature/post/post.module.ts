import { Module } from '@nestjs/common';
import { MongooseModule } from 'daskyrk-mongoose';
import { PostController } from './post.controller';
import { PostSchema } from './schema/post.schema';
import { PostTagSchema } from './schema/post-tag.schema';
// import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    MongooseModule.forFeature([{ name: 'PostTag', schema: PostTagSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
