package com.lurningstuff;

import java.util.ArrayList;
import java.util.List;

import static java.lang.System.*;

public class Main {

    public static void main(String[] args) {
	    out.println("Hello world");

        List<Integer> firstList = new ArrayList<Integer>();

        ArrayList<Integer> secondList = new ArrayList<Integer>();

        WinnaList<Integer> thirdList = new WinnaList<>();
        List<Integer> fourthList = new WinnaList<>();
        //(int)x
        thirdList.shriekLikeAPterodactyls();

//        WinnaList<Integer> afterCast = (WinnaList<Integer>)(Object)(new String());
        //WinnaList<Integer> withoutCast = fourthList;
        ((WinnaList<Integer>)fourthList).shriekLikeAPterodactyls();


        char charx = 'x';
        int intx = (int)charx;


        WinnaTree<Integer> tree = new WinnaTree<>(4);
        tree.add(2);
        tree.add(1);
        tree.add(3);
        tree.add(5);
        tree.add(7);

        System.out.println(tree);
        System.out.println(tree.exists(4));
        System.out.println(tree.exists(2));
        System.out.println(tree.exists(1));
        System.out.println(tree.exists(3));
        System.out.println(tree.exists(5));
        System.out.println(tree.exists(7));
        System.out.println(tree.exists(9));



        /*


        O(n)

         */

//        returnToUser(fourthList);
    }
}
