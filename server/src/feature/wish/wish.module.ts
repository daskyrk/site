import { Module } from '@nestjs/common';
import { WishService } from './wish.service';
import { WishController } from './wish.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WishSchema } from './schema/wish.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Wish', schema: WishSchema }]),
  ],
  providers: [WishService],
  controllers: [WishController],
})
export class WishModule {}
