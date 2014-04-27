function Player(data) {
	this.data = data;
	this.isGod = false;
	this.attackState = {n: 0};
}

Player.prototype.draw = function(canvas) {
	canvas.drawImage(res.PLAYER, this.data.x * TILE_SIZE, this.data.y * TILE_SIZE);	
};

Player.prototype.attack = function(x, y) {
	if (this.attackState.x == x && this.attackState.y == y) {
		this.attackState.n++;

		game.world.data[y][x].r -= 3;
				
		if (this.attackState.n == 7 || game.world.data[y][x].r <= 0) {
			socket.emit('attack', x, y);
			this.attackState.n = 0;
		}
	}
	else {
		this.attackState.x = x;
		this.attackState.y = y;
	}
};

Player.prototype.move = function(x, y) {
	if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) {
		return;
	}
	
	if (game.world.data[y][x].r > 0) {
		this.attack(x,y);
	}
	else {
		this.data.x = x;
		this.data.y = y;
		socket.emit('move', x, y);
	}
};

Player.prototype.frame = function(keyboard) {
	if (keyboard.status[KEY_DOWN]) {
		this.move(this.data.x, this.data.y  + 1);
	}	
	else if (keyboard.status[KEY_UP]) {
		this.move(this.data.x, this.data.y  - 1);		
	}
	else if (keyboard.status[KEY_LEFT]) {
		this.move(this.data.x - 1, this.data.y);		
	}
	else if (keyboard.status[KEY_RIGHT]) {
		this.move(this.data.x + 1, this.data.y);		
	}
};