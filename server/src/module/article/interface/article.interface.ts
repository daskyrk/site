import { Document } from 'mongoose';
import { ArticleInfoDto } from '../dto/article.dto';

export interface Article extends ArticleInfoDto, Document {
  _id: string;
}

export enum Publish {
  PUBLIC = 1,
  PRIVATE,
}

export enum ArticleType {
  READ = "READ",
  CODE = "CODE",
  THINK = "THINK",
}

export enum ArticleState {
  RELEASE = 1,
  DRAFT,
}
