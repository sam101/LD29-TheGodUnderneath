var game = {};
function init(data) {	
	game.canvasElement = document.getElementById("game");
	game.canvas = game.canvasElement.getContext("2d");
	game.canvas.width = 16 * TILE_SIZE;
	game.canvas.height = 12 * TILE_SIZE;	
	
	game.player = new Player(data.player);
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
	setInterval(frame, 40);
}
function frame() {
	if (! game.started) {
		return;
	}
	game.player.frame(game.keyboard);	
}
function draw() {
	if (! game.started) {
		return;
	}
	
	game.canvas.fillStyle = "rgba(0,0,0,1)";
	game.canvas.clearRect(0, 0, game.canvas.width, game.canvas.height);

	game.world.draw(game.canvas);
	game.player.draw(game.canvas);
	
	window.requestAnimationFrame(draw);
} 