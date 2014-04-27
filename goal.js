var common = require('./common');
var random = require('./random');

function Goal() {
	this.x = random.randInt(0, common.WIDTH);
	this.y = random.randInt(0, common.HEIGHT);
}

Goal.prototype.isAtGoal = function(player) {
	return player.x == this.x && player.y == this.y;
};

module.exports = Goal;