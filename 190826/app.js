var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./router/index');
var passport = require('passport');
var localStorage = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');

app.listen(3000, function() {
  console.log('localhost');
});
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(router);
