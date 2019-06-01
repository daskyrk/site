import { IsNotEmpty, Length, IsBoolean } from 'class-validator';

export class TagDto {
  public id: string;

  @IsNotEmpty()
  @Length(1, 20)
  public name: string;

  @IsNotEmpty()
  @Length(1, 200)
  public description: string;

  @IsBoolean()
  public removed: boolean;
}

export class QueryTagDto {
  public pageNo: number;
  public pageSize: number;
  public q?: string;
}
