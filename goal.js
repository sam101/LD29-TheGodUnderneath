var common = require('./common');
var random = require('./random');

function Goal() {
	this.x = random.randInt(1, common.WIDTH - 1);
	this.y = random.randInt(1, common.HEIGHT - 1);
}

Goal.prototype.isAtGoal = function(player) {
	return player.x == this.x && player.y == this.y;
};

module.exports = Goal;