var game = {};

function Game(data) {
	
	var game = this;
	
	this.canvasElement = document.getElementById("game");
	this.canvas = this.canvasElement.getContext("2d");
	this.canvas.width = 16 * TILE_SIZE;
	this.canvas.height = 12 * TILE_SIZE + 8;	
	
	this.id = data.id;
	this.changeSize(data.size);
	
	this.cursor = new Cursor();
	this.goal = new Goal(data.goal);
	this.player = new Player(data.player);
	this.lifebar = new LifeBar(data.player);
	this.otherPlayers = new OtherPlayers();
	this.world = new World(data.tiles);
	
	this.started = true;
	
	this.keyboard = {
		'status':{},
		onKeydown:function(event){
			event.preventDefault();
			this.status[event.keyCode]=true;
		},
		onKeyup:function(event){
			delete this.status[event.keyCode];
		},
	};
	
	window.addEventListener('keydown', function(event) { game.keyboard.onKeydown(event); }, false);
	window.addEventListener('keyup', function(event) { game.keyboard.onKeyup(event); }, false);
	window.addEventListener('keydown',function(event) { event.preventDefault(); },false);	
	
	window.requestAnimationFrame(function() {
		game.draw();
	});

	this.frameCount = 0;
	this.diff = 0;
	this.lastTime = Date.now();
}

Game.prototype.changeSize = function(size) {
	this.size = size;	
	$('#playerCount').html('World ' + this.id + ' : ' + this.size + ' players');	
};

Game.prototype.frame = function() {
	this.diff += Date.now() - this.lastTime;
	this.lastTime = Date.now();
	
	while (this.diff > FRAME_TIME) {
		this.diff -= FRAME_TIME;
		this.frameCount++;
		if (this.player.isGod) {
			if ( (this.frameCount % 4) == 0) {
				this.cursor.frame(this.keyboard);				
			}
		}
		else {		
			if ( (this.frameCount % 2) == 0) {
				this.player.frame(this.keyboard);	
			}
			
			if ((this.frameCount % 10) == 0) {
				this.lifebar.guessLife();
			}
		}
	}
};

Game.prototype.draw = function() {
	var game = this;
	if (! this.started) {
		return;
	}
	this.frame();
	
	this.canvas.fillStyle = "rgba(0,0,0,1)";
	this.canvas.clearRect(0, 0, this.canvas.width, this.canvas.height);

	this.world.draw(this.canvas);
	this.lifebar.draw(this.canvas);	
	this.goal.draw(this.canvas);
	
	if (this.player.isGod) {
		this.cursor.draw(this.canvas);
		this.otherPlayers.draw(this.canvas);		
	}
	else {
		this.player.draw(this.canvas);
	}

	window.requestAnimationFrame(function() { game.draw(); });
}; 	