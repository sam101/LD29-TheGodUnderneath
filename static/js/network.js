// Connect to the server
var socket = io.connect('http://localhost/');

// Called on initialisation, when the server sends the game data to the client
socket.on('worldData', function(data) {
	init(data);
});
