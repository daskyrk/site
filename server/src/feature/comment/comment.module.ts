import { CommentController } from './comment.controller';
import { CommentSchema } from './schema/comment.schema';
import { CommentService } from './comment.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from 'daskyrk-mongoose';
import { PostModule } from '@/feature/post/post.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
    PostModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule { }
