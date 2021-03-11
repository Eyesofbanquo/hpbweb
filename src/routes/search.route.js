const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');

const options = require('../model/source-options');

const router = express.Router();

router.use(bodyParser.json());

router.get('/', async (request, response) => {
  const searchTerm = request.query.search;
  let page;

  const source = options.standardOptions.join(',');

  if (request.query.page) {
    page = request.query.page;
  } else {
    page = '0';
  }

  if (!searchTerm) {
    response.send({ error: 'Unable to search. Please try again' });
    return;
  }

  await axios
    .get('https://search.hpb.com/search/advanced', {
      params: {
        _source: source,
        size: '10',
        include: 'hits',
        language: 'ENG',
        from: page,
        keywords: searchTerm,
        type: 'Catalog::Book',
      },
    })
    .then((res) => {
      response.send(res.data.hits);
    });
});

router.get('/top', async (request, response) => {
  const searchTerm = request.query.search;
  const byAuthor = request.query.by; // in the format of [lastname, firstname] have to get from live-search.
  let page;

  const source = options.standardOptions.join(',');

  if (request.query.page) {
    page = request.query.page;
  } else {
    page = '0';
  }

  if (!searchTerm) {
    response.send({ error: 'Unable to search. Please try again' });
    return;
  }

  await axios
    .get('https://search.hpb.com/search/advanced', {
      params: {
        _source: source,
        size: '10',
        include: 'hits',
        language: 'ENG',
        from: page,
        keywords: searchTerm,
        inHpbStock: 'true',
        sort: 'salesRankHpbWeb:desc',
        type: 'Catalog::Book',
        author: [byAuthor],
      },
    })
    .then((res) => {
      response.send(res.data.hits);
    });
});

router.get('/live', async (request, response) => {
  const searchTerm = request.query.search;

  if (!searchTerm) {
    response.send({ error: 'Unable to search. Please try again' });
    return;
  }

  await axios
    .get('https://search.hpb.com/search/suggest', {
      params: { query: searchTerm },
    })
    .then((res) => {
      response.send(res.data);
    });
});

module.exports = router;
