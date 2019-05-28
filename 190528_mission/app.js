var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');

app.listen(3000, function(){
  console.log('port');
});
app.get('/', function(req, res){
  res.sendFile(__dirname + "/public/index.html");  
});
app.get('/search', function(req, res){
	res.render('search.ejs', {'result' : req.body.word});
})
app.post('/search', function(req, res){
	res.send(req.body.word);
})
app.post('/ajax_search', function(req, res){
	var resultData = { 'word' : req.body.word};
	res.json(resultData);
})