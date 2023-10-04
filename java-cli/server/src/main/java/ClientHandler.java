
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.Socket;
import java.util.Scanner;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ClientHandler implements Runnable {

	private static final Logger LOG = LoggerFactory.getLogger(ClientHandler.class);

	private Socket clientSocket;

	private static final long TIMEOUT = 1 * 60 * 1000; // Thời hạn 5 phút

	private static final ExecutorService sendExecutor = Executors.newSingleThreadExecutor();
	private static final ExecutorService receiveExecutor = Executors.newSingleThreadExecutor();
	Scanner scn = new Scanner(System.in);
	private String name;
	final DataInputStream dataInputStream;
	final DataOutputStream dataOutputStream;
	Socket socket;
	boolean isloggedin;

	private Player player;

	JSONParser parser = new JSONParser();

	public ClientHandler(Socket socket, String name, DataInputStream dataInputStream,
			DataOutputStream dataOutputStream) {
		this.socket = socket;
		this.dataInputStream = dataInputStream;
		this.dataOutputStream = dataOutputStream;
		this.isloggedin = true;
		this.name = name;
		this.player = new Player(name);
	}

	@Override
	public void run() {
		String received = null;
		while (this.isloggedin) {
			try {
				// Server nhận dữ liệu từ client và xử lý
				received = dataInputStream.readUTF();
				LOG.info("Ray id:[" + this.name + "]" + "Server received: " + received);
				try {
					JSONObject recv = (JSONObject) parser.parse(received);
					if (recv.containsKey("name")) {
						LOG.info("Nhận name");
						dataOutputStream.writeUTF(recv.get("name") + "Sucessful");
					}
					if (recv.containsKey("age")) {
						LOG.info("Nhận age");
						dataOutputStream.writeUTF(recv.get("age").toString());
					}
				} catch (ParseException e) {
					LOG.info("Lỗi: " + e.getMessage());
				}

			} catch (IOException e) {
				LOG.error("Lỗi: " + e.getMessage());
				Main.activeClientList.remove(this.name);
				break;
			}
		}

		// closing resources
		try {
			this.dataInputStream.close();
			this.dataOutputStream.close();
		} catch (IOException e) {
			LOG.error("Lỗi: " + e.getMessage());
		}

	}

}