const mongoosePaginate = require('mongoose-paginate');
const mongoose = require('../mongodb').mongoose;
const { autoIncrement } = require('mongoose-plugin-autoinc');


const CommentSchema = new mongoose.Schema(
  {
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    // pid，0代表默认留言
    pid: { type: Number, default: 0 },
    content: { type: String, required: true },

    author: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      site: String,
    },
    likes: { type: Number, default: 0 },
    // 状态 0待审核 1通过 2不通过
    state: { type: Number, default: 1 },

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

module.exports = mongoose.model('Comment', CommentSchema);
