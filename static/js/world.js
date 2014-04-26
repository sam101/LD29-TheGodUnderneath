function World(data) {
	this.data = data;
	this.height = data.length;
	this.width = data[0].length;	
}

World.prototype.draw = function(canvas) {
	for (var i = 0; i < this.height; i++) {
		for (var j = 0; j < this.width; j++) {
			Tile.draw(canvas, j * TILE_SIZE, i * TILE_SIZE, this.data[i][j]);
		}
	}
};

World.prototype.updateTile = function(x, y, tile) {
	this.data[y][x] = tile;
};
