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

    public void addTree(WinnaTree<T> newTree) {
        int comparison = newTree._value.compareTo(this._value);

        if (comparison == 0) {
            return;
        }

        if (comparison < 0) {
            if (this._leftChild == null) {
                this._leftChild = newTree;
                return;
            }
            this._leftChild.addTree(newTree);
            return;
        }

        if (comparison > 0) {
            if (this._rightChild == null) {
                this._rightChild = newTree;
                return;
            }

            this._rightChild.addTree(newTree);
            return;
        }
    }


}
