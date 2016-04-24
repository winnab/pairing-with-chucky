"use strict";

var exports = module.exports = {};

function arrayMin(arr) {
	return Math.min.apply(Math, arr);
};

// from Camilo Martin, http://stackoverflow.com/questions/894860/set-a-default-parameter-value-for-a-javascript-function
function defaultFor(arg, val) { return typeof arg !== 'undefined' ? arg : val; }

// these should be passed in
var TIMES_TO_RUN = 1;
var WARMUP_TIMES = 50;
var WARMUP_N = 5;
var N_INCREASE_FACTOR = 2;

var Stopwatch = require('statman-stopwatch');
// var Stats = require("stats-lite");

function benchOne(n, fun, inputFun, times) {
	// console.log(n, fun, inputFun, times);
	var inputs = [];
	for (var i = 0; i < times; i++) {
		inputs.push(inputFun(n));
	}

	var sw = new Stopwatch();
	sw.start();

	for (var i = 0; i < times; i++) {
		fun(inputs[i]);
	}

	var deltat = sw.read();
	return deltat / times;
}

function warmup(functions) {
	for (var funo of functions) {		
		for (var i = 0; i < WARMUP_TIMES; i++) {
			funo.fun(funo.inputFun(WARMUP_N));
		}
	}
}

exports.bench = function(functions, nMin, nMax) {
	nMin = defaultFor(nMin, 1);
	nMax = defaultFor(nMax, 100);

	warmup(functions);

	var times = {};
	var n = nMin;
	while (n < nMax) {
		for (var funNum = 0; funNum < functions.length; funNum++) {
			var funo = functions[funNum];
			var t = benchOne(n, funo.fun, funo.inputFun, TIMES_TO_RUN);
			if (!times[n]) {
				times[n] = [];
			}
			times[n].push(t); // this is all really gross
		}
		n *= N_INCREASE_FACTOR;
	}

	print(functions, times);
}

function print(functions, times) {
	// yuck
	// var funNames = _.pluck(functions, "name");
	var funNames = functions.reduce(function(previousValue, currentValue, currentIndex, array) {
		previousValue.push(currentValue.name);
		return previousValue;
	}, []);

	// print header
	console.log("n," + funNames.join(","));

	// print data
	Object.keys(times).forEach(function(n) {
		var ntimes = times[n];
		console.log(n + "," + ntimes.join(","));
	});
}



exports.bias = function(functions, nMin, nMax) {
	nMin = defaultFor(nMin, 1);
	nMax = defaultFor(nMax, 100);

	warmup(functions);

	var funo = functions[0]; // only caring about first function for now
	var times = {};
	var n = nMin;
	while (n < nMax) {
		for (var i = 0; i < 5000; i++) {
			var t = benchOne(n, funo.fun, funo.inputFun, TIMES_TO_RUN);
			if (!times[n]) {
				times[n] = [];
			}
			times[n].push(t); // this is all really gross
		}
		n *= N_INCREASE_FACTOR;		
	}

	// Object.keys(times).forEach(function(n) {
	// 	var ntimes = times[n];
	// 	// console.log(n + "," + arrayMin(ntimes) + "," + ntimes.join(","));
	// 	console.log(
	// }); 

	var ntimes = times[81920];
	for (var time of ntimes) {
		console.log(time);
	}

	//console.log(times);
}
