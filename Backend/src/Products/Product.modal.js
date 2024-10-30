const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  description: String,
  price: { type: Number, required: true },
  oldPrice: Number,
  image: { type: String, required: true },
  color: String,
  rating: { type: Number, default: 0 },
  author: { type: mongoose.Types.ObjectId, ref: 'User', require: true },
});
const product = mongoose.model('Product', productSchema);

module.exports = product;
