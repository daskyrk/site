import {
  IsDefined,
  IsEmail,
  IsFQDN,
  IsMobilePhone,
  Length,
} from 'class-validator';

export class LoginDto {
  @IsEmail() // gmail时validator验证要求用户名大于6个字符....
  @IsDefined({ message: "email can't not be empty" })
  public email: string;

  @IsDefined({ message: "password can't not be empty" })
  @Length(6, 30)
  public password: string;
}

export class UserInfoDto extends LoginDto {
  public _id: string;

  @Length(1, 30)
  public nick: string;

  @Length(1, 100)
  public slogan: string;

  public avatar: string;

  public address: string;

  @IsMobilePhone('zh-CN')
  public phone: string;

  @IsFQDN()
  public site: string;
}
