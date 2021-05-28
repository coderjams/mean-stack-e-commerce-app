const { User } = require('../models/product');
const express = require('express');
const router = express.Router();

// initial route
router.get(`/`, async (req, res) => {
  // gets the model and finds list find returns to front end
  const categoryList = await Product.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.send(categoryList);
});

module.exports = router;
