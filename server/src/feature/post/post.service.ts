import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PostInfoDto, QueryPostDto } from './dto/post.dto';
import { isUndefined, omitBy } from "lodash";

import { BaseService } from '@/shared/base';
import { IPost } from './interface/post.interface';
import { IPostTag } from './interface/post-tag.interface';
import { InjectModel } from 'daskyrk-mongoose';
import { PaginateModel, Model } from 'mongoose';

@Injectable()
export class PostService extends BaseService<IPost> {
  constructor(
    @InjectModel('Post') private readonly model: PaginateModel<IPost>,
    @InjectModel('PostTag') private readonly postTagModel: Model<IPostTag>,
  ) {
    super(model);
  }

  public async getPostById(id: string, isAdmin: boolean) {
    const [res, postTags] = await Promise.all([
      this.model.findById(id),
      this.postTagModel.find({ postId: id }).populate('tagId'),
    ])
    if (res) {
      if (!isAdmin) {
        if (!res.isPublic || !res.isPublish) {
          throw new ForbiddenException('该文章暂时无法查看')
        }
        res.meta.views += 1;
        res.save();
      }
    } else {
      throw new NotFoundException('该文章不存在')
    }

    return {
      tags: postTags ? postTags.map(o => o.tagId) : [],
      ...res.toJSON()
    };
  }

  public async create(data: PostInfoDto): Promise<IPost> {
    const { tags = [], ...postData } = data;
    const post = new this.model(postData);
    tags.forEach(async tagId => {
      const postTag = new this.postTagModel({ tagId, postId: post._id });
      await postTag.save()
    })

    return await post.save();
  }

  public async updatePost(data: PostInfoDto): Promise<IPost | null> {
    const { tags = [], ...postData } = data;
    const post = await this.update(postData);
    let postTags;
    if (post) {
      const postId = data.id;
      await this.postTagModel.deleteMany({ postId });
      const pros = tags.map(tagId => new this.postTagModel({ tagId, postId }).save());
      postTags = await Promise.all(pros);
      console.log('postTags:', postTags);
      // postTags = postTags.filter(o => o !== null).map((o: any) => o.tagId);
    } else {
      throw new NotFoundException('该文章不存在')
    }

    return {
      tags: postTags || [],
      ...post.toJSON()
    };
  }

  public async deletePost(id: string): Promise<IPost | null> {
    const result = this.delete(id);
    if (result) {
      await this.postTagModel.collection.remove({ postId: id });
    }

    return result;
  }

  public async search(query: QueryPostDto) {
    const {
      pageNo = 1,
      pageSize = 10,
      q,
      tag,
      isPublish,
      isPublic,
      type,
      startAt,
      endAt,
      hot,
    } = query;
    const querys = omitBy({ isPublish, isPublic, type }, isUndefined) as any;
    const options: {
      sort: any;
      page: number;
      limit: number;
      select?: string;
      populate: string[];
    } = {
      sort: { createdAt: -1 },
      page: Number(pageNo),
      limit: Number(pageSize),
      select: '-content',
      populate: ['tags'], // TODO: use populate
    };

    // 关键词查询
    if (q !== undefined) {
      const keywordReg = new RegExp(q);
      querys.$or = [
        { title: keywordReg },
        { keyword: keywordReg },
        { content: keywordReg },
        { description: keywordReg },
      ];
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

    if (tag) {
      const posts = await this.postTagModel.find({ tagId: tag });
      query.postId = { $in: posts.map(p => p.postId) };
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

  public async commentPost(id: string, remove = false) {
    const res = await this.model.findById(id);
    if (res) {
      if (remove) {
        res.meta.comments -= 1;
      } else {
        res.meta.comments += 1;
      }
      res.save();
    }

    return res;
  }

}
