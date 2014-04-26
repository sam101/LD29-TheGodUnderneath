var common = require('./common');
var random = require('./random');

function Goal() {
	this.x = random.randInt(0, common.WIDTH);
	this.y = random.randInt(0, common.HEIGHT);
}

module.exports = Goal;