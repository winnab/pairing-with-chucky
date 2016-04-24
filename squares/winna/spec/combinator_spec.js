var combinator = require('../src/combinator.js')

describe('getCombinations', function() {
  it("throws an error if no size is passed in", function() {
    expect(function() {
      return combinator.getCombinations([])
    }).toThrow()
  })

  it("throws an error when there aren't enough elements for the given size", function() {
    expect(function() {
      return combinator.getCombinations([1], 2)
    }).toThrow()
  })

  it("given an empty list, it returns a list containing only one empty list", function() {
    expect(combinator.getCombinations([], 0)).toEqual([[]])
  })

  it("given a list of items, it returns all combinations of size", function() {
    var list = [1, 2]
    var expectedCombinations = [
      [1, 2]
    ]

    var actualCombinations = combinator.getCombinations(list, 2)

    expect(actualCombinations.length).toEqual(1);

    var onlyCombination = actualCombinations[0]

    expect(onlyCombination).toContain(1)
    expect(onlyCombination).toContain(2)

  })

  it("given a list of items, it returns all combinations of size", function() {
    var list = [1, 2, 3, 4]
    // var actualCombinations = combinator.getCombinations(list, 3)

    var expectedCombinations = [
      [1, 2, 3],
      [1, 2, 4],
      [1, 3, 4],
      [2, 3, 4]
    ]

    var actualCombinations = [
      [1, 2, 4],
      [1, 3, 4],
      [1, 3, 5],
      [2, 3, 4]
    ]

    expect(expectedCombinations.length).toEqual(actualCombinations.length)

    // TODO custom matcher and use recursion to make it more generic

    var actualContainsAllExpected = expectedCombinations.every(function(expectedElem) {
      return actualCombinations.some(function(actualElem) {
        if (actualElem.length != expectedElem.length) {
          return false;
        }
        return expectedElem.every(function(innerExpectedElem){
          return actualElem.indexOf(innerExpectedElem) > -1
        }
        })
      })
    })

    expect(actualContainsAllExpected).toBe(true)
  })
});
