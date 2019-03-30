import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class TagDto {
  public _id: string;

  @IsNotEmpty()
  @Length(1, 20)
  public name: string;

  public descript: string;
}
