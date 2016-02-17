//: Playground - noun: a place where people can play

indirect enum List<T>: SequenceType {
  case Empty
  case Cons(x: T, xs: List<T>)
  
  func generate() -> AnyGenerator<T> {
    var currentList = self
    
    // generic lambda
    let gen = { () -> T? in
      switch currentList {
      case .Empty:
        return nil
      case let .Cons(x, xs):
        currentList = xs
        return x
      }
    }
    return anyGenerator(gen)
  }
  
  // MARK: - Presentational Helpers
  
  func toString() -> String {
    return "[\(toStringGuts())]"
  }
  
  func toStringGuts() -> String {
    switch self {
    case .Empty:
      return ""
    case let .Cons(x, xs):
      if case .Empty = xs {
        return "\(x)"
      }
      return "\(x), \(xs.toStringGuts())"
      
    }
  }
  
  func printItemsInList() {
    for item in self {
      print(item)
    }
  }
  
  // MARK: - Enumerators
  
  func append(newItem: T) -> List<T> {
    switch self {
    case .Empty:
      return List<T>.Cons(x: newItem, xs: List<T>.Empty)
    case let .Cons(x, xs):
      return List<T>.Cons(x: x, xs: xs.append(newItem))
    }
  }
  
  func map<T2>(operation: T -> T2) -> List<T2> {
    switch self {
    case .Empty:
      return .Empty
    case let .Cons(x, xs):
      return List<T2>.Cons(x: operation(x), xs: xs.map(operation))
    }
  }
  
//  (1, [Int]) -> (1, [Int])
//  (1, 2, [Int]) -> (2, 1, [Int])
  // 2, 3, 4, [] => 4, 3, 2, []
  
  
  
  // 2, 7, 9, 11, 23
  // 7, 9, 11, 23 append 2 => 7, 9, 11, 23, 2
  // 9, 11, 23 append 7 => 9, 11, 23,       7
  // 11, 23 append 9 => 11, 23,             9
  // 23, [] append 11 => 23,                11
  // [] append 23 =>                        23


  // 1, 2 => 2, 1
  // 1, 2, 3 => 2, 3, 1
  
  func reverse() -> List<T> {
    switch self {
    case .Empty:
      return .Empty
    case let .Cons(x, xs):
      return xs.reverse().append(x)
    }
  }
  
  func some(condition: T -> Bool) -> Bool {
    switch self {
    case .Empty:
      return false
    case let .Cons(x, xs):
      return condition(x) || xs.some(condition)
    }
  }
  
  func every(condition: T -> Bool) -> Bool {
    switch self {
    case .Empty:
      return true
    case let .Cons(x, xs):
      return condition(x) && xs.some(condition)
    }
  }
  
  func filter(condition: T -> Bool) -> List<T> {
    switch self {
    case .Empty:
      return .Empty
    case let .Cons(x, xs):
      let tail = xs.filter(condition)
      if condition(x) {
        return List.Cons(x: x, xs: tail)
      } else {
        return tail
      }
    }
  }
  
  
  // reduce(T -> T) -> T
  // Int, List<T>
  func reduceRec<T2>(fun: (T2, T, Int, List<T>) -> T2, currentValue: T2) -> T2 {
    return reduceRecHelper(fun, currentValue: currentValue, currentIndex: 0, list: self)
  }
  
  private func reduceRecHelper<T2>(fun: (T2, T, Int, List<T>) -> T2, currentValue: T2, currentIndex: Int, list: List<T>) -> T2 {
    switch self {
    case .Empty:
      return currentValue
    case let .Cons(x, xs):
      let newValue = fun(currentValue, x, currentIndex, list)
      return xs.reduceRecHelper(fun, currentValue: newValue, currentIndex: currentIndex + 1, list: list)
    }
  }
  
  // func reduceRecHelper
  
  // fold (takes starter elem) fold(T', T -> T') -> T'
  // flatmap / compact
  // concatenating two lists,
  // zipping them (zip([a,b,c], [1,2,3]) === [a,1,b,2,c,3]
  
  
  // List<Int?>
  
  // MARK: - Helpers
  
  func getLength() -> Int {
    switch self {
    case .Empty:
      return 0
    case let .Cons(_, xs):
      return 1 + xs.getLength()
    }
  }
  
  func getLengthIteratively() -> Int {
    var total = 0
    for _ in self {
      total += 1
    }
    return total
  }
  
}

func isEven(item: Int) -> Bool {
  return item % 2 == 0
}

//l1.some(isEven)

func generateStringVersion<T>(item: T) -> String {
  return "\(item)"
}

let l1 = List.Cons(x: 1, xs: List.Cons(x: 2, xs: List.Cons(x: 3, xs: .Empty)))

l1.map(generateStringVersion).toString()

l1.getLength()

l1.getLengthIteratively()


let l2 = List<Int>.Cons(
  x: 1, xs: List<Int>.Cons(
    x: 2, xs: List<Int>.Cons(
      x: 3, xs: List<Int>.Empty
    )
  )
  ).append(5)

print("in order: \(l2.toString())")

let l3 = l2.reverse()

print("in reverse order: \(l3.toString())")

print("filter only evens: \(l3.filter(isEven).toString())")

/*
  previousValue
  currentValue
  currentIndex
  array
*/

func sum(accumulator: Int, currentValue: Int, currentIndex: Int, collection: List<Int>) -> Int {
  return accumulator + currentValue
}

let reduced = l2.reduceRec(sum, currentValue: 0)


