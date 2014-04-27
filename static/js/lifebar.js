function LifeBar(player) {
	this.player = player;

}

LifeBar.prototype.updateLife = function(value) {
	this.player.life = value;
};

LifeBar.prototype.guessLife = function() {
	this.player.life -= GUESS_LIFE;
};

LifeBar.prototype.draw = function(canvas) {
	if (game.player.isGod) {
		canvas.fillStyle = "rgba(10,10,121,0.9)";
		canvas.fillRect(0,384, 512, 8);		
	}
	else {
		canvas.fillStyle = "rgba(121,10,10,0.9)";
		canvas.fillRect(0,384, this.player.life * 5.12, 8);
	}
};

