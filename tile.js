function Tile(type, resistance) {
	this.t = type;
	this.r = resistance;
}

Tile.prototype.addStrength = function(r) {
	this.r -= r;
	this.r = this.r > 100 ? 100 : this.r;
};

Tile.prototype.removeStrength = function(r) {
	this.r -= r;
	this.r = this.r < 0 ? 0 : this.r;
};

module.exports = Tile;