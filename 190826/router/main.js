var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tkawkdRj@@1',
  database: 'user'
});
connection.connect();

router.get('/', function(req, res) {
  res.render('join.ejs');
});

//sql
// router.post('/join', function(req, res) {
//   var body = req.body;
//   var email = body.email;
//   var name = body.name;
//   var id = body.id;

//   var sql = { email: body.email, name: body.name, id: body.id };
//   //'insert into user set ?', ${sql}로도 가능.

//   var value = `('${email}', '${name}', ${id})`;
//   connection.query(`insert into user (email, name, id) values ${value}`, function(err, rows, fields) {
//     if (err) throw err;
//     res.render('result.ejs', sql);
//     console.log(value, 'ok', rows);
//   });
// });

//passport 기반 라우팅
var passport = require('passport');
var LocalStoragy = require('passport-local').Strategy;
passport.use(
  'local-join',
  new LocalStoragy(
    {
      usernameField: 'email',
      passwordField: 'name',
      passReqToCallback: true
    },
    function(req, email, name, done) {
      console.log('local-join callback called');
    }
  )
);

router.post(
  '/',
  passport.authenticate('local-join', {
    successRedirect: '/main',
    failureRedirect: '/main/join',
    failureFlash: true
  })
);

module.exports = router;
