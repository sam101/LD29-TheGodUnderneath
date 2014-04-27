function Cursor() {
	this.x = WIDTH / 2;
	this.y = HEIGHT / 2;
}

Cursor.prototype.move = function(x, y) {
	if (x < 0 || y < 0 || x >= WIDTH || y >= HEIGHT) {
		return;
	}
	this.x = x;
	this.y = y;
};

Cursor.prototype.frame = function(keyboard) {
	if (keyboard.status[KEY_DOWN]) {
		this.move(this.x, this.y  + 1);
	}	
	else if (keyboard.status[KEY_UP]) {
		this.move(this.x, this.y  - 1);		
	}
	else if (keyboard.status[KEY_LEFT]) {
		this.move(this.x - 1, this.y);		
	}
	else if (keyboard.status[KEY_RIGHT]) {
		this.move(this.x + 1, this.y);		
	}	
};

Cursor.prototype.draw = function(canvas) {
	canvas.drawImage(res.CURSOR, this.x * TILE_SIZE, this.y * TILE_SIZE);		
};
