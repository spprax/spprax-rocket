var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    title: 'server',
    content: `
      <h1>Express</h1>
      <p>Welcome to sprocket backend.</h1>
    `
  });
});

module.exports = router;
