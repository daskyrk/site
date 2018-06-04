const mongoosePaginate = require('mongoose-paginate');
const mongoose = require('../mongodb').mongoose;

const TagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    descript: String,

    // 排序
    sort: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

TagSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Tag', TagSchema);
