var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user'
});
connection.connect();

router.get('/', function(req, res) {
  console.log('router main');
  res.sendFile(path.join(__dirname + '/../public/main.html'));
});

router.post('/join', function(req, res) {
  var body = req.body;
  var email = body.email;
  var name = body.name;
  var id = body.id;

  var sql = { email: body.email, name: body.name, id: body.id };
  //'insert into user set ?', ${sql}로도 가능.

  var value = `('${email}', '${name}', ${id})`;
  connection.query(`insert into user (email, name, id) values ${value}`, function(err, rows, fields) {
    if (err) throw err;
    res.render('result.ejs', sql);
    console.log(value, 'ok', rows);
  });
});

module.exports = router;
