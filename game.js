var World = require('./world');
var common = require('./common');

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
	world.addPlayer(socket);
	socket.set('world', world, callback);
}

function updatePlayerLife() {
	for (var i = 0; i < worlds.length; i++) {
		worlds[i].updatePlayerLife();
	}
}

function changeGod() {
	for (var i = 0; i < worlds.length; i++) {
		worlds[i].changeGod();
	}	
}

function handlePlayer(socket) {
	addPlayerToWorld(socket, function() {
		socket.get('world', function(err, world) {
			if (err) {
				return;
			}
			
			if (world.size > common.MIN_PLAYERS) {
				world.sendInitialData(socket);		
			}
			else if (world.size == common.MIN_PLAYERS) {
				for (var key in world.sockets) {
					world.sendInitialData(world.sockets[key]);
				}
			}
			else {
				socket.emit('waitingForPlayers');
			}
		});
	});
	
	socket.on('disconnect', function() {
		socket.get('world', function(err, world) {
			if (err) {
				return;
			}			
			world.delPlayer(world);
		});		
	});
	
	socket.on('attack', function(x, y) {
		socket.get('world', function(err, world) {
			if (err) {
				return;
			}			
			world.attackTile(socket, x, y);
		});
	});
	
	socket.on('move', function(x, y) {
		socket.get('world', function(err, world) {
			if (err) {
				return;
			}			
			world.movePlayer(socket, x, y);
		});		
	});
};

setInterval(changeGod, common.CHANGE_GOD_INTERVAL);
setInterval(updatePlayerLife, common.PLAYER_LIFE_INTERVAL);

exports.use = function(io) {
	io.sockets.on('connection', handlePlayer);
};