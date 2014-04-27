// Connect to the server
var socket = io.connect('http://localhost/');

// Called on initialisation, when the server sends the game data to the client
socket.on('initialData', function(data) {
	$('#info').html('');
	init(data);
});

socket.on('disconnect', function() {
	game.started = false;
	$('#info').html('Waiting for server...');
});

socket.on('waitingForPlayers', function() {
	game.started = false;
	$('#info').html('Waiting for players...');
});

socket.on('gameOver', function() {

});

socket.on('changeMode', function(isGod) {
	game.isGod = isGod;
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