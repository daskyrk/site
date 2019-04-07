import { ArticleInfoDto } from '../dto/article.dto';
import { BaseInterface } from '@/shared/base/base.interface';

export interface IArticle extends ArticleInfoDto, BaseInterface {
}

export enum ArticleType {
  READ = "READ",
  CODE = "CODE",
  THINK = "THINK",
}

export enum ArticleState {
  DRAFT = 1,
  RELEASE,
}
