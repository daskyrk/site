import { LoginDto, UserInfoDto } from './dto/user.dto';

import { BaseService } from 'shared/base';
import { IUser } from './interface/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { generateToken } from '@/utils/auth';
import utility from 'utility';

@Injectable()
export class UserService extends BaseService<IUser> {
  private projection: { password: boolean };

  constructor(@InjectModel('User') private readonly model: Model<IUser>) {
    super(model);
    this.projection = {
      password: false,
    };
  }

  public async search(keyword: string) {
    const query = {} as any;
    if (keyword) {
      const keywordReg = new RegExp(keyword, 'i');
      query.$or = [
        { email: keywordReg },
        { nick: keywordReg },
        { phone: keywordReg },
      ];
    }

    return await super.findAll(query, this.projection);
  }

  public async createUser(data: UserInfoDto) {
    const { email, password } = data;
    const exist = await super.findOne({ email }, this.projection);
    if (exist) {
      throw new Error('该email已注册');
    }

    const user = await super.create({
      ...data,
      password: utility.sha256(password),
    });
    const result = await user.save();
    const token = generateToken({ email });
    return {
      user: result,
      token,
    };
  }

  public async login(data: LoginDto) {
    const { email, password } = data;
    const user = await super.findOne({ email });
    if (!user) {
      throw new Error('该用户不存在');
    }
    if (user.password !== utility.sha256(password)) {
      throw new Error('密码错误');
    }
    const token = generateToken({ email });

    return {
      user,
      token,
    };
  }
}
