const { Product } = require('../models/product');
const express = require('express');
const router = express.Router();

// initial route
router.get(`/`, async (req, res) => {
  // gets the model and finds list find returns to front end
  const productList = await Product.find();

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

router.post(`/`, (req, res) => {
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

module.exports = router;
