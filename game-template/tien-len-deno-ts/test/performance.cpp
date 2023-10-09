#include <iostream>
#include <chrono>

const long long totalIterations = 1000000000; // Số lần lặp (1 tỷ)

long long performHeavyTask() {
    long long result = 0;
    for (long long i = 0; i < totalIterations; i++) {
        result += i;
    }
    return result;
}

int main() {
    auto startTime = std::chrono::high_resolution_clock::now();
    long long result = performHeavyTask();
    auto endTime = std::chrono::high_resolution_clock::now();

    auto elapsedTime = std::chrono::duration_cast<std::chrono::milliseconds>(endTime - startTime).count();

    std::cout << "Kết quả: " << result << std::endl;
    std::cout << "Thời gian thực thi: " << elapsedTime << "ms" << std::endl;

    return 0;
}
