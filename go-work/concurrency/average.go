package main

import "time"
import "fmt"
import "runtime"
import "math"

func go_sucks() {
	_ = fmt.Printf
    _ = runtime.GOMAXPROCS
	_ = time.Millisecond
}

const ARRAY_SIZE = 1000000

func spawnProducer(c chan<- float64, input map[int]int, batchNum int, batchStartIndex int, batchSize int) {
	//fmt.Printf("Spawning producer...\n")
    go func() {
    	sum := float64(0)

        for i := 0; i < batchSize; i++ {
            sum += math.Sqrt(float64(input[batchStartIndex + i]))
        }
        
        c <- sum
        
        // for {
            //time.Sleep(1000 * time.Millisecond)
            //fmt.Printf("Sending: %d\n", i)
	        //fmt.Printf("Sent: %d\n", i)
	    // }
    }()
    //fmt.Printf("Finished!\n")
}

func main() {
	//routines := []<-chan int{}
    runtime.GOMAXPROCS(4)
	c := make(chan float64)
    _ = c

	// input := make(hash-table[int]int, 0)//[ARRAY_SIZE]int{}
        //arrinput := [ARRAY_SIZE]int{}
 //    arrinput := [ARRAY_SIZE]int{}
	// for i := 0; i < ARRAY_SIZE; i++ {
	// 	arrinput[i] = i
	// }
     // sliceinput := []int{}
     // _ = sliceinput

    // sliceinput := make([]int, ARRAY_SIZE)
    // for i := 0; i < ARRAY_SIZE; i++ {
    //     sliceinput = append(sliceinput, i)
    // }

    mapinput := make(map[int]int, 0)
    for i := 0; i < ARRAY_SIZE; i++ {
        mapinput[i] = i
    }

    // mysum := 0
    // for i := 0 ; i < ARRAY_SIZE; i++ {
    //     mysum += mapinput[i]
    // }
    // fmt.Printf("Naieeveve avg: %f\n", float64(mysum) / float64(ARRAY_SIZE))
    // return

    numBatches := 1
    batchSize := ARRAY_SIZE / numBatches
    // assumes divides evenly
    
    batchStartIndex := 0
    for batchNum := 0; batchNum < numBatches; batchNum++ {
        spawnProducer(c, mapinput, batchNum, batchStartIndex, batchSize)
        batchStartIndex = batchStartIndex + batchSize
        //routines = append(routines, c)
        //receivedValue := <-c
        //fmt.Printf("%d Received: %d\n", i, receivedValue)
    }

    sum := float64(0)
    for i := 0; i < numBatches; i++ {
    	receivedValue := <-c
        //fmt.Printf("Received: %d\n", receivedValue)	
        sum += receivedValue
        //fmt.Printf("Received")	   
    }
    average := float64(sum) / float64(ARRAY_SIZE)
    fmt.Printf("Sum is %f\n", average)

}