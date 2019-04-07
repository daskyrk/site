import { BaseInterface } from '@/shared/base/base.interface';
import { PostInfoDto } from '../dto/post.dto';

export interface IPost extends PostInfoDto, BaseInterface {
}

export enum PostType {
  ARTICLE = "ARTICLE",
  READ = "READ",
  THINK = "THINK",
}

export enum PostState {
  DRAFT = 1,
  RELEASE,
}
