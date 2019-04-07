import Mongoose from 'mongoose';
import { schemaOptions } from '@/shared/base';
import mongoosePaginate = require('mongoose-paginate');

export const TagSchema = new Mongoose.Schema(
  {
    name: { type: String, required: true },
    descript: String,
  },
  schemaOptions,
);

TagSchema.plugin(mongoosePaginate);
