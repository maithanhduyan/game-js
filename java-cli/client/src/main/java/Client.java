import java.io.*;
import java.net.*;
import java.util.Scanner;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Client {

	private static final Logger LOG = LoggerFactory.getLogger(Client.class);
	static final int PORT = 3000; // Số cổng của server
	static boolean isConnecting = false;

	public static void main(String[] args) {

		// Địa chỉ IP hoặc tên máy chủ của server
		String serverAddress = "10.220.56.18";

		User player1 = new User("playertest1", "123456");

		Scanner scn = new Scanner(System.in);

		// getting localhost ip
		InetAddress ip = null;

		// establish the connection
		Socket s;

		try {
			ip = InetAddress.getByName(serverAddress);
			s = new Socket(ip, PORT);
			// obtaining input and out streams
			DataInputStream dis = new DataInputStream(s.getInputStream());
			DataOutputStream dos = new DataOutputStream(s.getOutputStream());
			isConnecting = true;
			// sendMessage thread
			Thread sendMessage = new Thread(new Runnable() {

				@Override
				public void run() {
					LOG.info("Tạo luồng gửi data.");
					while (isConnecting) {

						// read the message to deliver.
						String msg = scn.nextLine();

						try {
							// write on the output stream
							dos.writeUTF(msg);
						} catch (IOException e) {
							LOG.error("Lỗi Gửi Data: " + e.getMessage());
							isConnecting = false;
							break;
						}
					}
					//
				}
			});

			// readMessage thread
			Thread readMessage = new Thread(new Runnable() {
				@Override
				public void run() {
					LOG.info("Tạo luồng nhận data.");
					while (isConnecting) {
						try {
							// read the message sent to this client
							String msg = dis.readUTF();
							System.out.println("Server:" + msg);
						} catch (Exception e) {
							LOG.error("Lỗi Nhận Data:" + e.getMessage());
							isConnecting = false;
							break;
						}
					}
				}
			});

			sendMessage.start();
			readMessage.start();

		} catch (IOException e) {
			LOG.error("Lỗi: " + e.getMessage());
		}

	}
}
