const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const app = express();
const port = 8000;
const router = require('./router.js');

app.use('/itunes', router);
app.use(bodyParser.json());
// app.use(cors());
app.use(express.urlencoded({ extended: true }));

// listen on the port
app.listen(port, function() {
  console.log(`Hopla iTunes music search server listening on port ${port}!`)
});

