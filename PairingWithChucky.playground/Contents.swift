func addTwoNumbers(num1: Int, num2: Int) -> Int {
  let x = num1 + num2
  let y = x + 0
  return y
}

addTwoNumbers(2, num2: 4)

enum Point<T> {
  case Pair(x: T, y: T)
  case Triple(x: T, y: T, z: T)
}

func printPoint<T>(p: Point<T>) {
  switch p {
  case let .Pair(x, y):
    print ("\(x),\(y)")
  case let .Triple(x, y, z):
    print ("\(x),\(y),\(z)")
  }
}

printPoint(Point.Pair(x: 6, y: 7))
printPoint(Point.Triple(x: 6, y: 7, z:9))

typealias Variable = String

indirect enum LExp {
  case LExpVariable(name: Variable)
  case LExpBinding(bindingVariable: Variable, body: LExp)
  case LExpApplication(left: LExp, right: LExp)
}

/*
le -> Variable
le -> \ Variable . le
le -> le le
*/

//List -> []
//List -> cons(x, List)
//2 :: (5 :: (7 :: []))

indirect enum List: SequenceType {
  case Empty
  case Cons(x: Int, xs: List)
  

  
  
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
  
  func sum() -> Int {
    switch self {
    case let .Cons(x, xs):
        return x + xs.sum()
    case .Empty:
      return 0
    }
  }
  
  func doubleEachX() -> List {
    switch self {
    case let .Cons(x, xs):
      return List.Cons(x: (x * 2), xs: xs.doubleEachX())
    case .Empty:
      return List.Empty
    }
  }
}

let l1 = List.Cons(
  x: 1, xs: List.Cons(
    x: 4, xs: List.Cons(
      x: 9, xs: List.Empty
    )
  )
)

let stringList = l1.toString() // [1, 2, 3]
let sumOfList = l1.sum() // 14
let doubledList = l1.doubleEachX()


// Cons(1, List.Cons(4, List.Cons(9, List.Empty)))

// sum( Cons(1, List.Cons(4, List.Cons(9, List.Empty))) ) first time
//
// -> 1 + sum( List.Cons(4, List.Cons(9, List.Empty)) )
// -> 1 + 4 + sum ( List.Cons(9, List.Empty) )
// -> 1 + 4 + 9 + sum( List.Empty )
// -> 1 + 4 + 9 + 0
// -> 15!

// for (i = 0; i < list.length; i++) {}
//
// f() -> 1 + g()
// g() -> 4 + h()
// h() -> 9 + i()
// i() -> throw
//
//
// h()
// g()
// f()
// stack







func fooBar() -> (Int, Int) {
  let x = 5
  let (y, z) = fooBar()
  let (.Cons(w, xs)) = .Cons(5, .Empty)
  return (x, x)
}
















