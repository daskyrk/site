import { PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryTagDto, TagDto } from './dto/tag.dto';
import { ITag } from './interface/tag.interface';

@Injectable()
export class TagService {
  constructor(@InjectModel('Tag') private readonly model: PaginateModel<ITag>) {}

  public async search({ pageNo = 1, pageSize = 10, keyword }: QueryTagDto) {
    const query = {} as any;
    const options: {
      sort: any;
      page: number;
      limit: number;
      select?: string;
      // populate: string[];
    } = {
      sort: { createdAt: -1 },
      page: Number(pageNo),
      limit: Number(pageSize),
      select: '-__v',
      // populate: ['tag'],
    };

    if (keyword) {
      const keywordReg = new RegExp(keyword);
      query.$or = [{ name: keywordReg }, { descript: keywordReg }];
    }

    return await this.model.paginate(query, options);
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
