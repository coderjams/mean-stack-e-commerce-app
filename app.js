const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const Product = require('./models/product');

require('dotenv/config');

app.use(cors());
app.options('*', cors());

// middleware - parses front end data so the back end can understand it
app.use(express.json());
// displays log requests in a specific format in terminal example POST /api/v1/products 200 51 - 3.984 ms
app.use(morgan('tiny'));

// Routers
const categoriesRouter = require('./routers/products');
const productsRouter = require('./routers/products');
const usersRouter = require('./routers/users');
const ordersRouter = require('./routers/orders');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);

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
