public class performance {
    private static final long TOTAL_ITERATIONS = 1_000_000_000; // Số lần lặp (1 tỷ)

    public static long performHeavyTask() {
        long result = 0;
        for (long i = 0; i < TOTAL_ITERATIONS; i++) {
            result += i;
        }
        return result;
    }

    public static void main(String[] args) {
        long startTime = System.currentTimeMillis();
        long result = performHeavyTask();
        long endTime = System.currentTimeMillis();

        System.out.println("Kết quả: " + result);
        System.out.println("Thoi gian thuc thi: " + (endTime - startTime) + "ms");
    }
}
