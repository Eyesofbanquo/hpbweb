require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const serverless = require('serverless-http');

const indexRouter = require('./routes/index.route');
const productRouter = require('./routes/product.route');
const searchRouter = require('./routes/search.route');

const app = express();
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/product', productRouter);

if (process.env.LOCAL_ENABLED) {
  app.listen(3000, () => console.log('Running on port 3000'));
  module.exports = app;
} else {
  module.exports.handler = serverless(app);
}
