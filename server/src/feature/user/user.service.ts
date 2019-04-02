import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserInfoDto } from './dto/user.dto';
import { IUser } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly model: Model<IUser>) {}

  public async search(keyword: string) {
    const query = {} as any;
    if (keyword) {
      const keywordReg = new RegExp(keyword);
      query.$or = [{ name: keywordReg }, { nick: keywordReg }];
    }

    return await this.model.find(query);
  }

  public async getById(id: string) {
    return await this.model.findById(id);
  }

  public async create(data: UserInfoDto): Promise<IUser> {
    const newModel = new this.model(data);
    return await newModel.save();
  }

  public async update(data: UserInfoDto) {
    const res = await this.model.findByIdAndUpdate(data._id, data, {
      new: true,
    });
    return res;
  }

  public async delete(id: string) {
    const res = await this.model.findByIdAndRemove(id);
    return res;
  }

}
