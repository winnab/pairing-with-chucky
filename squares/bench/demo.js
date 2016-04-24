var bh = require('./index.js');

// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function createArray(n) {
	var arr = [];
	for (var i = 0; i < n; i++) {
		var randInt = getRandomInt(0, 10000);
		arr.push(randInt);
	}
	return arr;
};

/////////////////////////////////////////////////
// from http://www.stoimen.com/blog/2010/07/09/friday-algorithms-javascript-bubble-sort/
function bubbleSort(a) {
	var swapped;
	do {
		swapped = false;
		for (var i=0; i < a.length-1; i++) {
			if (a[i] > a[i+1]) {
				var temp = a[i];
				a[i] = a[i+1];
				a[i+1] = temp;
				swapped = true;
			}
		}
	} while (swapped);
};

// from http://algorithms.openmymind.net/sort/insertionsort.html
function insertionSort(values) {
	var length = values.length;
	for(var i = 1; i < length; ++i) {
		var temp = values[i];
		var j = i - 1;
		for(; j >= 0 && values[j] > temp; --j) {
			values[j+1] = values[j];
		}
		values[j+1] = temp;
	}
};

function mysort(arr) {
	// arr.sort(function(a, b) { return a - b; });
	arr.sort((a, b) => a - b);
	//console.log(arr);
};

var sortFunctions = [
	{
		name: "builtinSort",
		fun: mysort,
		inputFun: createArray,
	},
	{
		name: "bubbleSort",
		fun: bubbleSort,
		inputFun: createArray,
	},
	{
		name: "insertionSort",
		fun: insertionSort,
		inputFun: createArray,
	},
];
/////////////////////////////////////////////////

/////////////////////////////////////////////////
function sum(arr) {
	var sum = 0;
	for (var x of arr) {
		sum += x;
	}
}
function product(arr) {
	var product = 1;
	for (var x of arr) {
		product *= x;
	}
}
var arithFunctions = [
	{
		name: "product",
		fun: product,
		inputFun: createArray,
	},
	{
		name: "sum",
		fun: sum,
		inputFun: createArray,
	},
];
/////////////////////////////////////////////////


//var functions = sortFunctions;
var functions = arithFunctions;

bh.bench(functions, 10, 10000000);
// bh.bias(functions);