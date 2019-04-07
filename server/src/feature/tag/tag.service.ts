import { QueryTagDto, TagDto } from './dto/tag.dto';

import { BaseService } from '@/shared/base';
import { ITag } from './interface/tag.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { PaginateModel } from 'mongoose';

@Injectable()
export class TagService extends BaseService<ITag> {
  constructor(@InjectModel('Tag') private readonly model: PaginateModel<ITag>) {
    super(model);
  }

  public async search({ pageNo = 1, pageSize = 10, q }: QueryTagDto) {
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
      // select: '',
      // populate: ['tag'],
    };

    if (q) {
      const keywordReg = new RegExp(q, 'i');
      query.$or = [{ name: keywordReg }, { descript: keywordReg }];
    }

    return await this.model.paginate(query, options);
  }

  public async create(data: TagDto): Promise<ITag> {
    const newModel = new this.model(data);
    return await newModel.save();
  }

}
