package main

import "time"
import "fmt"
import "runtime"

func go_sucks() {
	_ = fmt.Printf
	_ = runtime.GOMAXPROCS
}

func spawnProducer(i int, c chan<- int) {
	//fmt.Printf("Spawning producer...\n")
    go func() {
    	for {
	        time.Sleep(1000 * time.Millisecond)
	        //fmt.Printf("Sending: %d\n", i)
	        c <- i
	        //fmt.Printf("Sent: %d\n", i)
	    }
    }()
    //fmt.Printf("Finished!\n")
}

func main() {
	//routines := []<-chan int{}
	c := make(chan int)

	// input := []int{}
	// for i := 0; i < 1000000; i++ {
	// 	input[i] = i
	// }

    for i := 0; i < 5; i++ {
        spawnProducer(i, c)
        //routines = append(routines, c)
        //receivedValue := <-c
        //fmt.Printf("%d Received: %d\n", i, receivedValue)
    }

    // for i, c := range routines {
    countHandled := 0
    for {
    	receivedValue := <-c
    	_ = receivedValue
        //fmt.Printf("Received: %d\n", receivedValue)	
        //fmt.Printf("Received")	
        countHandled++
        if (countHandled % 10 == 0) {
        	fmt.Printf("Handled %d\n", countHandled)
        	return
        }
    }
    //wg.Wait()
}