import { Module } from '@nestjs/common';
import { MongooseModule } from 'daskyrk-mongoose';
import { UserController } from './user.controller';
import { UserSchema } from './schema/user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
