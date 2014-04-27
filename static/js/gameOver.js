function gameOver(points) {
	$('body').off('keydown');
	socket.disconnect();
	
	sound.LOSE.play();
	
	$('.points').html('' + points);
	
	$('#gamePlay').slideUp(INTRODUCTION_DELAY);
	setTimeout(function() {
		$('#gameOver').slideDown(INTRODUCTION_DELAY);
	}, INTRODUCTION_DELAY);
}
