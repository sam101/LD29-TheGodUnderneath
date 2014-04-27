var World = require('./world');
var common = require('./common');

worlds = [new World(0)];

/**
 * Finds a world for a given player.
 * The worlds are considered full when there is 5 players in there.
 */
function findWorld(socket) {
	for (var i = 0; i < worlds.length; i++) {
		if (! worlds[i].isFull()) {
			return worlds[i];
		}
	}
	console.log('Add new world ' + worlds.length);
	worlds.push(new World(worlds.length));	
	return worlds[worlds.length - 1];
}

function addPlayerToWorld(socket, callback) {
	var world = findWorld(socket);
	world.addPlayer(socket);
	console.log('Add player ' + socket.id + ' to world ' + world.id + ' (' + world.size + ' players)');
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
	console.log("Got a request from " + socket.id);
	addPlayerToWorld(socket, function() {
		socket.get('world', function(err, world) {
			if (err) return;			
			if (world.size > common.MIN_PLAYERS) {
				world.sendInitialData(socket);		
				world.changeGod();
				world.sendSize();
			}
			else if (world.size == common.MIN_PLAYERS) {
				for (var key in world.sockets) {
					world.sendInitialData(world.sockets[key]);
				}
				world.changeGod();
				world.sendSize();
				socket.emit('updateRocks', world.rocks);
			}
			else {
				socket.emit('waitingForPlayers');
			}
		});
	});
	
	socket.on('disconnect', function() {
		socket.get('world', function(err, world) {
			if (err) return;
			world.delPlayer(socket);
		});		
	});
	
	socket.on('attack', function(x, y) {
		socket.get('world', function(err, world) {
			if (err) return;
			world.attackTile(socket, x, y);
		});
	});
	
	socket.on('move', function(x, y) {
		socket.get('world', function(err, world) {
			if (err) return;
			world.movePlayer(socket, x, y);
		});		
	});
	
	socket.on('addRock', function(x, y) {
		socket.get('world', function(err, world) {
			if (err) return;
			world.addRock(socket, x, y);
		});						
	});
	
	socket.on('addStrengthToTile', function(x,y) {
		socket.get('world', function(err, world) {
			if (err) return;
			world.addStrengthToTile(socket, x, y);
		});				
	});
	
	socket.on('removeStrengthToTile', function(x,y) {
		socket.get('world', function(err, world) {
			if (err) return;
			world.removeStrengthToTile(socket, x, y);
		});						
	});
};

setInterval(changeGod, common.CHANGE_GOD_INTERVAL);
setInterval(updatePlayerLife, common.PLAYER_LIFE_INTERVAL);

exports.use = function(io) {
	io.sockets.on('connection', handlePlayer);
};