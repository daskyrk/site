import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { IWish } from './interface/wish.interface';
import { BaseService } from '@/shared/base';
import { WishDto, QueryWishDto } from './dto/wish.dto';

@Injectable()
export class WishService extends BaseService<IWish> {
  constructor(@InjectModel('Wish') private readonly model: PaginateModel<IWish>) {
    super(model);
  }

  public async create(data: WishDto): Promise<IWish> {
    const newModel = new this.model(data);
    return await newModel.save();
  }

  public async search({ pageNo = 1, pageSize = 10, q }: QueryWishDto) {
    const query = {} as any;
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
