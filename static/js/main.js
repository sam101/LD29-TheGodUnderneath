var game = {};
function init(data) {
	
	game.canvasElement = document.getElementById("game");
	game.canvas = game.canvasElement.getContext("2d");
	game.canvas.width = 16 * TILE_SIZE;
	game.canvas.height = 12 * TILE_SIZE;	
	
	game.player = new Player(data.player);
	game.world = new World(data.tiles);
	
	window.requestAnimationFrame(frame);
}

function frame() {
	game.canvas.fillStyle = "rgba(0,0,0,1)";
	game.canvas.clearRect(0, 0, game.canvas.width, game.canvas.height);

	game.world.draw(game.canvas);
	game.player.draw(game.canvas);
	
	window.requestAnimationFrame(frame);
} 