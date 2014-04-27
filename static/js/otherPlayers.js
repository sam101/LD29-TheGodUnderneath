function OtherPlayers() {
	this.players = {};
}

OtherPlayers.prototype.updatePosition = function(data) {
	this.players[data.id] = data;
};

OtherPlayers.prototype.draw = function() {
	
};