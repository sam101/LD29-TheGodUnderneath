var Player = require('./player');
var Tile = require('./tile');

var common = require('./common');
var random = require('./random');

function World() {
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

World.prototype.attackTile = function(socket, x, y) {
	if (x < 0 || x >= common.WIDTH || y < 0 || y >= common.HEIGHT) {
		return;
	}
	
	var player = this.players[socket.id];
	
	if (player.isGod) {
		return;
	}
	
	var tile = this.tiles[y][x];
	
	// TODO: Check player

	if (tile.r > 0) {
		tile.r -= 20;
	}
		
	this.sendTileChanged(x, y);
	
};

World.prototype.delPlayer = function(socket) {
	this.size--;
	delete this.players[socket.id];
	delete this.sockets[socket.id];
};


module.exports = World;