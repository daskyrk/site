import { Document } from 'mongoose';
import { CommentDto } from '../dto/comment.dto';

export interface IComment extends CommentDto, Document {
  _id: string;
}
