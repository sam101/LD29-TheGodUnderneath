function Cursor() {
	this.x = WIDTH / 2;
	this.y = HEIGHT / 2;
}

Cursor.prototype.move = function(x, y) {
	
};

Cursor.prototype.frame = function(keyboard) {
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

Cursor.prototype.draw = function(canvas) {
	canvas.drawImage(res.CURSOR, this.x * TILE_SIZE, this.y * TILE_SIZE);		
};
