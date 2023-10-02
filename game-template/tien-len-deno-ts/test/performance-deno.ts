// Hiệu suất kiểm tra với vòng lặp đơn giản

const totalIterations = 1000000000; // Số lần lặp (1 tỷ)

function performHeavyTask() {
    let result = 0;
    for (let i = 0; i < totalIterations; i++) {
        result += i;
    }
    return result;
}

const startTime = Date.now();
const result = performHeavyTask();
const endTime = Date.now();

const elapsedTime = endTime - startTime;
console.log(`Kết quả: ${result}`);
console.log(`Thời gian thực thi: ${elapsedTime}ms`);