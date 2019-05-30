import { IsFQDN, IsInt, IsNotEmpty, IsString, Length, ValidateNested } from 'class-validator';

export class CommentAuthorDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  public email: string;

  @IsFQDN()
  public site: string;
}

export class CommentDto {
  public id: string;

  // 页面url，发邮件时用
  public pageUrl: string;

  @IsNotEmpty()
  public postId: string;

  public pid: string;

  @IsNotEmpty()
  @Length(0, 500)
  public content: string;

  @IsNotEmpty()
  @ValidateNested()
  public author: CommentAuthorDto;

  @IsInt()
  public likes: number;

  // 状态 0待审核 1通过 2不通过 3归档
  @IsInt()
  public state: number;

  // ip
  public ip: string;

  // ip 物理地址
  public city: string;
  public range: number[];
  public country: string;

  // 用户ua
  public agent: string;
}

export class QueryCommentDto {
  public id?: string;
  public postId?: string;
  public pageNo: number;
  public pageSize: number;
  public q?: string;
}
