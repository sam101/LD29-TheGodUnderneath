var Goal = require('./goal');
var Player = require('./player');
var Tile = require('./tile');

var common = require('./common');
var random = require('./random');

function World(id) {
	this.id = id;
	this.size = 0;
	this.players = {};
	this.sockets = {};
	// Generate tiles
	this.generate();
}

World.prototype.generate = function() {
	this.width = common.WIDTH;
	this.height = common.HEIGHT;
	this.tiles = [];
	for (var i = 0; i < this.height; i++) {
		this.tiles[i] = [];
		for (var j = 0; j < this.width; j++) {
			this.tiles[i][j] = new Tile(0, random.randInt(common.MIN_RES, common.MAX_RES));
		}
	}
	this.goal = new Goal();
};

World.prototype.isFull = function() {
	return this.size >= 5;
};


World.prototype.getPlayer = function(socket) {
	return this.players[socket.id];
};

World.prototype.addPlayer = function(socket) {
	this.size++;
	var player = new Player(socket, this);
	
	this.sockets[socket.id] = socket;
	this.players[socket.id] = player;
	
	this.tiles[player.y][player.x].r = 0;
	this.sendTileChanged(player.x, player.y);
};

World.prototype.delPlayer = function(socket) {
	console.log('Remove player ' + socket.id + ' from world ' + this.id);

	this.size--;
	delete this.players[socket.id];
	delete this.sockets[socket.id];
	
	if (this.size < common.MIN_PLAYERS) {
		for (var key in this.sockets) {
			this.sockets[key].emit('waitingForPlayers');
		}
	}

	for (var key in this.sockets) {
		this.sockets[key].emit('removePlayer', socket.id);		
	}
	
	this.changeGod();
	
};

World.prototype.movePlayer = function(socket, x, y) {
	var player = this.players[socket.id];
	
	if (player.isGod) {
		console.log(socket.id + " is god, he can't move");
		return;
	}
	
	if (player.distance(x, y) != 1) {
		return;
	}
	
	player.x = x;
	player.y = y;
	
	if (this.goal.isAtGoal(player)) {
		this.winGame(socket);
	}
	else {
		this.sendOtherPlayerData(socket);
	}

};

World.prototype.attackTile = function(socket, x, y) {
	if (x < 0 || x >= common.WIDTH || y < 0 || y >= common.HEIGHT) {
		return;
	}
	
	var player = this.players[socket.id];
	
	if (player.isGod) {
		console.log(socket.id + " is god, he can't attack");
		return;
	}
	
	if (player.distance(x, y) != 1) {
		console.log("Cheating tentative by " + socket.id + "? :" + player.distance(x, y));
		return;
	}
	
	var tile = this.tiles[y][x];
	if (tile.r > 0) {
		tile.removeStrength(21);
	}
	this.sendTileChanged(x, y);
};

World.prototype.addStrengthToTile = function(socket, x, y) {
	var player = this.players[socket.id];
	
	if (! player.isGod) {
		console.log(socket.id + " is not god");
		return;
	}

	if (this.getMinDistance(x,y) < common.MIN_PLAYER_DISTANCE) {
		console.log(socket.id + " is too close from a player");
		return;
	}	
	
	var tile = this.tiles[y][x];
	if (tile.r < 100) {
		tile.addStrength(33);
		this.sendTileChanged(x, y);
	}
};

World.prototype.removeStrengthToTile = function(socket, x, y) {
	var player = this.players[socket.id];
	
	if (! player.isGod) {
		console.log(socket.id + " is not god");
		return;
	}
	
	if (this.getMinDistance(x,y) < common.MIN_PLAYER_DISTANCE) {
		console.log(socket.id + " is too close from a player");
		return;
	}
	
	var tile = this.tiles[y][x];
	if (tile.r > 0) {
		tile.removeStrength(33);
		this.sendTileChanged(x, y);
	}
};

World.prototype.changeGod = function() {
	if (this.size < common.MIN_PLAYERS) {
		return;
	}
	
	var oldGod = this.god;
	var newGod;
	
	do {
		newGod = random.randFromObject(this.players);
	} while (oldGod == newGod);
	
	this.god = newGod;
	this.god.isGod = true;
	
	this.sockets[newGod.id].emit('changeMode', true);
	if (oldGod) {
		oldGod.isGod = false;
		if (this.sockets[oldGod.id]) {
			this.sockets[oldGod.id].emit('changeMode', false);
		}
		console.log('World ' + this.id + ' : from ' + oldGod.id + ' to ' + newGod.id);
	}
	else {
		console.log('World ' + this.id + ' : to ' + newGod.id);		
	}	
	
	this.sendAllPlayersData(this.sockets[newGod.id]);

};

World.prototype.updatePlayerLife = function() {
	if (this.size < common.MIN_PLAYERS) {
		return;
	}
		
	for (var key in this.players) {
		if (! this.players[key].isGod) {
			this.players[key].updateLife();
			this.sockets[key].emit('updateLife', this.players[key].life);
		}
	}
};
/**
 * Called when a player has win the game. 
 * Resets the world and send the new world data
 * to the players, and change the current god
 */
World.prototype.winGame = function(socket) {
	// Generates a new world
	this.generate();

	var player = this.players[socket.id];
	player.life = 100;	
	
	for (var key in this.players) {
		this.players[key].generatePosition(this);
	}
	
	this.changeGod();
	this.sendWorldData();
};

World.prototype.sendInitialData = function(socket) {
	var initialData = {
		tiles: this.tiles,
		goal: this.goal,
		id: this.id,
		size: this.size,
		player: this.players[socket.id]
	};
	socket.emit('initialData', initialData);					
	
};

World.prototype.sendOtherPlayerData = function(socket) {
	var player = this.players[socket.id];
	for (var key in this.players) {
		if (socket.id != this.sockets[key].id && this.players[key].isGod) {
			var data = {
				x: player.x,
				y: player.y,
				id: socket.id
			};
			this.sockets[key].emit('otherPlayerData', data);
		}
	}
};

World.prototype.sendAllPlayersData = function(socket) {
	for (var key in this.players) {
		if (socket.id != this.sockets[key].id) {
			var player = this.players[key];
			var data = {
				x: player.x,
				y: player.y,
				id: key
			};
			socket.emit('otherPlayerData', data);			
		}
	}
};

World.prototype.sendSize = function() {
	for (var key in this.sockets) {
		this.sockets[key].emit('changeSize', this.size);
	}
};

World.prototype.sendTileChanged = function(x,y) {
	var data = {
		x: x,
		y: y,
		tile: this.tiles[y][x]
	};

	for (var key in this.sockets) {
		this.sockets[key].emit('tileData', data);
	}
};

World.prototype.sendWorldData = function() {
	for (var key in this.players) {
		var data = {
			tiles: this.tiles,
			goal: this.goal,
			player: this.players[key]
		};
		this.sockets[key].emit('changeWorld', data);							
	}
};

World.prototype.getMinDistance = function(x, y) {
	var minDistance = 255;
	for (var key in this.players) {
		var distance = this.players[key].distance(x,y);
		if (distance < minDistance) {
			minDistance = distance;
		}
	}
	return minDistance;	
};

module.exports = World;