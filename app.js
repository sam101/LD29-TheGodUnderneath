var argv = require('optimist').argv;
var express = require('express');
var http = require('http');
var serveStatic = require('serve-static');

var game = require('./game');

var app = express();
app.set('view engine', 'jade');

var server = http.createServer(app);
var io = require('socket.io').listen(server);

io.set('log level', 1);
io.enable('browser client minification');
io.enable('browser client etag');
io.enable('browser client gzip');


var env = argv.env || 'production';

app.get('/', function(req, res) {
	res.render('index', {
		env: env
	});
});

app.use(serveStatic('static'));

app.use('*', function(req, res) {
	res.send('404 not found', 404);
});

game.use(io);

server.listen(argv.port || 8080);