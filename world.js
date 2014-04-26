var Player = require('./player');
var Tile = require('./tile');

function World() {
	this.size = 0;
	this.playersById = {};
	// Generate tiles
	this.generate();
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}


World.prototype.generate = function() {
	this.width = 23;
	this.height = 15;
	this.tiles = [];
	for (var i = 0; i < this.height; i++) {
		this.tiles[i] = [];
		for (var j = 0; j < this.width; j++) {
			this.tiles[i][j] = new Tile(0, random(0,100));
		}
	}
};

World.prototype.isFull = function() {
	return this.size >= 5;
};


World.prototype.addPlayer = function(socket) {
	this.size++;
	this.playersById[socket.id] = new Player(socket);
};

World.prototype.delPlayer = function(socket) {
	this.size--;
	delete this.playersById[socket.id];
};


module.exports = World;