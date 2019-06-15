import Mongoose from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc';
import { schemaOptions } from '@/shared/base';
import mongoosePaginate = require('mongoose-paginate');

export const CommentSchema = new Mongoose.Schema(
  {
    // 文章id
    postId: { type: Mongoose.Schema.Types.ObjectId, ref: 'Post' },

    // 回复id
    pid: { type: String },

    // 内容
    content: { type: String, required: true },

    // 留言作者
    author: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      site: String,
    },

    // 点赞数
    likes: { type: Number, default: 0 },

    // 状态 0待审核 1通过 2不通过 3归档，默认通过
    state: { type: Number, default: 1 },

    // ip
    ip: { type: String },

    // ip 物理地址
    city: { type: String },
    range: { type: String },
    country: { type: String },

    // 用户ua
    agent: { type: String, validate: /\S+/ },
  },
  schemaOptions,
);

CommentSchema.plugin(mongoosePaginate);
CommentSchema.plugin(autoIncrement, {
  model: 'Comment',
  field: 'index',
  startAt: 1,
  incrementBy: 1,
});
