var World = require('./world');

var common = require('./common');
var random = require('./random');

function Player(socket, world) {
	this.id = socket.id;
	this.isGod = false;
	this.life = 100;	
	this.points = 0;
	
	this.generatePosition(world);
}

Player.prototype.generatePosition = function(world) {
	do {
		this.x = random.randInt(0, world.width);
		this.y = random.randInt(0, world.height);
	} while(this.distance(world.goal.x, world.goal.y) < common.MIN_DISTANCE);	
};

Player.prototype.distance = function(x, y) {
	return Math.floor(Math.abs(this.y - y) + Math.abs(this.x - x));
};

Player.prototype.updateLife = function() {
	this.life -= common.LIFE_DAMAGE;
};

module.exports = Player;