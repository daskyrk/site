import * as utility from 'utility';

import { IUser } from '../interface/user.interface';
import Mongoose from 'mongoose';
import { schemaOptions } from '@/shared/base';

export const UserSchema = new Mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    nick: String,
    slogan: String,
    avatar: String,
    address: String,
    phone: String,
    site: String,
  },
  schemaOptions,
);

// 设置索引
UserSchema.index({ email: 1 });

// 设置虚拟属性
UserSchema.virtual('gravatar').get(function(this: IUser) {
  let url =
    this.avatar ||
    `https://gravatar.com/avatar/${utility.md5(this.email)}?size=48`;

  // www.gravatar.com 被墙
  url = url.replace('www.gravatar.com', 'gravatar.com');

  // 让协议自适应 protocol，使用 `//` 开头
  if (url.startsWith('http:')) {
    url = url.slice(5);
  }

  // 如果是 github 的头像，则限制大小
  if (url.includes('githubusercontent')) {
    url += '&s=120';
  }
  return url;
});
