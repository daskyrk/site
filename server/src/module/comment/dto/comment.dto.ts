import { IsInt, IsNotEmpty } from 'class-validator';

export class CommentAuthorDto {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public site: string;
}

export class CommentDto {
  public _id: string;

  @IsNotEmpty()
  public postId: string;

  public pid: string;

  @IsNotEmpty()
  public content: string;

  @IsNotEmpty()
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
  public range: string;
  public country: string;

  // 用户ua
  public agent: string;
}
