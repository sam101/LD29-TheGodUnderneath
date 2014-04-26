var argv = require('optimist').argv;
var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.get('/', function(req, res) {
	res.render('index');
});

server.listen(argv.port || 8080);

