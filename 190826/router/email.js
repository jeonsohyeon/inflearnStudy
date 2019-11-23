var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tkawkdRj@@1',
  database: 'user'
});
connection.connect();

//기본 응답처리
// router.post('/email_post', function(req, res) {
//   res.send(req.body.email);
// });

//ejs 로 응답 보내기
router.post('/form', function(req, res) {
  res.render('email.ejs', { email: req.body.email });
});

//ajax 로 받기
router.post('/ajax', function(req, res) {
  // var responseData = { email: req.body.email };
  // res.json(responseData);

  //mysql 로 받기
  var responseData = { email: req.body.email };
  connection.query(`select name from user where email='${req.body.email}'`, function(err, rows, fields) {
    if (err) throw err;
    if (rows[0]) {
      responseData.name = rows[0].name;
    } else {
      responseData.name = 'none';
    }
    res.json(responseData);
  });
});

module.exports = router;
