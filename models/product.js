const mongoose = require('mongoose');

// schema for our database products list
const productSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    required: true,
  },
});

// after the schema we need the model which starts with a capital letter
exports.Product = mongoose.model('product', productSchema);
