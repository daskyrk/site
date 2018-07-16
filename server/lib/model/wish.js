const mongoosePaginate = require('mongoose-paginate');
const mongoose = require('../mongodb').mongoose;

const WishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // 置顶
    sticky: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  },
);

WishSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Wish', WishSchema);
