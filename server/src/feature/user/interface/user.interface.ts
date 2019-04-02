import { Document } from 'mongoose';
import { UserInfoDto } from '../dto/user.dto';

export interface IUser extends UserInfoDto, Document {
  _id: string;
}
