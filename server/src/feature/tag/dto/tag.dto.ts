import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { string } from 'joi';

export class TagDto {
  public _id: string;

  @IsNotEmpty()
  @Length(1, 20)
  public name: string;

  public descript: string;
}

export class QueryTagDto {
  public pageNo: number;
  public pageSize: number;
  public keyword?: string;
}
