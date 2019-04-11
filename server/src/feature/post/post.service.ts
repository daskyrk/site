import { PostInfoDto, QueryPostDto } from './dto/post.dto';

import { BaseService } from '@/shared/base';
import { IPost } from './interface/post.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { PaginateModel } from 'mongoose';

@Injectable()
export class PostService extends BaseService<IPost> {
  constructor(
    @InjectModel('Post') private readonly model: PaginateModel<IPost>,
  ) {
    super(model);
  }

  public async getPostById(id: string) {
    const res = await this.model.findById(id);
    if (res) {
      res.meta.views += 1;
      res.save();
    }

    return res;
  }

  public async create(data: PostInfoDto): Promise<IPost> {
    const post = new this.model(data);
    return await post.save();
  }

  public async search(query: QueryPostDto) {
    const {
      pageNo = 1,
      pageSize = 10,
      q,
      tag,
      state,
      type,
      startAt,
      endAt,
      hot,
    } = query;
    const querys = {} as any;
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
      select: '-content',
      // populate: ['tag'],
    };

    // 关键词查询
    if (q) {
      const keywordReg = new RegExp(q);
      querys.$or = [
        { title: keywordReg },
        { content: keywordReg },
        { description: keywordReg },
      ];
    }

    if (tag) {
      querys.tag = tag;
    }

    if (type) {
      querys.type = type;
    }

    if (state) {
      querys.state = state;
    }

    if (query.public) {
      querys.public = query.public;
    }

    if (startAt) {
      const startTime = new Date(+startAt);
      if (startTime.toString() !== 'Invalid Date') {
        querys.createdAt = {
          $gte: startTime,
        };
      }
    }

    if (endAt) {
      const endTime = new Date(+endAt);
      if (endTime.toString() !== 'Invalid Date') {
        querys.createdAt = querys.createdAt || {};
        querys.createdAt.$lt = endTime;
      }
    }

    // 按热度排行
    if (hot) {
      options.sort = {
        'meta.views': -1,
        'meta.likes': -1,
        'meta.comments': -1,
      };
    }

    return await this.model.paginate(querys, options);
  }

  public async getTypes() {
    return await this.model.distinct('type');
  }

  public async likePost(id: string) {
    const res = await this.model.findById(id);
    if (res) {
      res.meta.likes += 1;
      res.save();
    }

    return res;
  }

}
