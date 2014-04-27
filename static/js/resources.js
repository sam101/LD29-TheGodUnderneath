var res = {};

res.CURSOR = new Image();
res.CURSOR.src = "res/cursor.png";

res.CURSOR_TOO_CLOSE = new Image();
res.CURSOR_TOO_CLOSE.src = "res/cursorTooClose.png";

res.GOAL = new Image();
res.GOAL.src = "res/goal.png";

res.OTHER = new Image();
res.OTHER.src = "res/other.png";

res.PLAYER = new Image();
res.PLAYER.src = "res/player.png";

var sound = {};

sound.ADD = new buzz.sound("res/add", {
	formats: ["wav"]
});

sound.DEL = new buzz.sound("res/del", {
	formats: ["wav"]
});

sound.DIG = new buzz.sound("res/dig", {
	formats: ["wav"]
});

sound.LOSE = new buzz.sound("res/lose", {
	formats: ["wav"]
});

sound.ROCK = new buzz.sound("res/rock", {
	formats: ["wav"]
});

sound.WIN = new buzz.sound("res/win", {
	formats: ["wav"]
});


