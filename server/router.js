const express = require('express');
const axios = require('axios');
const router = express.Router();

// const BASE_URL = 'https://itunes.apple.com/search?term=credence&entity=album';

router.get('/', async (req, res) => {
  //    try {
  //     const {data} = await axios.get(BASE_URL);
  //     cacheData = data;
  //     cacheTime = Date.now();
  //     data.cacheTime = cacheTime;
  //     return res.json(data);
  //  } catch(err) {
  //     return next(err);
  //  }     
  res.json({
      message: 'API is running fine'
  })

})

const itunesMusic = require('./itunes-service')

router.use('/music', itunesMusic);

// router.get('/:id', (req, res) => {
//   const id = Number(req.params.id);
//   const event = events.find(event => event.id === id);
//   res.send(event);
// })

module.exports = router;