var exports = module.exports = {};

exports.getCombinations = function(list, size, levelIndex) {
  // console.log('')
  // console.log('*************************************')
  // console.log('')
  // console.log('levelIndex', levelIndex)
  // console.log('here', 'list.length', list.length, 'size', size)

  if (!levelIndex) {
    levelIndex = 0
  }

  var that = this

  if (size == undefined) {
    throw Error("Please specify a size.")
  }

  if (list.length < size) {
    return []
  }

  if (list.length == 0) {
    return [[]]
  }

  if (size == 0) {
    return [[]]
  }

  var combinations = []

  for (var i = 0; i < list.length; i++) {
    var head = list[i]
    var tail = list.slice(i + 1)

    // console.log('levelIndex', levelIndex, 'head', head)

    var smallerCombinations = that.getCombinations(tail, size - 1, levelIndex + 1);

    // console.log('levelIndex', levelIndex, 'smallerCombinations', smallerCombinations)

    for (var j = 0; j < smallerCombinations.length; j++) {
      var combination = smallerCombinations[j];
      // console.log('=============================')
      // console.log('in smallerCombinations')
      combination.push(head)
      // console.log('levelIndex', levelIndex, "pushed ", head, " : ", combination)
      // console.log('=============================')
    }

    // console.log('levelIndex', levelIndex, "adding ", smallerCombinations, " to ", combinations)
    combinations = combinations.concat(smallerCombinations)
  }

  // console.log('levelIndex', levelIndex, 'final combinations', combinations)
  // console.log('*************************************')
  return combinations


  var combinations = list.map(function(elem, i) {
    var head = list[i]
    var tail = list.slice(i + 1)

    var smallerCombinations = that.getCombinations(tail, size - 1);

    return smallerCombinations.map(function(combination) {

      combination.push(head)
      // console.log('head', head)
      // console.log('combination', combination)
    })

  })

  // console.log('-------------->')
  // console.log('combinations', combinations)

  return combinations




}
