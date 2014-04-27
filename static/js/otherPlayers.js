function OtherPlayers() {
	this.players = {};
}

OtherPlayers.prototype.updatePosition = function(data) {
	this.players[data.id] = data;
};

OtherPlayers.prototype.removePlayer = function(id) {
	delete this.players[id];
};

OtherPlayers.prototype.playerDistance = function(x, y, player) {
	return Math.floor(Math.abs(y - player.y) + Math.abs(x - player.x));
};

OtherPlayers.prototype.distance = function(x, y) {
	// TODO: cache it
	var minDistance = 255;
	for (var key in this.players) {
		var distance = this.playerDistance(x,y,this.players[key]);
		if (distance < minDistance) {
			minDistance = distance;
		}
	}
	return minDistance;
};

OtherPlayers.prototype.draw = function(canvas) {
	for (var key in this.players) {
		var player = this.players[key];
		canvas.drawImage(res.OTHER, player.x * TILE_SIZE, player.y * TILE_SIZE);			
	}
};