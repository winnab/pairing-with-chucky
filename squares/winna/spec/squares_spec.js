var sg = require('../src/squares.js')

xdescribe("findSquares", function() {
  it("given fewer than four points, it returns no squares", function () {
    expect(sg.getSquares([[0, 0], [0, 1]])).toEqual([]);
  })
})





