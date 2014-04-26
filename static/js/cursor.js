function Cursor() {
	this.x = WIDTH / 2;
	this.y = HEIGHT / 2;
}

Cursor.prototype.draw = function(canvas) {
	canvas.drawImage(res.CURSOR, this.x * TILE_SIZE, this.y * TILE_SIZE);		
};
