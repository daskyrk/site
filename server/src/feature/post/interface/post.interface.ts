import { BaseInterface } from '@/shared/base/base.interface';
import { PostInfoDto } from '../dto/post.dto';

export interface IPost extends PostInfoDto, BaseInterface {
}

export enum PostType {
  READ = "READ",
  CODE = "CODE",
  THINK = "THINK",
}

export enum PostState {
  DRAFT = 1,
  RELEASE,
}
