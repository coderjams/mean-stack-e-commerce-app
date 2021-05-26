const express = require('express');

const app = express();

require('dotenv/config');

const api = process.env.API_URL;

// initial route
app.get('/', (req, res) => {
  res.send('callback success');
});

app.listen(3000, () => {
  console.log(api);
  console.log('server is running http://localhost:3000');
});
