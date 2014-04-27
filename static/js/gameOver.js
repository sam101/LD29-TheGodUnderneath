function gameOver(points) {
	socket.disconnect();
	$('#gamePlay').slideUp(INTRODUCTION_DELAY);
	setTimeout(function() {
		$('#gameOver').slideDown(INTRODUCTION_DELAY);
	}, INTRODUCTION_DELAY);
//	window.addEventListener('keydown', introductionListener);
}
