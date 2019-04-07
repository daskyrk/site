import { ImageDto, QueryImageDto } from './dto/image.dto';

import { BaseService } from '@/shared/base';
import { IImage } from './interface/image.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { PaginateModel } from 'mongoose';

@Injectable()
export class ImageService extends BaseService<IImage> {
  constructor(
    @InjectModel('Image') private readonly model: PaginateModel<IImage>,
  ) {
    super(model);
  }

  public async search({ pageNo = 1, pageSize = 10, q, postId }: QueryImageDto) {
    const query = {} as any;
    const options: {
      sort: any;
      page: number;
      limit: number;
    } = {
      sort: { createdAt: -1 },
      page: Number(pageNo),
      limit: Number(pageSize),
    };

    if (q) {
      const keywordReg = new RegExp(q, 'i');
      query.$or = [{ filename: keywordReg }];
    }

    if (postId) {
      query.$and = [{ postId }];
    }

    return await this.model.paginate(query, options);
  }

  public async create(data: ImageDto): Promise<IImage> {
    const image = new this.model(data);
    return await image.save();
  }
}
