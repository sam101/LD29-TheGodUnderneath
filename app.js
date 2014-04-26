var argv = require('optimist').argv;
var express = require('express');
var http = require('http');
var serveStatic = require('serve-static');

var game = require('./game');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
io.set('log level', 1);

app.get('/', function(req, res) {
	res.render('index');
});

app.use(serveStatic('static'));
app.use(require('errorhandler'));

app.set('view engine', 'jade');

game.use(io);

server.listen(argv.port || 8080);