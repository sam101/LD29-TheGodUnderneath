function OtherPlayers() {
	this.players = {};
}

OtherPlayers.prototype.updatePosition = function(data) {
	this.players[data.id] = data;
};

OtherPlayers.prototype.removePlayer = function(id) {
	delete this.players[id];
};

OtherPlayers.prototype.draw = function(canvas) {
	for (var key in this.players) {
		var player = this.players[key];
		canvas.drawImage(res.OTHER, player.x * TILE_SIZE, player.y * TILE_SIZE);			
	}
};