var Combinator = require('./combinator.js')

var exports = module.exports = {};


exports.getSquares = function(points, sideLength) {
  if (points.length < 4) { return [] };

  // console.log('points', points)

  var combinations = Combinator.getCombinations(points, 4)

  // console.log('combinations', combinations)

  var unsortedSquares = combinations.filter(function(combo) {
    return isValidSquare(combo, sideLength)
  })

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





  /*
  Make it work, make it right, make it fast.

  API
  - Point
    - array of 2 elements
    - x, y integer pairs
  - Square
    - array of points
    - defined by its four corners
    - order: BottomLeft, BottomRight, TopRight, TopLeft

  Input
  - A list of Points and a length (integer)

  Output
  - A list of Squares
*/

/*

  (
   (0, 0),
   (0, 5),
   (5, 0),
   (5, 5),
  )

  list findSquares(listOfPoints, length)
    squares = [];

    l = length

    valid square
    - has 4 points
    - distance between points is equal on all sides
    - distance is equal to l

    combinations = getCombinations(listOfPoints, 4)
    for each combo in combinations
      if isValidSquare(combo, length)
        squares.push(combo)

    return squares


  list of squares getCombinations(list<T>, size)
    combinations = [];

    if size < 0
      throw("can't get combinations for a negative size")

    if size == 0
      return [[]]

    for each element in list
      smallerCombinations = getCombinations(list - element, size - 1)
        for each list in smallerCombinations
          list.push(element)
      combinations = combinations.concat(smallerCombination)

    return combinations


*/
