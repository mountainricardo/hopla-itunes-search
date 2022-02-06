const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.json({
      message: 'API is running fine'
  })

})

const ItunesMusicList = require('./itunes-service')

router.use('/music', ItunesMusicList);

module.exports = router;