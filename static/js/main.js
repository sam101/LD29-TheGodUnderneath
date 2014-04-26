var screenW = $(document).width(),screenH = $(document).height();
var renderer = PIXI.autoDetectRenderer(736, 480);
document.body.appendChild(renderer.view);

var stage = new PIXI.Stage(0x66FF99);

requestAnimFrame(frame);
// Called each frame of the game
function frame() {
	requestAnimFrame(frame);
	renderer.render(stage);
}

// Connect to the server
var socket = io.connect('http://localhost/');