import { PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ArticleInfoDto, QueryArticleDto } from './dto/article.dto';
import { Article } from './interface/article.interface';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Article') private readonly articleModel: PaginateModel<Article>,
  ) {}

  public async getArticleById(id: string) {
    const res = await this.articleModel.findById(id);
    if (res) {
      res.meta.views += 1;
      res.save();
    }

    return res;
  }

  public async create(data: ArticleInfoDto): Promise<Article> {
    const createdCat = new this.articleModel(data);
    return await createdCat.save();
  }

  public async update(data: ArticleInfoDto) {
    const res = await this.articleModel.findByIdAndUpdate(data._id, data, { new: true });
    return res;
  }

  public async delete(id: string) {
    const res = await this.articleModel.findByIdAndRemove(id);
    return res;
  }

  public async search({
    pageNo = 1,
    pageSize = 10,
    keyword,
    tag,
    state,
    publish,
    type,
    startAt,
    endAt,
    hot,
  }: QueryArticleDto) {
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
      // select: '-content -__v',
      // populate: ['tag'],
    };

    // 关键词查询
    if (keyword) {
      const keywordReg = new RegExp(keyword);
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

    if (publish) {
      querys.publish = publish;
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

    console.log('options:', options);

    // 按热度排行
    if (hot) {
      options.sort = {
        'meta.views': -1,
        'meta.likes': -1,
        'meta.comments': -1,
      };
    }

    return await this.articleModel.paginate(querys, options);
  }
}
