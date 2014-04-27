exports.randInt = function(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
};

exports.randFromObject = function(obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};