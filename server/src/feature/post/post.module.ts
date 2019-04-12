import { Module } from '@nestjs/common';
import { MongooseModule } from 'daskyrk-mongoose';
import { PostController } from './post.controller';
import { PostSchema } from './schema/post.schema';
// import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
