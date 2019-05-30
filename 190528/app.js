var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
	host : '127.0.0.1',
	port : 3000,
	user : 'ROOT',
	password : '87852560',
	database : 'js'
})
connection.connect();

app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');

app.listen(3000, function(){
	console.log('express on 3000 port')
});

app.get('/', function(req, res){
	res.sendFile(__dirname + "/public/main.html");
});

app.get('/form', function(req, res){
	res.sendFile(__dirname+"/public/form.html");
});

app.post('/email_post', function(req, res){ 
	res.render('email.ejs', {'email': req.body.email})
})

app.post('/ajax_send_email', function(req, res){
	//데이터베이스가 없을 경우 데이터를 이렇게 보내지만
	// var responseData = { 'result' : 'ok', 'email' : req.body.email};
	// res.json(responseData)
	//mysql 연동 한 경우 쿼리 날리기.
	var email = req.body.email;
	var responseData = {};
	var query = connection.query(`select name from user where email='${email}'`, function(err, rows){
		connection.release();
		if(err) throw err;
		if(rows[0]){
			console.log('있음');
			responseData.result = "ok";
			responseData.name = rows[0].name;
		}else{
			console.log('없음');
			responseData.result = "none";
			responseData.name = '';
		}
		res.json(responseData);
	})
})