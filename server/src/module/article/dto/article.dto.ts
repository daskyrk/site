import { Transform } from 'class-transformer';
import { IsNumber, IsNotEmpty } from 'class-validator';
import { ArticleState, ArticleType } from '../interface/article.interface';

export class ArticleTransformDto {
  @Transform(v => ArticleState[v])
  public state: number;

  // @Transform(v => ArticleType[v])
  // public type: number;
}

export class ArticleInfoDto extends ArticleTransformDto {
  public _id: string;

  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public keyword: string;

  @IsNotEmpty()
  public content: string;

  @IsNotEmpty()
  // @IsNumber()
  public type: ArticleType;

  public meta: ArticleMetaDto;
}


export class ArticleMetaDto {
  public views: number;
  public likes: number;
  public comments: number;
}

export class QueryArticleDto extends ArticleTransformDto {
  public pageNo = 1;
  public pageSize = 10;
  public keyword?: string;
  public tag?: string;
  public publish?: boolean;
  public startAt?: string;
  public endAt?: string;
  public hot?: boolean;
  public type?: ArticleType;
}
