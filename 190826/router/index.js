var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

var main = require('./main');
var email = require('./email');

router.use('/main', main);
router.use('/email', email);

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/../public/search.html'));
});

module.exports = router;
