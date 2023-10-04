
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ClientHandler implements Runnable {
	
	private static final Logger LOG = LoggerFactory.getLogger(ClientHandler.class);

	private Socket clientSocket;

	private static final long TIMEOUT = 1 * 60 * 1000; // Thời hạn 5 phút

	private static final ExecutorService sendExecutor = Executors.newSingleThreadExecutor();
	private static final ExecutorService receiveExecutor = Executors.newSingleThreadExecutor();

	public ClientHandler(Socket clientSocket) {
		this.clientSocket = clientSocket;
	}

	@Override
	public void run() {
		try {
			BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
			PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);

			// Gửi yêu cầu đến client trong một luồng riêng
			LOG.info("Gửi yêu cầu đến client trong một luồng riêng");
			sendExecutor.submit(() -> {
				out.println("TOKEN:1234567");
			});

			// Nhận phản hồi từ client trong một luồng riêng
			LOG.info("Nhận phản hồi từ client trong một luồng riêng");
			receiveExecutor.submit(() -> {
				try {
					String response = in.readLine();
					LOG.error("Received from client: " + response);
				} catch (IOException e) {
					LOG.error("Lỗi khi nhận dữ liệu từ client: " + e.getMessage());
				}
			});

			// Đợi cả hai luồng hoàn thành
			sendExecutor.shutdown();
			receiveExecutor.shutdown();
			while (!(sendExecutor.isTerminated() && receiveExecutor.isTerminated())) {
				try {
					Thread.sleep(100);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					System.err.println("Lỗi: " + e.getMessage());
				} // Chờ 0.1 giây
			}

			// Đóng kết nối
			System.out.println("Đóng kết nối");
			in.close();
			out.close();
			clientSocket.close();
		} catch (IOException e) {
			System.err.println("Lỗi:" + e.getMessage());
		}
	}
}