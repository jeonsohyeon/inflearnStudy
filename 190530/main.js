var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url; //쿼리스트링의 값이 전달됨
    var queryData = url.parse(_url, true).query; //쿼리 데이터를 가져오기.
    if(_url == '/'){
    	response.end(`<a href="/"><h1>Title</h1></a>
	    	<a href="/?id=html"><strong>html</strong></a>
	    	<a href="/?id=css"><strong>css</strong></a>
	    	<a href="/?id=docs"><strong>docs</strong></a>`);
    }
    response.writeHead(200);
    fs.readFile(`data/${queryData.id}`, 'utf8', function(err, desc){
    	if(err) desc = 'contents 가 없음';
    	var template = `
	    	<a href="/"><h1>Title</h1></a>
	    	<a href="/?id=html"><strong>html</strong></a>
	    	<a href="/?id=css"><strong>css</strong></a>
	    	<a href="/?id=docs"><strong>docs</strong></a>
			contents : ${desc}
    	`;
    	response.end(template);
    });
    //response.end(fs.readFileSync(__dirname + _url));

});
app.listen(3000);