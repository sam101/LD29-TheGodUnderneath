
$(document).ready(function() {
	function introductionListener(event) {
		if (event.keyCode == KEY_ENTER) {
			$('body').off('keydown', introductionListener);
			$('#introduction').slideUp(INTRODUCTION_DELAY);
			setTimeout(function() {
				$('#gamePlay').slideDown(INTRODUCTION_DELAY);
				setTimeout(function() {
					initGame();
				}, INTRODUCTION_DELAY);
			}, INTRODUCTION_DELAY);
		}
	}

	$('body').on('keydown', introductionListener);	
});

