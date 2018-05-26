const mongoosePaginate = require('mongoose-paginate')
const mongoose = require('../mongodb').mongoose

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  // create_at: {
  //   type: Date,
  //   default: Date.now //TODO: 保存时时区是否要转换一下？
  // },
  // update_at: {
  //   type: Date,
  //   default: Date.now
  // },

  meta: {
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    }
  }
}, {
    timestamps: true
  });

ArticleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Article', ArticleSchema)