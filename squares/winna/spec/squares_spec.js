var sg = require('../src/squares.js')
var deepEqual = require('deep-equal');

describe("findSquares", function() {
  it("given fewer than four points, it returns no squares", function () {
    expect(sg.getSquares([[0, 0], [0, 1]])).toEqual([]);
  })

  it("given four points that compose a square, it returns the square", function () {
    var points =   [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1]
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
        [1, 0],
        [1, 1],
        [0, 1],
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

    var square2 = [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0],
    ]

    var points = square1.concat(square2)
    var expectedSquares = [
      [
        [2, 2],
        [3, 2],
        [3, 3],
        [2, 3]
      ],
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
      ]
    ]

    expect(sg.getSquares(points, 1)).toEqual(expectedSquares);
  })

  it("looks for squares of size 1", function() {

    var points =   [
      [5, 0],
      [-10, -4],
      [4, 5],
      [-9, -7],
      [5, 4],
      [-8, 6],
      [0, -1],
      [5, 6],
      [3, 1],
      [-4, 3],
      [-4, -6],
      [10, -7],
      [7, -8],
      [-8, 0],
      [-3, 7],
      [-1, 10],
      [-6, -1]
    ]

    var expectedSquares = []

    expect(sg.getSquares(points, 1)).toEqual(expectedSquares);
  })

  it("returns a list of points ordered by: lowerLeft, lowerRight, upperRight, upperLeft", function() {
    var points = [[-8,0],[7,6],[-9,6],[-10,-10],[-2,1],[-9,-9],[1,-5],[-5,-9],[3,-9],[-6,-8],[0,-10],[1,-2],[-4,-9],[-6,-4],[-4,8],[-5,-10],[8,-7],[-9,9],[5,2],[8,1],[-8,-7],[-3,9],[-1,1],[-4,9],[9,-8],[-2,-9],[2,3],[1,-1],[2,4],[-7,10],[4,3],[5,1],[-6,-2],[-3,8],[7,0],[3,-2],[-6,-9],[3,-3],[6,-4],[6,-2],[8,10],[8,-3],[-5,-7],[8,-6]]

    var expectedSquares = [
      [
        [ -4, 8 ],
        [ -3, 8 ],
        [ -3, 9 ],
        [ -4, 9 ]
      ]
    ]
    expect(sg.getSquares(points, 1)).toEqual(expectedSquares);
  })
})





