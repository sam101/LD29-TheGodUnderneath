// Connect to the server
var socket = io.connect('http://localhost/');

// Called on initialisation, when the server sends the game data to the client
socket.on('initialData', function(data) {
	init(data);
});

socket.on('tileData', function(data) {
	game.world.updateTile(data.x, data.y, data.tile);
});