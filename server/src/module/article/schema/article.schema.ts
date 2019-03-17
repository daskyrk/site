import Mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import { autoIncrement } from 'mongoose-plugin-autoinc';

export const ArticleSchema = new Mongoose.Schema(
  {
    // 文章标题
    title: { type: String, required: true },

    // 关键字
    keyword: { type: String, required: true },

    // 描述
    descript: { type: String, required: false },

    // 标签
    tag: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Tag' }],

    // 内容
    content: { type: String, required: true },

    // 状态 1 发布 2 草稿
    state: { type: Number, default: 1 },

    // 公开
    publish: { type: Boolean, default: true },

    // 缩略图
    thumb: String,

    // 文章分类
    type: { type: Number },

    // 其他元信息
    meta: {
      views: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  },
);

ArticleSchema.plugin(mongoosePaginate);
ArticleSchema.plugin(autoIncrement, {
  model: 'Article',
  field: 'id',
  startAt: 1,
  incrementBy: 1,
});
