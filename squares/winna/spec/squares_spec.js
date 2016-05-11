var sg = require('../src/squares.js')
var deepEqual = require('deep-equal');

describe("findSquares", function() {
  it("given fewer than four points, it returns no squares", function () {
    expect(sg.getSquares([[0, 0], [0, 1]])).toEqual([]);
  })

  it("given four points that compose a square, it returns the square", function () {
    var points =   [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0]
    ]

    var expectedSquares = [points]

    expect(sg.getSquares(points, 1)).toEqual(expectedSquares);
  })

  it("given more than four including four points that compose a square, it returns the square", function () {
    var points =   [
        [0, 0],
        [9, 2],
        [0, 1],
        [1, 1],
        [1, 4],
        [1, 0],
        [5, 0],
        [2, 0],
        [2, 8]
    ]

    var expectedSquares =   [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0]
    ]

    expect(sg.getSquares(points, 1)).toEqual([expectedSquares]);
  })

  it("given more than four including eight points that compose two squares, it returns the squares", function () {
    var square1 = [
      [3, 3],
      [3, 2],
      [2, 2],
      [2, 3]
    ]

    var square2 =   [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0],
    ]

    var points = square1.concat(square2)
    var expectedSquares =   [square1, square2]

    expect(sg.getSquares(points, 1)).toEqual(expectedSquares);
  })
})





