import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TagDto } from './dto/tag.dto';
import { ITag } from './interface/tag.interface';

@Injectable()
export class TagService {
  constructor(@InjectModel('Tag') private readonly model: Model<ITag>) {}

  public async search(keyword: string) {
    const query = {} as any;
    if (keyword) {
      const keywordReg = new RegExp(keyword);
      query.$or = [{ name: keywordReg }, { descript: keywordReg }];
    }

    return await this.model.find(query);
  }

  public async create(data: TagDto): Promise<ITag> {
    const createdCat = new this.model(data);
    return await createdCat.save();
  }

  public async update(data: TagDto) {
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
