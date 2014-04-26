function Goal(data) {
	this.data = data;
}

Goal.prototype.draw = function(canvas) {
	canvas.drawImage(res.GOAL, this.data.x * TILE_SIZE, this.data.y * TILE_SIZE);		
};