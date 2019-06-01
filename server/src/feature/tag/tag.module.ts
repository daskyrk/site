import { Module } from '@nestjs/common';
import { MongooseModule } from 'daskyrk-mongoose';
import { TagController } from './tag.controller';
import { TagSchema } from './schema/tag.schema';
import { TagService } from './tag.service';
import { PostModule } from '@/feature/post/post.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tag', schema: TagSchema }]),
    PostModule,
  ],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule { }
