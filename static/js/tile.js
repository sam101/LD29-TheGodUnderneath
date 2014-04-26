function Tile() {
	
}

Tile.draw = function(canvas, x, y, data) {
	canvas.fillStyle = "rgba(0,0,0, " + data.r / 100 + ")";
	canvas.fillRect(x,y, TILE_SIZE, TILE_SIZE);
};