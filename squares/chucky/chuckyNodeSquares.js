"use strict";

var exports = module.exports = {};

function translate(point, x, y) {
	return [point[0] + x, point[1] + y];
}

function onePassAnalysis(points) {
	var analysis = {};

	// create a basic lookup table for points, and extract distinct points	
	analysis.dictionaryOfPoints = {};
	analysis.distinctPoints = [];
	analysis.minx = Number.MAX_SAFE_INTEGER;
	analysis.maxx = Number.MIN_SAFE_INTEGER;
	analysis.miny = Number.MAX_SAFE_INTEGER;
	analysis.maxy = Number.MIN_SAFE_INTEGER;
	for (var point of points) {
		// this is tricky, because JS converts [x, y] into 'x,y'
		if (!(point in analysis.dictionaryOfPoints)) {
			analysis.distinctPoints.push(point);
			analysis.dictionaryOfPoints[point] = true;
		}
		if (analysis.minx > point[0]) {
			analysis.minx = point[0];
		}
		if (analysis.maxx < point[0]) {
			analysis.maxx = point[0];
		}
		if (analysis.miny > point[1]) {
			analysis.miny = point[1];
		}
		if (analysis.maxy < point[1]) {
			analysis.maxy = point[1];
		}
	}

	return analysis;
}

exports.findSquares0 = function(points, length) {
	var retval = [];

	var helpers = onePassAnalysis(points);
	var dictionaryOfPoints = helpers.dictionaryOfPoints;
	var distinctPoints = helpers.distinctPoints;

	// only care about distinct points
	points = distinctPoints;

	return findSquares0Aux(points, dictionaryOfPoints, length);	
};

function findSquares0Aux(points, dictionaryOfPoints, length) {
	var retval = [];

	// look for square
	// pointU-----pointUR
	//   |          |
	// point------pointR
	for (var point of points) {
		var pointR = translate(point, length, 0);
		var pointUR = translate(point, length, length);
		var pointU = translate(point, 0, length);

		// console.log([point, pointR, pointUR, pointU]);
		if (pointR in dictionaryOfPoints
			&& pointUR in dictionaryOfPoints
			&& pointU in dictionaryOfPoints
		) {
			retval.push([point, pointR, pointUR, pointU]);
		}
	}
	return retval;
};

exports.findSquares1 = function(points, length) {
	var retval = [];

	var helpers = onePassAnalysis(points);
	var dictionaryOfPoints = helpers.dictionaryOfPoints;
	var distinctPoints = helpers.distinctPoints;

	// only care about distinct points
	points = distinctPoints;

	return findSquares1Aux(points, dictionaryOfPoints, length);
};

function findSquares1Aux(points, dictionaryOfPoints, length) {
	var retval = [];

	// look for square 
	// pointU-----pointUR
	//   |          |
	// point------pointR
	for (var point of points) {
		var pointR = translate(point, length, 0);
		if (!(pointR in dictionaryOfPoints)) {
			continue;
		}
		var pointUR = translate(point, length, length);
		if (!(pointUR in dictionaryOfPoints)) {
			continue;
		}
		var pointU = translate(point, 0, length);
		if (!(pointU in dictionaryOfPoints)) {
			continue;
		}
		retval.push([point, pointR, pointUR, pointU]);
	}
	return retval;
};





exports.findAllSquares0 = function(points) {
	var retval = [];

	var helpers = onePassAnalysis(points);
	var dictionaryOfPoints = helpers.dictionaryOfPoints;
	var distinctPoints = helpers.distinctPoints;

	var distx = helpers.maxx - helpers.minx;
	var disty = helpers.maxy - helpers.miny;
	var maxlength = Math.min(distx, disty);

	// only care about distinct points
	points = distinctPoints;

	for (var length = 0; length < maxlength; length++) {
		retval.concat(findSquares0Aux(points, dictionaryOfPoints, length));
	}
	return retval;
};
