var chucky = require('./chuckyNodeSquares.js');
var bh = require('../bench/index.js');
var winna = require('../winna/src/squares.js')

var COORD_MIN = -10;
var COORD_MAX = 10 + 1;
// var COORD_MIN = Number.MIN_SAFE_INTEGER;
// var COORD_MAX = Number.MAX_SAFE_INTEGER;
// var COORD_MIN = -1000;
// var COORD_MAX = 10000 + 1;

var TEST_N = 1000;
var TEST_LEN = 1;

// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function generatePoints(n) {
	var retval = [];
	for (var i = 0; i < n; i++) {
		var x = getRandomInt(COORD_MIN, COORD_MAX);
		var y = getRandomInt(COORD_MIN, COORD_MAX);
		retval.push([x, y]);
	}
	// // add extra squares
	// for (var i = 0; i < n; i++) {
	// 	var x = getRandomInt(COORD_MIN, COORD_MAX);
	// 	var y = getRandomInt(COORD_MIN, COORD_MAX);
	// 	retval.push([x, y]);
	// 	retval.push([x+TEST_LEN, y]);
	// 	retval.push([x, y+TEST_LEN]);
	// 	retval.push([x+TEST_LEN, y+TEST_LEN]);
	// }
	return retval;
}

var functionsGivenLength = [
	{
		name: "chucky0",
		fun: function(arg) { return chucky.findSquares0(arg, 1); },
		inputFun: generatePoints,
	},
	// {
	// 	name: "chucky1",
	// 	fun: function(arg) { return chucky.findSquares1(arg, 1); },
	// 	inputFun: generatePoints,
	// },
	// {
	// 	name: "winna0",
	// 	fun: function(arg) { return winna.getSquares(arg, 1); },
	// 	inputFun: generatePoints,
	// },
	{
		name: "winna1",
		fun: function(arg) { return winna.getSquaresFaster(arg, 1); },
		inputFun: generatePoints,
	}
];

var functionsAllLengths = [
	{
		name: "chuckyAll0",
		fun: chucky.findAllSquares0,
		inputFun: generatePoints,
	},
];

function test(functions) {
	for (var n = 0; n < 50; n++) {
		for (var i = 0; i < 5; i++) {
			if (testOnce(functions, n)) {
				return true;
			}
		}
	}
};

function testOnce(functions, n) {
	var test = generatePoints(n);
	// console.log(test);
	var results = functions.map(function(funo) {
		var squares = funo.fun(test);
		var listStrings = [];
		for (var square of squares) {
			listStrings.push(square.toString());
		}
		listStrings.sort();
		return listStrings;
	});

	// console.log(results);
	var standard = results[0];
	for (var i = 1; i < results.length; i++) {
		var other = results[i];
		if (standard.toString() != other.toString()) {
			console.log("Error: " + functions[0].name + " does not agree with " + functions[i].name);
			console.log("Example input:\n" + JSON.stringify(test));

			console.log(functions[0].name, '\n:', JSON.stringify(standard), '\n')
			console.log(functions[i].name, '\n:', JSON.stringify(other))
			return true;
		}
	}
	return false;
};

// testOnce(functionsGivenLength, 60);

bh.bench(functionsGivenLength, 1, 800000);
// bh.bench(functionsGivenLength.concat(functionsAllLengths), 10, 100);
