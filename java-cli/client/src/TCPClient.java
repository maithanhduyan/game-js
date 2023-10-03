import java.io.*;
import java.net.*;
import java.util.Scanner;

public class TCPClient {
	public static void main(String[] args) {
		String serverAddress = "10.220.56.18"; // Địa chỉ IP hoặc tên máy chủ của server
		int port = 3000; // Số cổng của server
		User player1 = new User("playertest1", "123456");
		String token = null;
		try {
			Socket socket = new Socket(serverAddress, port);
			AsynLogger.logInfo("Connected to server: " + socket.getInetAddress().getHostAddress());

			BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
			PrintWriter out = new PrintWriter(socket.getOutputStream(), true);

			// Gửi tin nhắn tới server
			out.println("LOGIN:" + player1.toString());

			// Đọc phản hồi từ server
			String response = in.readLine();
			AsynLogger.logInfo("Server response: " + response);
			boolean serverAccepted = false;
			if (response.startsWith("TOKEN:")) {
				token = response.substring(7);
				serverAccepted = true;
				while (serverAccepted) {
					// gửi yêu cầu tiếp theo
					//out.println("TOKEN:" + token);
					Scanner scanner = new Scanner(System.in);
					System.out.print("Nhập: ");
					String option = scanner.nextLine();
					
					// nhận thông tin
					AsynLogger.logInfo(in.readLine());
					
					
					try {
						Thread.sleep(200);
					} catch (InterruptedException e) {
						AsynLogger.logInfo("InterruptedException: " + e.getMessage());
					}
				}
			}
			// Đóng kết nối
			in.close();
			out.close();
			socket.close();
		} catch (IOException e) {
			AsynLogger.logInfo("Lỗi:" + e.getMessage());
		}
	}
}
