import Mongoose from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc';
import mongoosePaginate = require('mongoose-paginate');

export const CommentSchema = new Mongoose.Schema(
  {
    // articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    postId: { type: String, required: true },

    pid: { type: String },
    content: { type: String, required: true },

    author: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      site: String,
    },
    likes: { type: Number, default: 0 },
    // 状态 0待审核 1通过 2不通过 3归档
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
  {
    timestamps: true,
  },
);

CommentSchema.plugin(mongoosePaginate);
CommentSchema.plugin(autoIncrement, {
  model: 'Comment',
  field: 'id',
  startAt: 1,
  incrementBy: 1,
});
