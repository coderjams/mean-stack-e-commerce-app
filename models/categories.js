const mongoose = require('mongoose');

// schema for our database products list
const categorySchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    required: true,
  },
});

// after the schema we need the model which starts with a capital letter
exports.Category = mongoose.model('category', categorySchema);
