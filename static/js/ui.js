function UI() {
	
}

UI.prototype.changeMode = function(mode) {
	$('#info').html('');
	if (mode == 'god') {
		$('#normalMode').hide();
		$('#godMode').slideDown(ANIMATION_DELAY);		
	}
	else if (mode == 'normal') {
		$('#godMode').hide();
		$('#normalMode').slideDown(ANIMATION_DELAY);
	}
};

UI.prototype.showInfo = function(message) {
	$("#info").hide();
	$('#info').html(message);
	$('#info').slideDown(ANIMATION_DELAY);
	$('#normalMode').slideUp(ANIMATION_DELAY);
	$('#godMode').slideUp(ANIMATION_DELAY);	
};

var ui = new UI();