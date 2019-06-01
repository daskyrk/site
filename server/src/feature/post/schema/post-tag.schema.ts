import Mongoose from 'mongoose';
import { schemaOptions } from '@/shared/base';

export const PostTagSchema = new Mongoose.Schema(
  {
    postId: { type: Mongoose.Schema.Types.ObjectId, ref: 'Post' },
    tagId: { type: Mongoose.Schema.Types.ObjectId, ref: 'Tag' },
  },
  schemaOptions,
);

