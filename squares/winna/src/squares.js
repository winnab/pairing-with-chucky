var Combinator = require('./combinator.js')

var exports = module.exports = {};

exports.getSquaresFaster = function(points, sideLength) {
  var squares = []
  var pointsByXCoord = {}

  points.forEach(function(point) {
    var x = point[0]
    var y = point[1]

    if (!pointsByXCoord[x]) {
      pointsByXCoord[x] = {}
    }

    if (!pointsByXCoord[x][y]) {
      pointsByXCoord[x][y] = []
    }

    pointsByXCoord[x][y].push(point)
  })

  var needsFurtherChecking = []

  Object.keys(pointsByXCoord).forEach(function(x){
    x = Number.parseInt(x)
    var potentialMatch = x + sideLength
    if(pointsByXCoord[potentialMatch]) {
      needsFurtherChecking.push([x, potentialMatch])
    }
  })

  needsFurtherChecking.forEach(function(pair){
    var left = pair[0]
    var right = pair[1]
    Object.keys(pointsByXCoord[left]).forEach(function(y){
      y = Number.parseInt(y)
      if (pointsByXCoord[right][y]) {
        var topY = y + sideLength

        if (
          pointsByXCoord[right][topY]
          && pointsByXCoord[left][topY]
        ) {
          // p'3 -- p'2
          // |      |
          // p'0 -- p'1

          var square = [
            [left, y],
            [right, y],
            [right, topY],
            [left, topY]
          ]

          squares.push(square)
        }
      }
    })
  })

  return squares

}
/*
create an object

x value is the key, array of points where x is the key is the value
at this point, sort values by y coordinate

  points is a list of n points

  for each point p in points,
    if !ds[p.x], ds[p.x] = {}
    if !ds[p.x][p.y], ds[p.x][p.y] = []
    ds[p.x][p.y].push(p)
    // ds[p.x][p.y].sort

  pointsByXCoord = {
    1: {
      2: [(1, 2),(1, 2)],
      3: [(1, 3)],
    },
    2: {
      4: [(2, 4)],
      6: [(2, 6)],
    }
    4: {
      1: [(4, 1)]
    }
  }

  // 2
  {
    2: [],
    4: [],
    6: [],
    9: [],
    11: []
  }

  {
    2: [],
    11: [],
    9: [],
    4: []
  }

  needsFurtherChecking = []

  go through pointsByXCoord

  x2 - x1 == sideLength ?
    yes: push (x1, x2) to needsFurtherChecking
    no: skip

  for each (x1, x2) in needsFurtherChecking
    Object.keys( pointsByXCoord[x1] ).forEach( (y) {
      if pointsByXCoord[x2][y] {
        you have a possible side

        topYValue = y + sideLength
        if pointsByXCoord[x1][topYValue] && pointsByXCoord[x2][topYValue] {
          you have a square
        }
      }
    })
*/

exports.getSquares = function(points, sideLength) {
  if (points.length < 4) { return [] };

  var combinations = Combinator.getCombinations(points, 4)

  // console.log('combinations', combinations)

  var unsortedSquares = combinations.filter(function(combo) {
    return isValidSquare(combo, sideLength)
  })

  // should be linear
  return unsortedSquares.map(function(square) {
    // p'3 -- p'2
    // |      |
    // p'0 -- p'1
    return [
      square[0], // p'0
      square[2], // p'1
      square[3], // p'2
      square[1]  // p'3
    ]
  })
}

  // look for square
  // pointU-----pointUR
  //   |          |
  // point------pointR

function isValidSquare(listOfFourPoints, sideLength) {
  var sorted = sortPoints(listOfFourPoints)

  // p1 -- p3
  // |      |
  // p0 -- p2

  var x0 =  sorted[0][0]
  var x1 =  sorted[1][0]
  var x2 =  sorted[2][0]
  var x3 =  sorted[3][0]

  // x coordinates are the same
  if ( x0 != x1 ) { return false }
  if ( x2 != x3 ) { return false }

  var y0 =  sorted[0][1]
  var y1 =  sorted[1][1]
  var y2 =  sorted[2][1]
  var y3 =  sorted[3][1]

  // y coordinates are the same
  if ( y1 != y3 ) { return false }
  if ( y0 != y2 ) { return false }

  // we have rectangles, now we need we check if they're squares
  // one side in each direction is the size we're looking for
  if ( x2 - x0 != sideLength ) { return false }
  if ( y1 - y0 != sideLength ) { return false }

  return true
}

function sortPoints(points) {
  return points.sort(function(a, b) {
    var ax = a[0]
    var ay = a[1]

    var bx = b[0]
    var by = b[1]

    if (ax < bx) {
      return -1
    }

    if (ax > bx) {
      return 1
    }

    if (ax == bx) {
      if (ay < by) {
        return -1
      }

      if (ay > by) {
        return 1
      }
    }

    return 0;
  })
}

