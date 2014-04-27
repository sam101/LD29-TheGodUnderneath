function gameOver(points) {
	socket.disconnect();
	$('body').off('keydown');
	$('#gamePlay').slideUp(INTRODUCTION_DELAY);
	setTimeout(function() {
		$('#gameOver').slideDown(INTRODUCTION_DELAY);
	}, INTRODUCTION_DELAY);
}
