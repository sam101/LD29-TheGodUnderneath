var socket;
function initGame() {
	// Connect to the server
	socket = io.connect();
	
	socket.on('changeMode', function(isGod) {
		if (isGod) {
			ui.changeMode('god');
		}
		else {
			ui.changeMode('normal');
		}
		game.player.isGod = isGod;
	});	
	
	socket.on('changeSize', function(size) {
		if (game.started) {
			game.changeSize(size);
		}
	});
	
	socket.on('changeWorld', function(data) {
		game.changeWorld(data);
	});	
	
	socket.on('disconnect', function() {
		game.started = false;
		ui.showInfo('Waiting for server...');
	});
	
	socket.on('waitingForPlayers', function() {
		game.started = false;
		ui.showInfo('Waiting for players...');
	});
	
	socket.on('gameOver', function(points) {
		gameOver(points);
	});
	
	// Called on initialisation, when the server sends the game data to the client
	socket.on('initialData', function(data) {
		ui.changeMode('normal');
		game = new Game(data);
	});	

	socket.on('otherPlayerData', function(data) {
		if (game.started) {
			game.otherPlayers.updatePosition(data);
		}
	});
	
	socket.on('removePlayer', function(id) {
		if (game.started) {
			game.removePlayer(id);
		}
	});	
	
	socket.on('tileData', function(data) {
		if (game.started) {
			game.world.updateTile(data.x, data.y, data.tile);
		}
	});
	
	socket.on('updateRocks', function(rocks) {
		if (game.started) {
			game.world.updateRocks(rocks);
		}
	});
	
	socket.on('updateLife', function(life) {
		if (game.started) {
			game.lifebar.updateLife(life);
		}
	});	
}