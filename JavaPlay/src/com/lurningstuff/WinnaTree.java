package com.lurningstuff;

/**
 * Created by winna on 06/04/2016.
 */

public class WinnaTree<T extends Comparable<T>> {

    private T _value;
    private WinnaTree<T> _leftChild;
    private WinnaTree<T> _rightChild;

    public WinnaTree(T value) {
        _value = value;
    }

    public T getValue() {
        return _value;
    }

    public void add(T value) {
        WinnaTree<T> newTree = new WinnaTree<>(value);
        addTree(newTree);

    }

    private void addTree(WinnaTree<T> newTree) {
        int comparison = newTree._value.compareTo(_value);

        if (comparison == 0) {
            return;
        }

        if (comparison < 0) {
            if (_leftChild == null) {
                _leftChild = newTree;
                return;
            }
            _leftChild.addTree(newTree);
            return;
        }

        if (comparison > 0) {
            if (_rightChild == null) {
                _rightChild = newTree;
                return;
            }

            _rightChild.addTree(newTree);
            return;
        }
    }

    /*
    4.exists(1)
    2.exists(1)
    1.exists(1) true
    */


    public boolean exists(T value) {
        int comparison = value.compareTo(_value);

        if (comparison == 0) {
            return true;
        } else if (comparison < 0) {
            if (_leftChild != null) {
                return _leftChild.exists(value);
            }
        } else if (comparison > 0) {
            if (_rightChild != null) {
                return _rightChild.exists(value);
            }
        }

        return false;
    }

    @Override
    public String toString() {
        return treeToString("");
    }

    private String treeToString(String spacer) {
        String retval = spacer + _value.toString() + "\n";

        if (_leftChild == null && _rightChild == null) {
            return retval;
        }

        // TODO: sucks

        spacer += "*";

        if (_leftChild != null && _rightChild != null) {

            retval += _leftChild.treeToString(spacer);
            retval += _rightChild.treeToString(spacer);

        } else if (_leftChild != null && _rightChild == null) {


            retval += _leftChild.treeToString(spacer);
            retval += spacer + "-\n";

        } else if (_leftChild == null && _rightChild != null) {

            retval += spacer + "-\n";
            retval += _rightChild.treeToString(spacer);
        }

        return retval;
    }

    /*
        API
        - list of Points
        - x, y integer pairs
        - indefinite number of pairs
        - with length (integer)

        Output
        find all the squares that have side length 6
        square defined by its four corners

        (
         (0, 0),
         (0, 5),
         (5, 0),
         (5, 5),
        )

        list findSquares(listOfPoints, length)
          squares = [];

          l = length

          valid square
          - has 4 points
          - distance between points is equal on all sides
          - distance is equal to l

          combinations = getCombinations(listOfPoints, 4)
          for each combo in combinations
            if isValidSquare(combo, length)
              squares.push(combo)

          return squares


        list of squares getCombinations(list<T>, size)
          combinations = [];

          if size < 0
            throw("can't get combinations for a negative size")

          if size == 0
            return [[]]

          for each element in list
            smallerCombinations = getCombinations(list - element, size - 1)
              for each list in smallerCombinations
                list.push(element)
            combinations = combinations.concat(smallerCombination)

          return combinations

        boolean isValidSquare(listOfFourPoints, length)
          lexicographic sort like the dictionary
          sort by x, y

          return false if
              same x coordinate on left
                   absolute value of x1 - x2 != 0
              same x coordinate on right
                   absolute value of x3 - x4 != 0

          return false if
              same y coordinate on top
                   absolute value of y1 - y2 != length
              same y coordinate on bottom
                   absolute value of y3 - y4 != length

          return true

       */


}
