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



        /*


        O(n)

         */

//        returnToUser(fourthList);
    }
}
