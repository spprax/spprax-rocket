const express = require('express');
const path = require('path');

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../sprocket-client/build', 'index.html'))
});

router.get('/api', function(req, res, next) {
  res.json({
    title: 'sprocket-api',
    content: `
      <h1>Spprax Server API</h1>
      <p>Welcome to sprocket backend with API access.</p>
    `
  });
});

module.exports = router;
