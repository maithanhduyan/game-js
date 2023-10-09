package main

import (
	"fmt"
	"time"
)

const totalIterations = 1000000000 // Số lần lặp (1 tỷ)

func performHeavyTask() uint64 {
	var result uint64
	for i := uint64(0); i < totalIterations; i++ {
		result += i
	}
	return result
}

func main() {
	startTime := time.Now()
	result := performHeavyTask()
	endTime := time.Now()

	elapsedTime := endTime.Sub(startTime)

	fmt.Printf("Kết quả: %d\n", result)
	fmt.Printf("Thời gian thực thi: %v\n", elapsedTime)
}
