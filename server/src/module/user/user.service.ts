import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserInfoDto } from './dto/user.dto';
import { IUser } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  public async getAll() {
    return await this.userModel.find({});
  }

  public async getById(id: string) {
    return await this.userModel.findById(id);
  }

  public async create(data: UserInfoDto): Promise<IUser> {
    const createdCat = new this.userModel(data);
    return await createdCat.save();
  }

  public async update(data: UserInfoDto) {
    const res = await this.userModel.findByIdAndUpdate(data._id, data, {
      new: true,
    });
    return res;
  }

  public async delete(id: string) {
    const res = await this.userModel.findByIdAndRemove(id);
    return res;
  }

  public async search(keyword: string) {
    const query = {} as any;
    if (keyword) {
      const keywordReg = new RegExp(keyword);
      query.$or = [{ name: keywordReg }, { nick: keywordReg }];
    }

    return await this.userModel.find(query);
  }
}
