var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path'); //입력 정보에 대한 보안
var sanitizeHTML = require('sanitize-html'); //출력 정보에 대한 보안

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'opentutorials'
});
  
connection.connect();
  
connection.query('SELECT * FROM topic', function (error, results, fields) {
    if (error) {
        console.log(error); 
    }
    console.log(results);
});
  
connection.end();

var app = http.createServer(function(request,response){
    var _url = request.url; //쿼리스트링의 값이 전달됨
    var queryData = url.parse(_url, true).query; //쿼리 데이터를 가져오기.
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){
		fs.readdir('data', function(err, filelist){
			var list = template.list(filelist);
			if(queryData.id === undefined){
				response.writeHead(200);
				response.end(template.html(`<a href="/"><h1>INDEX</h1></a>`, list, ``, `<a href="/create">CREATE</a>`));
			}else{
				var filteredId = path.parse(queryData.id).base;
				fs.readFile(`data/${filteredId}`, 'utf8', function(err, desc){
					response.writeHead(200);
					response.end(template.html(`<a href="/"><h1>INDEX</h1></a>`, list, `<p>contents : ${desc}</p>`, `
					<a href="/create">CREATE</a><br/>
					<a href="/update?id=${filteredId}">UPDATE</a><br/>
					<form action="/delete_process" method="post">
					<input type="hidden" name="id" value="${filteredId}">
					<input type="submit" value="DELETE">
					</form>`));
				})
			}
		})
	}else if(pathname === '/create'){
		fs.readdir('data', function(err, filelist){
			var list = template.list(filelist);
			fs.readFile(`data/${queryData.id}`, 'utf8', function(err, desc){
				response.writeHead(200);
				response.end(template.html(`<h1>Create</h1>`, list, `<form action="/process_create" method="post">
					<div><input type="text" name="title"/></div>
					<textarea name="description"></textarea>
					<input type="submit">
				</form>
				`, ''));
			})
		})
	}else if(pathname === '/process_create'){
		var body = '';
		request.on('data', function(data){
			body += data;
		})
		request.on('end', function(){
			var post = qs.parse(body);
			var title = sanitizeHTML(post.title);
			var desc = sanitizeHTML(post.description, {
				allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
				allowedAttributes: {
					'a': [ 'href' ]
				}
			});
			fs.writeFile(`data/${title}`, desc, 'utf8', function(err){
				response.writeHead(301, {Location : `/?id=${title}`}); //리다이렉션
				response.end();
			})
		})
	}else if(pathname === '/update'){
		fs.readdir('data', function(err, filelist){
			var filteredId = path.parse(queryData.id).base;
			fs.readFile(`data/${filteredId}`, 'utf8', function(err, desc){
				var title = sanitizeHTML(filteredId);
				var desc = sanitizeHTML(post.description, {
					allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
					allowedAttributes: {
						'a': [ 'href' ]
					}
				});
				response.writeHead(200);
				response.end(template.html(`<h1>UPDATE</h1>`, '', `<form action="/process_update" method="post">
					<input type="hidden" name="id" value="${title}"/>
					<div><input type="text" name="title" value=${title}/></div>
					<textarea name="description">${desc}</textarea>
					<input type="submit">
				</form>
				`, ''));
			})
		})
	}else if(pathname ==='/process_update'){
		var body = '';
		request.on('data', function(data){
			body += data;
		})
		request.on('end', function(){
			var post = qs.parse(body);
			var id = post.id; //original
			var filteredId = path.parse(id).base;
			var title = sanitizeHTML(post.title);
			var desc = sanitizeHTML(post.description, {
				allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
				allowedAttributes: {
					'a': [ 'href' ]
				}
			});
			fs.rename(`data/${filteredId}`, `data/${title}`, function(err){
				fs.writeFile(`data/${title}`, desc, 'utf8', function(err){
					response.writeHead(301, {Location : `/?id=${title}`}); //리다이렉션
					response.end();
				})
			})
		})
	}else if(pathname ==='/delete_process'){
		var body = '';
		request.on('data', function(data){
			body += data;
		})
		request.on('end', function(){
			var post = qs.parse(body);
			var id = post.id;
			var filteredId = path.parse(id).base;
			fs.unlinkSync(`data/${filteredId}`);
			response.writeHead(301, {Location : '/'});
			response.end();
		})
	}else{
		response.writeHead(404);
		response.end('Not Found');
	}
});

app.listen(3000);
