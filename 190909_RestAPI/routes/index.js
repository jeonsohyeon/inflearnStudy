var express = require('express');
var router = express.Router();

/* GET page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Demo' });
});
router.get('/about', (req, res, next) => {
  res.render('about', { title: 'About' });
});
module.exports = router;
