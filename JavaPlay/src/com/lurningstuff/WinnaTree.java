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


}
