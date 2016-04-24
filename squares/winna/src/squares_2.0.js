
// describe("verticalLinesAreSiblings", function() {
//   it("returns true if it is given two vertical lines each made of two points described bottom to top  that are the same height", function() {
//     var vertLine1 = [[0, 0], [0, 6]]
//     var vertLine2 = [[6, 0], [6, 6]]
//     expect(sg.verticalLinesAreSiblings(vertLine1, vertLine2)).toBe(true);

//   })

//   it("returns false if it is given two vertical lines each made of two points described bottom to top  that are the same height but start and end at different y values", function() {
//     var vertLine1 = [[0, 1], [0, 7]]
//     var vertLine2 = [[6, 0], [6, 6]]
//     expect(sg.verticalLinesAreSiblings(vertLine1, vertLine2)).toBe(false);
//   })
// })


exports.verticalLinesAreSiblings = function(l0, l1) {
  var line0 = makeALineObject(l0);
  var line1 = makeALineObject(l1);

  var height0 = line0.top.y - line0.bottom.y
  var height1 = line1.top.y - line1.bottom.y

  var areSameHeight = height0 == height1

  var startAtSameYValue = line0.bottom.y == line1.bottom.y

  return  arsh&& startAtSameYValue

}

function makeALineObject(arrOfPoints) {
  var point0 = arrOfPoints[0]
  var point1 = arrOfPoints[1]

  return {
    bottom: {
      x: point0[0],
      y: point0[1]
    },
    top: {
      x: point1[0],
      y: point1[1]
    }
  }
}
