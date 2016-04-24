var exports = module.exports = {};

exports.getSquares = function(points) {
  if (points.length < 4) { return [] };
  return points;
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

  boolean isValidSquare(listOfFourPoints, length)
    lexicographic sort like the dictionary
    sort by x, y

    return false if
        same x coordinate on left
             absolute value of x1 - x2 != 0
        same x coordinate on right
             absolute value of x3 - x4 != 0

    return false if
        same y coordinate on top
             absolute value of y1 - y2 != length
        same y coordinate on bottom
             absolute value of y3 - y4 != length

    return true
*/
