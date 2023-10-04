import java.io.*;
import java.net.*;
import java.util.Scanner;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Client {
	
	private static final Logger LOG = LoggerFactory.getLogger(Client.class);
	
	public static void main(String[] args) {
		String serverAddress = "10.220.56.18"; // Địa chỉ IP hoặc tên máy chủ của server
		int port = 3000; // Số cổng của server
		User player1 = new User("playertest1", "123456");
		String token = null;
		try {
			Socket socket = new Socket(serverAddress, port);
			LOG.info("Connected to server: " + socket.getInetAddress().getHostAddress());

			BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
			PrintWriter out = new PrintWriter(socket.getOutputStream(), true);

			// Gửi tin nhắn tới server
			out.println("LOGIN:" + player1.toString());

			// Đọc phản hồi từ server
			String response = in.readLine();
			LOG.info("Server response: " + response);
			boolean serverAccepted = false;
			
			// Đóng kết nối
			System.out.println("Đóng kết nối");
			in.close();
			out.close();
			socket.close();
		} catch (IOException e) {
			LOG.error("Lỗi:" + e.getMessage());
		}
	}
}
