import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class Main {
	private static final int PORT = 3000;

	private static ExecutorService executorService = Executors.newCachedThreadPool();
	
	private static final Logger LOG = LoggerFactory.getLogger(Main.class);
	
	public static void main(String[] args) {
		ServerSocket serverSocket;
		try {
			serverSocket = new ServerSocket(PORT);
			LOG.info("Server listening on port " + PORT);
			
			while (true) {
				Socket clientSocket = serverSocket.accept();
				System.out.println("Client connected: " + clientSocket.getInetAddress().getHostAddress());

				// Tạo một luồng mới cho kết nối từ client và đặt thời hạn đợi phản hồi
				executorService.submit(new ClientHandler(clientSocket));
			}
		} catch (IOException e) {
			LOG.info("Lỗi:" + e.getMessage());

		}
	}

}