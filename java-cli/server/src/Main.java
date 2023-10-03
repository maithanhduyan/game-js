import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {
	private static final int PORT = 3000;

	private static ExecutorService executorService = Executors.newCachedThreadPool();

	public static void main(String[] args) {
		try {
			ServerSocket serverSocket = new ServerSocket(PORT);
			AsynLogger.logInfo("Server listening on port " + PORT);
			Game game = new Game();
			while (true) {
				Socket clientSocket = serverSocket.accept();
				System.out.println("Client connected: " + clientSocket.getInetAddress().getHostAddress());

				// Tạo một luồng mới cho kết nối từ client và đặt thời hạn đợi phản hồi
				executorService.submit(new ClientHandler(clientSocket , game));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}