import { ArticleState, ArticleType } from '../interface/article.interface';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { Transform } from 'class-transformer';

export class ArticleTransformDto {
  @Transform(v => ArticleState[v])
  public state: number;

  // @Transform(v => ArticleType[v])
  // public type: number;
}

export class ArticleInfoDto extends ArticleTransformDto {
  public id: string;

  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  public keyword: string;

  @IsNotEmpty()
  public content: string;

  @IsNotEmpty()
  @IsEnum(ArticleType)
  public type: ArticleType;

  public description: string;

  public tag: string[];

  public thumb: string;

  @IsBoolean()
  public public: boolean;

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
  public q?: string;
  public tag?: string;
  public public?: boolean;
  public startAt?: string;
  public endAt?: string;
  public hot?: boolean;
  public type?: ArticleType;
}
