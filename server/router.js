const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  res.json({
      message: 'API is running fine'
  })

})

const itunesMusic = require('./itunes-service')

router.use('/music', itunesMusic);

module.exports = router;