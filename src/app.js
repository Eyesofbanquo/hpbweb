require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const axios = require("axios");
const options = require("./model/source-options");

const searchRouter = require('./routes/search.route');
const productRouter = require('./routes/product.route');

const app = express();
app.use(bodyParser.json());

app.use("/search", searchRouter);
app.use("/product", productRouter);
app.get("/", (request, response) => {
  response.send("Welcome to hpb-scrape");
});

if (process.env.LOCAL_ENABLED) {
  app.listen(3000, () => console.log('Running on port 3000'));
  module.exports = app;
} else {
  module.exports.handler = serverless(app);
}
