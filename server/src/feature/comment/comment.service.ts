import { PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentDto, QueryCommentDto } from './dto/comment.dto';
import { IComment } from './interface/comment.interface';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment') private readonly model: PaginateModel<IComment>,
  ) {}

  public async search({ pageNo = 1, pageSize = 10, keyword }: QueryCommentDto) {
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

    // 关键词查询
    if (keyword) {
      const keywordReg = new RegExp(keyword);
      query.$or = [
        { title: keywordReg },
        { content: keywordReg },
        { description: keywordReg },
      ];
    }

    return await this.model.paginate(query, options);
  }

  public async getById(id: string) {
    return await this.model.findById(id);
  }

  public async create(data: CommentDto): Promise<IComment> {
    const newModel = new this.model(data);
    return await newModel.save();
  }

  public async update(data: CommentDto) {
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
