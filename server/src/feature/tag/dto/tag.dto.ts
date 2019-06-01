import { IsNotEmpty, Length, IsNumber } from 'class-validator';

export class TagDto {
  public id: string;

  @IsNotEmpty()
  @Length(1, 20)
  public name: string;

  @IsNotEmpty()
  @Length(1, 200)
  public descript: string;
}

export class QueryTagDto {
  public pageNo: number;
  public pageSize: number;
  public q?: string;
}
