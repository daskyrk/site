import Mongoose from 'mongoose';
import mongoosePaginate = require('mongoose-paginate');

export const TagSchema = new Mongoose.Schema(
  {
    name: { type: String, required: true },
    descript: String,
  },
  {
    timestamps: true,
  },
);

TagSchema.plugin(mongoosePaginate);
