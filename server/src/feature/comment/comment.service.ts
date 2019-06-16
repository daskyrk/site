import { CommentDto, QueryCommentDto } from './dto/comment.dto';

import { BaseService } from '@/shared/base';
import { IComment } from './interface/comment.interface';
import { InjectModel } from 'daskyrk-mongoose';
import { Injectable } from '@nestjs/common';
import { PaginateModel } from 'mongoose';
import { Request } from 'express';
import geoip from 'geoip-lite';
import { sendMailToOwner, sendReply } from "@/utils/email";

@Injectable()
export class CommentService extends BaseService<IComment> {
  constructor(
    @InjectModel('Comment') private readonly model: PaginateModel<IComment>,
  ) {
    super(model);
  }

  public async search({ pageNo = 1, pageSize = 10, postId, q, state }: QueryCommentDto, select: string | object) {
    const query = { state } as any;
    const options: {
      sort: any;
      page: number;
      limit: number;
      select?: string | object;
      // populate: string[];
    } = {
      sort: { createdAt: -1 },
      page: Number(pageNo),
      limit: Number(pageSize),
      select,
      // populate: ['tag'],
    };

    if (postId) {
      query.postId = postId;
    }

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
    ip = ip.replace('::ffff:', '');
    data.ip = ip;
    data.agent = req.headers['user-agent'] || data.agent;

    const ipLocation = geoip.lookup(ip);

    if (ipLocation) {
      data.city = ipLocation.city;
      data.range = ipLocation.range;
      data.country = ipLocation.country;
    }
    const comment = await super.create({ ...data, postId: data.post.id });
    const result = await comment.save();
    let pComment;
    // 有回复给被回复者发邮件
    if (data.pid) {
      pComment = await super.findById(data.pid);
      if (pComment) {
        sendReply({
          authorName: data.author.name,
          title: data.post.title,
          postLink: data.pageUrl,
          content: data.content,
          pComment,
          ip,
        });
      }
    }
    // 所有留言都给owner发邮件
    sendMailToOwner({
      authorName: data.author.name,
      authorSite: data.author.site,
      authorEmail: data.author.email,
      title: data.post.title,
      postLink: data.pageUrl,
      content: data.content,
      commentId: result._id,
      pComment,
      ip,
    })

    return result;
  }

  public async updateState(id: string, state: number) {
    const result = await this.model.findById(id);
    if (result) {
      result.state = state;
      await result.save();
    }
    return result;
  }

  public async like(id: string) {
    const result = await this.model.findById(id);
    if (result) {
      result.likes += 1;
      await result.save();
    }
    return result;
  }
}
