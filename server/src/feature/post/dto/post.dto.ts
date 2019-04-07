import { IsBoolean, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { PostState, PostType } from '../interface/post.interface';

import { Transform } from 'class-transformer';

export class PostTransformDto {
  @Transform(v => PostState[v])
  public state: number;

  // @Transform(v => PostType[v])
  // public type: number;
}

export class PostInfoDto extends PostTransformDto {
  public id: string;

  @IsNotEmpty()
  @IsString()
  public title: string;

  public keyword: string;

  @IsNotEmpty()
  public content: string;

  @IsNotEmpty()
  @IsIn(Object.keys(PostType))
  public type: PostType;

  public description: string;

  public tag: string[];

  public thumb: string;

  @IsBoolean()
  public public: boolean;

  public meta: PostMetaDto;
}


export class PostMetaDto {
  public views: number;
  public likes: number;
  public comments: number;
}

export class QueryPostDto extends PostTransformDto {
  public pageNo = 1;
  public pageSize = 10;
  public q?: string;
  public tag?: string;
  public public?: boolean;
  public startAt?: string;
  public endAt?: string;
  public hot?: boolean;
  public type?: PostType;
}
