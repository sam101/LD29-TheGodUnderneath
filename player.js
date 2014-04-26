var World = require('./world');

var common = require('./common');
var random = require('./random');

function Player(socket, world) {
	this.x = random.randInt(0, world.width);
	this.y = random.randInt(0, world.height);
	this.isGod = false;
	console.log("Player position : (" + this.x + "," + this.y + ")");
	// TODO: check distance
}

Player.prototype.distance = function(x, y) {
	return Math.abs(Math.floor(this.y - y + this.x - x));
};

module.exports = Player;