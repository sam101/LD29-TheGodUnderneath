function World(data) {
	this.data = data;
	this.height = data.length;
	this.rocks = [];
	this.width = data[0].length;	
}

World.prototype.draw = function(canvas) {
	for (var i = 0; i < this.height; i++) {
		for (var j = 0; j < this.width; j++) {
			Tile.draw(canvas, j * TILE_SIZE, i * TILE_SIZE, this.data[i][j]);
		}
	}
	this.rocks.forEach(function(element) {
		canvas.drawImage(res.ROCK, element.x * TILE_SIZE, element.y * TILE_SIZE);			
	});
};

World.prototype.updateTile = function(x, y, tile) {
	this.data[y][x] = tile;
};

World.prototype.updateRocks = function(rocks) {
	this.rocks = rocks;
};