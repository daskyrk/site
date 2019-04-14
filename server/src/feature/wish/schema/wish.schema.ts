import Mongoose from 'mongoose';
import { schemaOptions } from '@/shared/base';
import mongoosePaginate = require('mongoose-paginate');

export const WishSchema = new Mongoose.Schema(
  {
    name: { type: String, required: true },

    content: { type: String, required: true },

    image: String,

    reply: String,

    // 置顶
    sticky: { type: Boolean, default: false },

    // 公开
    ['public']: { type: Boolean, default: true },

    // 审核后是否展示
    show: { type: Boolean, default: true },

    extra: Object,
  },
  schemaOptions,
);

WishSchema.plugin(mongoosePaginate);
