import Mongoose from 'mongoose';
import { schemaOptions } from '@/shared/base';
import mongoosePaginate = require('mongoose-paginate');

export const TagSchema = new Mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    removed: { type: Boolean, default: false },
  },
  schemaOptions,
);

TagSchema.plugin(mongoosePaginate);
