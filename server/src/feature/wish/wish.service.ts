import { QueryWishDto, WishDto } from './dto/wish.dto';

import { BaseService } from '@/shared/base';
import { IWish } from './interface/wish.interface';
import { InjectModel } from 'daskyrk-mongoose';
import { Injectable } from '@nestjs/common';
import { PaginateModel } from 'mongoose';

@Injectable()
export class WishService extends BaseService<IWish> {
  constructor(@InjectModel('Wish') private readonly model: PaginateModel<IWish>) {
    super(model);
  }

  public async create(data: WishDto): Promise<IWish> {
    const newModel = new this.model(data);
    return await newModel.save();
  }

  public async search({ pageNo = 1, pageSize = 10, q, ...rest }: QueryWishDto) {
    const query = { ...rest } as any;
    const options: {
      sort: any;
      page: number;
      limit: number;
      select?: string;
    } = {
      sort: { createdAt: -1 },
      page: Number(pageNo),
      limit: Number(pageSize),
    };

    if (q) {
      const keywordReg = new RegExp(q, 'i');
      query.$or = [{ name: keywordReg }, { content: keywordReg }];
    }

    return await this.model.paginate(query, options);
  }
}
