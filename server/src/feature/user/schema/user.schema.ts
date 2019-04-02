import Mongoose from 'mongoose';

export const UserSchema = new Mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      match: /.{1,30}/,
    },
    password: {
      type: String,
      required: true,
      match: /.{6,30}/,
    },
    nick: String,
    slogan: String,
    avatar: String,
    email: String,
    address: String,
    contact: String,
  },
  {
    timestamps: true,
  },
);
