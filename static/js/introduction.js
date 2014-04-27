
function introductionListener(event) {
	if (event.keyCode == KEY_ENTER) {
		window.removeEventListener('keydown', introductionListener);
		$('#introduction').slideUp(INTRODUCTION_DELAY);
		setTimeout(function() {
			$('#gamePlay').slideDown(INTRODUCTION_DELAY);
			setTimeout(function() {
				initGame();
			});
		}, INTRODUCTION_DELAY);
	}
}

window.addEventListener('keydown', introductionListener);
