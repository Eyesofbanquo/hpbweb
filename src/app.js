require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const axios = require("axios");
const options = require("./model/source-options");

const searchRouter = require('./routes/search.route');

const app = express();
app.use(bodyParser.json());

app.get("/product", async (request, response) => {
  const slug = request.query.slug;
  const source = options.standardOptions.join(",");

  if (!slug) {
    response.send({ error: "Unable to find product" });
    return;
  }

  await axios
    .get(`https://search.hpb.com/product/slug/${slug}`, {
      params: {
        _source: source,
      },
    })
    .then((res) => {
      response.send(res.data);
    });
});

app.use("/search", searchRouter);
app.get("/", (request, response) => {
  response.send("Welcome to hpb-scrape");
});

if (process.env.LOCAL_ENABLED) {
  app.listen(3000, () => console.log('Running on port 3000'));
  module.exports = app;
} else {
  module.exports.handler = serverless(app);
}
