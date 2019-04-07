import { ArticleInfoDto, QueryArticleDto } from './dto/article.dto';

import { BaseService } from '@/shared/base';
import { IArticle } from './interface/article.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { PaginateModel } from 'mongoose';

@Injectable()
export class ArticleService extends BaseService<IArticle> {
  constructor(
    @InjectModel('Article') private readonly model: PaginateModel<IArticle>,
  ) {
    super(model);
  }

  public async getArticleById(id: string) {
    const res = await this.model.findById(id);
    if (res) {
      res.meta.views += 1;
      res.save();
    }

    return res;
  }

  public async create(data: ArticleInfoDto): Promise<IArticle> {
    const article = new this.model(data);
    return await article.save();
  }

  public async search(query: QueryArticleDto) {
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
}
