import { SchemaOptions } from 'mongoose';

export const schemaOptions: SchemaOptions = {
  toJSON: {
    virtuals: true,
    getters: true,
    versionKey: false,
  },
  timestamps: true,
};
