import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ImageDto {
  public id: string;

  @IsNotEmpty()
  public filename: string;

  @IsNotEmpty()
  public url: string;

  public timestamp: number;

  @IsString()
  public postId: string;

  public extra: object;
}

export class QueryImageDto {
  public pageNo: number;
  public pageSize: number;
  public q?: string;
}
