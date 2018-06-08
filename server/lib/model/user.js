const mongoose = require('../mongodb').mongoose;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      match: /.{3,30}/,
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
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', UserSchema);
