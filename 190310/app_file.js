const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'pug');
app.get('/topic/new', function(req, res){
	res.render('new');
})

app.post('/topic', function(req, res){
	let title = req.body.title;
	let description = req.body.description;
	fs.writeFile('data/'+title, description, function(err){
		if(err){
			res.status(500).send('internal server Error')
		}
		res.redirect('/topic/'+title)
	})
})
app.listen(3000, function(){
	console.log('http://localhost:3000')
})

app.get(['/topic', '/topic/:id'], function(req, res){ //라우터 링크도 배열로 받아올 수 있음
	let id = req.params.id;
	fs.readdir('data', function(err, files){
		if(err){
			res.status(500).send('internal server Error')
		}
		if(id){
			fs.readFile('data/'+id, 'utf8', function(err, data){
				res.render('view', {
					fileName: files,
					title : id,
					description : data
				})
			})
		}else{
			res.render('view', {
				fileName : files,
				title:'null',
				description:'null'
			})
		}
	})
})