const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const options = require('../model/source-options');

const router = express.Router();

router.use(bodyParser.json());

router.get('/', async (request, response) => {
  const slug = request.query.slug;
  const source = options.standardOptions.join(',');

  if (!slug) {
    response.send({ error: 'Unable to find product' });
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

module.exports = router;