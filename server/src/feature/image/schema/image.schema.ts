import Mongoose from 'mongoose';
import { schemaOptions } from '@/shared/base';
import mongoosePaginate = require('mongoose-paginate');

export const ImageSchema = new Mongoose.Schema(
  {
    // 文件名
    filename: { type: String, required: true },

    // 文件url
    url: { type: String, required: true },

    // 关联文章
    postId: { type: Mongoose.Schema.Types.ObjectId, ref: 'Post' },

    // 图床返回信息
    extra: Object,
  },
  schemaOptions,
);

ImageSchema.plugin(mongoosePaginate);
