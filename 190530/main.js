var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url; //쿼리스트링의 값이 전달됨
    var queryData = url.parse(_url, true).query; //쿼리 데이터를 가져오기.
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){
	    fs.readFile(`data/${queryData.id}`, 'utf8', function(err, desc){
	    	var data = queryData.id ? 'content not found' : 'index';
	    	var template = `
		    	<a href="/"><h1>Title</h1></a>
		    	<a href="/?id=html"><strong>html</strong></a>
		    	<a href="/?id=css"><strong>css</strong></a>
		    	<a href="/?id=docs"><strong>docs</strong></a>
				contents : ${desc ? desc : data}
	    	`;
	    	response.writeHead(200);
	    	response.end(template);
	    });
	}else{ //404
    	response.writeHead(404);
    	response.end('Not Found');
	}
});
app.listen(3000);