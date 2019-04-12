import { Module } from '@nestjs/common';
import { MongooseModule } from 'daskyrk-mongoose';
import { WishController } from './wish.controller';
import { WishSchema } from './schema/wish.schema';
import { WishService } from './wish.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Wish', schema: WishSchema }]),
  ],
  providers: [WishService],
  controllers: [WishController],
})
export class WishModule {}
