const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));

app.set('views', './views_file');
app.set('view engine', 'pug');
app.locals.pretty = true;

app.listen(3000, function(){
    console.log('http://localhost:3000')
})

app.get('/', function(req, res){
    res.render('index');
})
app.post('/', function(req, res){
    let tit = req.body.title;
    let desc = req.body.description;
    fs.writeFile(`data/${tit}`, desc, function(err){
        if(err) res.status(500).send('internal server Error')
        //req.send('success!')
    })
})
app.get('/views', function(req, res){
    fs.readdir('data', function(err, files){
        if(err) alert('err')
        res.render('view', {
            fileName : files
        })
    })
})

app.get('/views/:title', function(req, res){
    let id = req.params.id;
    fs.readdir('data', function(err, files){
        if(err) alert('err')
        fs.readFile('data/'+id, 'utf8', function(err, data){
            res.render('view', {
                fileName: files,
                title : id,
                description : data
            })
        })
    })
});