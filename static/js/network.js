var socket;
function initGame() {
	// Connect to the server
	socket = io.connect('http://localhost/');
	
	// Called on initialisation, when the server sends the game data to the client
	socket.on('initialData', function(data) {
		$('#info').html('');
		$('#godMode').hide();
		$('#normalMode').slideDown(ANIMATION_DELAY);
		init(data);
	});
	
	socket.on('disconnect', function() {
		game.started = false;
		$('#info').html('Waiting for server...');
		$('#normalMode').slideUp(ANIMATION_DELAY);
		$('#godMode').slideUp(ANIMATION_DELAY);
	});
	
	socket.on('waitingForPlayers', function() {
		game.started = false;
		$('#info').html('Waiting for players...');
		$('#normalMode').slideUp(ANIMATION_DELAY);
		$('#godMode').slideUp(ANIMATION_DELAY);
	});
	
	socket.on('gameOver', function() {
	
	});
	
	socket.on('changeWorld', function(data) {
		game.world.data = data.tiles;
		game.goal = new Goal(data.goal);
		game.world.player = new Player(data.player);
	});
	
	socket.on('changeMode', function(isGod) {
		if (isGod) {
			$('#normalMode').hide();
			$('#godMode').slideDown(ANIMATION_DELAY);
		}
		else {
			$('#godMode').hide();
			$('#normalMode').slideDown(ANIMATION_DELAY);
		}
		game.player.isGod = isGod;
	});
	
	socket.on('updateLife', function(life) {
		if (game.started) {
			game.lifebar.updateLife(life);
		}
	});
	
	socket.on('otherPlayerData', function(data) {
		if (game.started) {
			game.otherPlayers.updatePosition(data);
		}
	});
	
	socket.on('removePlayer', function(id) {
		if (game.started) {
			game.otherPlayers.removePlayer(data);
		}
	});
	
	socket.on('tileData', function(data) {
		if (game.started) {
			game.world.updateTile(data.x, data.y, data.tile);
		}
	});
}