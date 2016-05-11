var combinator = require('../src/combinator.js')

describe('getCombinations', function() {
  it("throws an error if no size is passed in", function() {
    expect(function() {
      return combinator.getCombinations([])
    }).toThrow()
  })

  it("throws an error when there aren't enough elements for the given size", function() {
    expect(combinator.getCombinations([1], 2)).toEqual([])
  })

  it("given an empty list, it returns a list containing only one empty list", function() {
    expect(combinator.getCombinations([], 0)).toEqual([[]])
  })

  it("given a size of 0, it returns a list containing only one empty list", function() {
    expect(combinator.getCombinations([1], 0)).toEqual([[]])
  })

  it("given a list of items and a size of the length of the list, it should return itself", function() {
    var list = [1, 2]
    var expectedCombinations = [
      [1, 2]
    ]

    var actualCombinations = combinator.getCombinations(list, 2)
    expect(compareCombinations(expectedCombinations, actualCombinations)).toBe(true);
  })

  it("given a list of items, it returns all combinations of size", function() {
    var list = [1, 2, 3]

    var expectedCombinations = [
      [1, 2],
      [1, 3],
      [2, 3]
    ]

    var actualCombinations = combinator.getCombinations(list, 2)

    expect(compareCombinations(expectedCombinations, actualCombinations)).toBe(true);
  })

  it("given a list of items, it returns all combinations of size", function() {
    var list = [1, 2, 3, 4, 5]

    var expectedCombinations = [
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [2, 3],
      [2, 4],
      [2, 5],
      [3, 4],
      [3, 5],
      [4, 5]
    ]

    var actualCombinations = combinator.getCombinations(list, 2)

    expect(compareCombinations(expectedCombinations, actualCombinations)).toBe(true);
  })

  it("given a list of items, it returns all combinations of size", function() {
    var list = [1, 2, 3, 4]
    var expectedCombinations = [ [1, 2, 3, 4] ]

    var actualCombinations = combinator.getCombinations(list, 4)
    expect(compareCombinations(expectedCombinations, actualCombinations)).toBe(true);
  })


});

function compareCombinations(expectedCombinations, actualCombinations) {
  return expectedCombinations.every(function(expectedElem) {
    var hasAllSameElements = actualCombinations.some(function(actualElem) {
      if (actualElem.length != expectedElem.length) {
        return false;
      }
      return expectedElem.every(function(innerExpectedElem) {
        return actualElem.indexOf(innerExpectedElem) > -1
      })
    })
    if (!hasAllSameElements) {
      console.log("actual", actualCombinations)
      console.log("expected", expectedCombinations)
      console.log("missing ", expectedElem, ".")
      return false;
    }
    return true;
  })
}
