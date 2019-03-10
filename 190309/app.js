const http = require('http');
const os = require('os');
const fs = require('fs');
const _ = require('underscore');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.get('/', function(req, res){
    res.send('index');
})

//템플릿 엔진 pug 적용하기
app.set('view engine', 'pug');
app.set('views', './views');
app.locals.pretty = true;
app.get('/pugExample', function(req, res){
    res.render('index', {
        time : 'time 변수에 대한 값.'
    })
})

app.get('/query', function(req, res){
    let info = [1,2,3];
    let output = `
        <a href="/query?id=0">0번</a>   
        <a href="/query?id=1">1번</a> 
        <a href="/query?id=2">2번</a>  
        ${info[req.query.id]}`;
    res.send(output); //쿼리스트링 ? 로 노출.
})

//쿼리스트링 여러개일 경우
app.get('/slash/:id/:name', function(req, res){
    res.send(req.params.id+','+req.params.name);
})

app.listen(3000, function(){
    console.log('express 3000')
})
app.use(express.static('public')); //public 폴더에 정적 파일 설정

//get 방식으로 정보를 얻으면 req.query 로 정보 받아오기
app.get('/form_receiver', function(req, res){
    let tit = req.query.title;
    let desc = req.query.description;
    res.send(tit+','+desc)
})

//post 방식으로 정보를 얻기 위해서는 body-parser 라는 미들웨어가 필요
//그 후 req.body 로 정보를 받아오기
app.use(bodyParser.urlencoded({extended:false})); // 바디파서로 들어온 애들
app.post('/form_receiver', function(req, res){
    let tit = req.body.title;
    let desc = req.body.description;
    res.send(tit+','+desc)
})
