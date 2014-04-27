var World = require('./world');

var common = require('./common');
var random = require('./random');

function Player(socket, world) {
	this.isGod = false;
	this.life = 100;
	do {
		this.x = random.randInt(0, world.width);
		this.y = random.randInt(0, world.height);
	} while(this.distance(world.goal.x, world.goal.y) < common.MIN_DISTANCE);
}

Player.prototype.distance = function(x, y) {
	return Math.abs(Math.floor(this.y - y + this.x - x));
};

Player.prototype.updateLife = function() {
	this.life -= common.LIFE_DAMAGE;
};

module.exports = Player;