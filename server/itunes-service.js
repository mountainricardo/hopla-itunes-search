const express = require('express');
const axios = require('axios');

const router = express.Router();

const BASE_URL = 'https://itunes.apple.com';
const queryType = '/search/'

router.get('/albums', async (req, res, next) => {
  const url = new URL(`${ BASE_URL }${queryType}${req.url}`)
  const queryTerm = url.searchParams.get('term') ? `?term=${url.searchParams.get('term')}` : '';
  const queryAlbum = url.searchParams.get('entity') ? `&entity=${ url.searchParams.get('entity') }` : '';
  const queryUrl = `${ BASE_URL }${queryType}${queryTerm}${queryAlbum}`

  try {
      // const {data} = await axios.get(BASE_URL);
      const {data} = await axios.get(queryUrl);
      cacheData = data;
      cacheTime = Date.now();
      data.cacheTime = cacheTime;
      return res.json(data);
   } catch(err) {
      return next(err);
   }  
});

module.exports = router;
