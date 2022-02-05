const express = require('express');
const axios = require('axios');

const router = express.Router();

const BASE_URL = 'https://itunes.apple.com';
const queryType = 'search';

const removeDuplicates = ((array) => {
    return array.reduce((results,currentItem) =>{ 
      return results.find((result) => {
        return currentItem.collectionName === result.collectionName
      }) ? results : [ ...results, currentItem ];
  },[]);
});

router.get('/albums', async (req, res, next) => {
  const url = new URL(`${ BASE_URL }/${queryType}/${req.url}`)
  const queryTerm = url.searchParams.get('term') ? `?term=${url.searchParams.get('term')}` : '';
  const queryAlbum = url.searchParams.get('entity') ? `&entity=${ url.searchParams.get('entity') }` : '';
  const queryUrl = `${ BASE_URL }/${queryType}/${queryTerm}${queryAlbum}&limit=200`

  try {
    const { data } = await axios.get(queryUrl);
    // console.log('first results', data.resultCount);
    const filteredData = removeDuplicates(data.results);
    // console.log('filtered results', filteredData.length);
      return res.json(filteredData);
   } catch(err) {
      return next(err);
   }  
});



module.exports = router;
