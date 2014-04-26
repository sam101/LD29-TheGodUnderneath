var World = require('./world');

worlds = [new World()];

function findWorld(socket) {
	// Let's find a world for the player
	for (var i = 0; i < worlds.length; i++) {
		if (! worlds[i].isFull()) {
			console.log('Add player to world ' + i);
			return worlds[i];
		}
	}
	console.log('Add new world ' + worlds.length);
	worlds.push(new World());	
	return worlds[worlds.length - 1];
}

function addPlayerToWorld(socket, callback) {
	var world = findWorld(socket);
	socket.set('world', world, callback);
}

exports.handlePlayer = function(socket) {
	addPlayerToWorld(socket, function() {
		socket.get('world', function(err, world) {
			socket.emit('worldData', world.tiles);					
		});
	});
};

exports.use = function(io) {
	io.sockets.on('connection', exports.handlePlayer);
};