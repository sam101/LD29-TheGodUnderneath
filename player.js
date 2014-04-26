var World = require('./world');

var common = require('./common');
var random = require('./random');

function Player(socket, world) {
	this.x = random.randInt(0, world.width);
	this.y = random.randInt(0, world.height);
	console.log("Player position : (" + this.x + "," + this.y + ")");
	// TODO: check distance
}

module.exports = Player;