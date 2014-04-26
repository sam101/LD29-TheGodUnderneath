function Player(data) {
	this.data = data;
}

Player.prototype.draw = function(canvas) {
	console.log("(" + this.data.x + "," + this.data.y + ")");
	canvas.drawImage(res.PLAYER, this.data.x * TILE_SIZE, this.data.y * TILE_SIZE);	
};