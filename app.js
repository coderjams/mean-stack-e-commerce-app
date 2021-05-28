const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');

const api = process.env.API_URL;

// middleware - parses front end data so the back end can understand it
app.use(express.json());
// displays log requests in a specific format in terminal example POST /api/v1/products 200 51 - 3.984 ms
app.use(morgan('tiny'));

// schema for our database products list
const productSchema = mongoose.Schema({
  name: String,
  image: String,
  // change count in stock to an object to set required
  // countInStock: Number "old"
  countInStock: {
    type: Number,
    required: true,
  },
});

// after the schema we need the model which starts with a capital letter
const Product = mongoose.model('product', productSchema);

// initial route
app.get(`${api}/products`, async (req, res) => {
  // gets the model and finds list find returns to front end
  const productList = await Product.find();

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

app.post(`${api}/products`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });
  // save in DB
  product
    .save()
    .then((createdProduct) => {
      // return back the created product to see it in the front end
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

// connects to our database and we get the uri from the mongoDB cloud
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database',
  })
  .then(() => {
    console.log('Database connection is ready...');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log('server is running http://localhost:3000');
});
