const { User } = require('../models/product');
const express = require('express');
const router = express.Router();

// initial route
router.get(`/`, async (req, res) => {
  // gets the model and finds list find returns to front end
  const userList = await Product.find();

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

module.exports = router;
