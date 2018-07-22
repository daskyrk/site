const mongoosePaginate = require('mongoose-paginate');
const mongoose = require('../mongodb').mongoose;

const ImageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  timestamp: { type: Number, required: true },
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },

  extra: Object,
});

ImageSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Image', ImageSchema);
