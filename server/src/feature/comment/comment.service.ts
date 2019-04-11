import { CommentDto, QueryCommentDto } from './dto/comment.dto';

import { BaseService } from '@/shared/base';
import { IComment } from './interface/comment.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { PaginateModel } from 'mongoose';
import { Request } from 'express';
import geoip from 'geoip-lite';

@Injectable()
export class CommentService extends BaseService<IComment> {
  constructor(
    @InjectModel('Comment') private readonly model: PaginateModel<IComment>,
  ) {
    super(model);
  }

  public async search({ pageNo = 1, pageSize = 10, q }: QueryCommentDto) {
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
      select: '-ip',
      // populate: ['tag'],
    };

    // 关键词查询
    if (q) {
      const keywordReg = new RegExp(q, 'i');
      query.$or = [
        { title: keywordReg },
        { content: keywordReg },
        { description: keywordReg },
      ];
    }

    return await this.model.paginate(query, options);
  }

  public async createComment(data: CommentDto, req: Request) {
    // 获取ip地址以及物理地理地址
    let ip =
      req.headers['x-forwarded-for'] ||
      req.headers['x-real-ip'] ||
      req.connection.remoteAddress ||
      req.ip ||
      req.ips[0];
    ip = Array.isArray(ip) ? ip[0] : ip;
    ip.replace('::ffff:', '');
    data.ip = ip;
    data.agent = req.headers['user-agent'] || data.agent;

    const ipLocation = geoip.lookup(ip);

    if (ipLocation) {
      data.city = ipLocation.city;
      data.range = ipLocation.range;
      data.country = ipLocation.country;
    }
    const comment = await super.create(data);

    return await comment.save();
  }

  public async like(id: string) {
    const result = await this.model.findById(id);
    if (result) {
      result.likes += 1;
      result.save();
    }
    return result;
  }
}
