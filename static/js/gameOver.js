function gameOver(points) {
	$('body').off('keydown');
	socket.disconnect();
	
	$('.points').html('' + points);
	
	$('#gamePlay').slideUp(INTRODUCTION_DELAY);
	setTimeout(function() {
		$('#gameOver').slideDown(INTRODUCTION_DELAY);
	}, INTRODUCTION_DELAY);
}
