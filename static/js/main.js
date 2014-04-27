var game = {};
function init(data) {	
	game.canvasElement = document.getElementById("game");
	game.canvas = game.canvasElement.getContext("2d");
	game.canvas.width = 16 * TILE_SIZE;
	game.canvas.height = 12 * TILE_SIZE + 8;	
	
	game.cursor = new Cursor();
	game.goal = new Goal(data.goal);
	game.player = new Player(data.player);
	game.lifebar = new LifeBar(data.player);
	game.otherPlayers = new OtherPlayers();
	game.world = new World(data.tiles);
	
	game.started = true;
	
	game.keyboard = {
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
	
	window.requestAnimationFrame(draw);

	game.frameCount = 0;
	game.diff = 0;
	game.lastTime = Date.now();
}
function frame() {
	game.diff += Date.now() - game.lastTime;
	game.lastTime = Date.now();
	
	while (game.diff > FRAME_TIME) {
		game.diff -= FRAME_TIME;
		game.frameCount++;
		if (game.player.isGod) {
			if ( (game.frameCount % 4) == 0) {
				game.cursor.frame(game.keyboard);				
			}
		}
		else {		
			if ( (game.frameCount % 2) == 0) {
				game.player.frame(game.keyboard);	
			}
			
			if ((game.frameCount % 10) == 0) {
				game.lifebar.guessLife();
			}
		}
	}
}
function draw() {
	if (! game.started) {
		return;
	}
	
	frame();
	
	game.canvas.fillStyle = "rgba(0,0,0,1)";
	game.canvas.clearRect(0, 0, game.canvas.width, game.canvas.height);

	game.world.draw(game.canvas);
	game.goal.draw(game.canvas);
	
	if (game.player.isGod) {
		game.cursor.draw(game.canvas);
		game.otherPlayers.draw(game.canvas);		
	}
	else {
		game.lifebar.draw(game.canvas);	
		game.player.draw(game.canvas);
	}

	window.requestAnimationFrame(draw);
} 