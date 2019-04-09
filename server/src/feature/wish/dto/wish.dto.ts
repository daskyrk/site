import { IsNotEmpty, Length, IsBoolean } from 'class-validator';

export class WishDto {
  public id: string;

  @IsNotEmpty()
  @Length(1, 20)
  public name: string;

  @IsNotEmpty()
  @Length(1, 200)
  public content: string;

  @IsBoolean()
  public sticky: boolean;

  @IsBoolean()
  public public: boolean;

  @IsBoolean()
  public show: boolean;

  public extra: object;
}

export class QueryWishDto {
  public pageNo: number;
  public pageSize: number;
  public public?: boolean;
  public show?: boolean;
  public q?: string;
}
