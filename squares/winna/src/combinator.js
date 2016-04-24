var exports = module.exports = {};

exports.getCombinations = function(list, size) {
  if (size == undefined) {
    throw Error("Please specify a size.")
  }

  if (list.length < size) {
    throw Error("Not enough elements.")
  }

  var combinations = []


  // [a], 3
  // [[a, a, a]]

  if (list.length == 0) {
    return [[]]
  }

  combinations = [list]

  return combinations

}
