//: Playground - noun: a place where people can play

// map for lists of the same generic type

indirect enum List<T> {
  case Empty
  case Cons(x: T, xs: List<T>)
  
  
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
  
  // map 
    // takes the function operation 
      // which takes something of type T and returns something else
    // and returns a List of that other type (T2)
  
  func map<T2>(operation: T -> T2) -> List<T2> {

    switch self {
    case .Empty:
      return .Empty
    case let .Cons(x, xs):
      return List<T2>.Cons(x: operation(x), xs: xs.map(operation))
    }
    /*
    
    var newList = .Empty
    
    for x in xs {
      newList = List<T2>.Cons(x: operation(x), xs: newList)
    }
    
    return newList
    */
    
  }
  
  func getLength() -> Int {
    switch self {
    case .Empty:
      return 0
    case let .Cons(_, xs):
      return 1 + xs.getLength()
    }
  }
  
//  func sum() -> Int {
//    switch self {
//    case let .Cons(x, xs):
//      return x + xs.sum()
//    case .Empty:
//      return 0
//    }
//  }
  
  func append<T>(newItem: T) -> List<T> {
    switch self {
    case .Empty:
      return List<T>.Empty
    case let .Cons(x, xs):
      switch xs {
      case .Empty:
        return List<T>.Cons(x: newItem, xs: .Empty)
      default:
        return List.Cons(x: x, xs: xs.append(<#T##newItem: T##T#>))
      }
    }
  }
}



func generateStringVersion<T>(item: T) -> String {
  return "\(item)"
}

let l1 = List.Cons(x: 1, xs: List.Cons(x: 2, xs: List.Cons(x: 3, xs: .Empty)))

l1.map(generateStringVersion).toString()

l1.getLength()

// write getLength imperatively
// write getLength functionally
// write append imperatively
// write append functionally

//func getLength<T>(items: List<T>) -> Int {
//  var sum = 0
//  
//  for _ in items {
//    sum += 1
//  }
//  
//  return sum
//}






