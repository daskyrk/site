import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserInfoDto {
  public _id: string;

  @IsNotEmpty()
  @Length(1, 30)
  public username: string;

  @IsNotEmpty()
  @Length(6, 30)
  public password: string;

  public nick: string;

  public slogan: string;

  public avatar: string;

  @IsEmail()
  public email: string;
  public address: string;
  public contact: string;
}
