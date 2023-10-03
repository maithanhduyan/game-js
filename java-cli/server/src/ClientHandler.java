
import java.io.*;
import java.net.*;
import java.util.concurrent.*;

public class ClientHandler implements Runnable {
	private Socket clientSocket;
	private Game game;
	private static final long TIMEOUT = 1 * 60 * 1000; // Thời hạn 5 phút

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
			out.println("TOKEN:1234567");

			// Đặt thời hạn cho việc đợi phản hồi từ client
			ScheduledFuture<?> timeoutTask = timeoutExecutor.schedule(() -> {
				try {
					clientSocket.close();
					AsynLogger.logInfo(
							"Connection with client " + clientSocket.getInetAddress().getHostAddress() + " timed out.");
				} catch (IOException e) {
					e.printStackTrace();
				}
			}, TIMEOUT, TimeUnit.MILLISECONDS);

			// Đọc phản hồi từ client
			String response = in.readLine();
			// Hủy bỏ task timeout nếu client đã phản hồi kịp thời
			timeoutTask.cancel(false);

			AsynLogger.logInfo(
					"Received from client " + clientSocket.getInetAddress().getHostAddress() + ": " + response);

			// Xử lý dữ liệu từ client ở đây
			out.println("Cards:1343" + Deck.CARDS_ORDER);
			// JSON 
			// Nhận token và xác thực từ client 
			// Đọc phản hồi từ client
			response = in.readLine();
			AsynLogger.logInfo(""+response);

			// Đóng kết nối
			in.close();
			out.close();
			clientSocket.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}