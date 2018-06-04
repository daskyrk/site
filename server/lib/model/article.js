const mongoosePaginate = require('mongoose-paginate');
const { autoIncrement } = require('mongoose-plugin-autoinc');
const mongoose = require('../mongodb').mongoose;

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    keyword: { type: String, required: true },
    descript: { type: String, required: false },
    content: { type: String, required: true },
    tag: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],

    // 状态 1 发布 2 草稿
    state: { type: Number, default: 1 },

    // 文章公开状态 1 公开 2 私密
    publish: { type: Boolean, default: true },

    // 缩略图
    thumb: String,

    // 文章分类
    type: { type: Number },

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
// ArticleSchema.plugin(autoIncrement, {
//   model: 'Article',
//   field: 'artId',
//   startAt: 26,
//   incrementBy: 1,
// });

module.exports = mongoose.model('Article', ArticleSchema);
