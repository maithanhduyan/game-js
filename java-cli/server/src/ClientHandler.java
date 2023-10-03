
import java.io.*;
import java.net.*;
import java.util.concurrent.*;

public class ClientHandler implements Runnable {
	private Socket clientSocket;
	private Game game;
	private static final long TIMEOUT = 5 * 60 * 1000; // Thời hạn 5 phút

	private static ScheduledExecutorService timeoutExecutor = Executors.newScheduledThreadPool(10);

	public ClientHandler(Socket clientSocket, Game game) {
		this.clientSocket = clientSocket;
		this.game = game;
	}

	@Override
	public void run() {
		try {
			BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
			PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);

			// Gửi yêu cầu đến client
			out.println("Server: Hello, client! Please respond within 5 minutes.");

			// Đặt thời hạn cho việc đợi phản hồi từ client
			ScheduledFuture<?> timeoutTask = timeoutExecutor.schedule(() -> {
				try {
					clientSocket.close();
					System.out.println(
							"Connection with client " + clientSocket.getInetAddress().getHostAddress() + " timed out.");
				} catch (IOException e) {
					e.printStackTrace();
				}
			}, TIMEOUT, TimeUnit.MILLISECONDS);

			// Đọc phản hồi từ client
			String response = in.readLine();
			// Hủy bỏ task timeout nếu client đã phản hồi kịp thời
			timeoutTask.cancel(false);

			System.out.println(
					"Received from client " + clientSocket.getInetAddress().getHostAddress() + ": " + response);

			// Xử lý dữ liệu từ client ở đây
			
			// JSON 
			// Nhận token và xác thực từ client 
			

			// Đóng kết nối
			in.close();
			out.close();
			clientSocket.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}