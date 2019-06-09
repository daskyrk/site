import { ImageController } from './image.controller';
import { ImageSchema } from './schema/image.schema';
import { ImageService } from './image.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from 'daskyrk-mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
  ],
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
