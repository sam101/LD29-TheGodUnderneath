var World = require('./world');

worlds = [new World()];

exports.handlePlayer = function(socket) {
	// Let's find a world for the player
	for (var i = 0; i < worlds.length; i++) {
		if (! worlds[i].isFull()) {
			console.log('Add player to world ' + i);
			worlds[i].addPlayer(socket);
			return;
		}
	}
	console.log('Add new world ' + worlds.length);
	worlds.push(new World());
	worlds[worlds.length - 1].addPlayer(socket);
};

exports.use = function(io) {
	io.sockets.on('connection', exports.handlePlayer);
};