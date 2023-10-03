import java.io.*;
import java.net.*;

public class TCPClient {
	public static void main(String[] args) {
		String serverAddress = "localhost"; // Địa chỉ IP hoặc tên máy chủ của server
		int port = 3000; // Số cổng của server
		User player1 = new User("playertest1", "123456");
		try {
			Socket socket = new Socket(serverAddress, port);
			System.out.println("Connected to server: " + socket.getInetAddress().getHostAddress());

			BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
			PrintWriter out = new PrintWriter(socket.getOutputStream(), true);

			// Gửi tin nhắn tới server
			out.println(player1.toString()+"\tab"+"Deal");

			// Đọc phản hồi từ server
			String response = in.readLine();
			System.out.println("Server response: " + response);

			// Đóng kết nối
			in.close();
			out.close();
			socket.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
