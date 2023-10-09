use std::time::Instant;

const TOTAL_ITERATIONS: u64 = 1_000_000_000; // Số lần lặp (1 tỷ)

fn perform_heavy_task() -> u64 {
    let mut result: u64 = 0;
    for i in 0..TOTAL_ITERATIONS {
        result += i;
    }
    result
}

fn main() {
    let start_time = Instant::now();
    let result = perform_heavy_task();
    let elapsed_time = start_time.elapsed();

    println!("Kết quả: {}", result);
    println!("Thời gian thực thi: {:?}", elapsed_time);
}
