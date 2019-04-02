import { Document } from 'mongoose';
import { TagDto } from '../dto/tag.dto';

export interface ITag extends TagDto, Document {
  _id: string;
}
