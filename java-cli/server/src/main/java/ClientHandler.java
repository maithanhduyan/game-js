
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.Socket;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.UUID;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ClientHandler implements Runnable {

	private static final Logger LOG = LoggerFactory.getLogger(ClientHandler.class);

	private static final long TIMEOUT = 1 * 60 * 1000; // Thời hạn 5 phút

	Scanner scn = new Scanner(System.in);
	private String name;
	final DataInputStream dataInputStream;
	final DataOutputStream dataOutputStream;
	private Socket socket;
	boolean isloggedin;

	private Player player;

	private static final JSONParser JSON_PARSER = new JSONParser();

	private static final JSONObject RESPONSE = new JSONObject();

	private static final JSONObject ERROR = new JSONObject();

	private static final Map<String, String> ERR = new HashMap<String, String>();

	private Map<String, String> response;

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
		ERR.put("error", "");
		JSONObject clientRequest;
		response = new HashMap<String, String>();
		while (this.isloggedin) {
			try {
				// Server nhận dữ liệu từ client và xử lý
				received = dataInputStream.readUTF();

				LOG.info("Ray id:[" + this.name + "]" + "Server received: " + received);

				try {
					clientRequest = (JSONObject) JSON_PARSER.parse(received);

					if (clientRequest.containsKey("a")) {
						// Xử Lý Login
						if (clientRequest.get("a").equals("Login") && clientRequest.containsKey("Username")
								&& clientRequest.containsKey("Password")) {
							processLogin(clientRequest, dataOutputStream);
						}

						// User đã đăng nhập
						if (clientRequest.containsKey("Token")) {
							// Tạo phòng
							if (clientRequest.get("a").equals("CreateRoom")
									&& clientRequest.get("Token").equals(this.name)) {
								processCreateRoom(clientRequest, dataOutputStream);
							}

							// Vào phòng
							if (clientRequest.get("a").equals("JoinRoom") && clientRequest.containsKey("Token")) {
								LOG.info("JoinRoom");

								processJoinRoom(clientRequest, dataOutputStream);

							}

							// Vòng lập Chơi Game
							if (clientRequest.get("a").equals("PlayGame") && clientRequest.containsKey("Token")
									&& clientRequest.containsKey("RoomId")) {
								LOG.info("PLAY GAME");

								processPlayGame(clientRequest, dataOutputStream);

							}

						} // User đã đăng nhập

					} else {
						ERR.getOrDefault("error", "Chưa Đăng Nhập");
						dataOutputStream.writeUTF(JSONObject.toJSONString(ERR));
					}

				} catch (ParseException e) {
					LOG.info("Lỗi: " + e.getMessage());
				}

			} catch (IOException e) {
				LOG.error("Lỗi: " + e.getMessage());
				Server.activeClientList.remove(this.name);
				break;
			}
		}

		// closing resources
		try {
			this.dataInputStream.close();
			this.dataOutputStream.close();
			socket.close();
		} catch (IOException e) {
			LOG.error("Lỗi: " + e.getMessage());
		}

	}

	void processLogin(JSONObject request, DataOutputStream dataOutputStream) throws IOException {
		// Login
		// Check username and password in database
		if (true) {
			this.response.put("Token", this.getName());
		}
		dataOutputStream.writeUTF(JSONObject.toJSONString(this.response));
	}

	void processCreateRoom(JSONObject request, DataOutputStream dataOutputStream) throws IOException {
		// Tạo phòng
		if (request.get("a").equals("CreateRoom") && request.get("Token").equals(this.name)) {
			LOG.info("CreateRoom");
			
			if (!Server.activeRoomList.containsKey(this.name)) {
				Room room = new Room(this.name);
				Server.activeRoomList.put(this.name, room);
				LOG.info("Tạo phòng: " + this.name + " thành công");
				this.response.put("RoomId", this.name);
				
				// Tạo game mới
				room.createGame();
				room.addPlayer(this.name);
				this.response.put("GameStatus", room.getGame().getStatus().name());
				// send json to client
				dataOutputStream.writeUTF(JSONObject.toJSONString(this.response));
			}
		}
	}

	void processJoinRoom(JSONObject request, DataOutputStream dataOutputStream) throws IOException {
		if (request.containsKey("RoomId") && request.containsKey("RoomPassword")) {
			// Kiểm tra roomId có tồn tại?
			String roomId = request.get("RoomId").toString();

			if (Server.activeRoomList.containsKey(roomId)) {
				// Có phòng
				// Cho vào
				this.response.put("RoomId", roomId);
				Room room = Server.activeRoomList.get(roomId);
				room.addPlayer(this.name);
				this.response.put("GameStatus", room.getGame().getStatus().name());
				// send json to client
				dataOutputStream.writeUTF(JSONObject.toJSONString(this.response));
			} else {
				ERR.getOrDefault("error", "Không tồn tại.");
				dataOutputStream.writeUTF(JSONObject.toJSONString(ERR));
			}

		} // JoinRoom
	}

	void processPlayGame(JSONObject request, DataOutputStream dataOutputStream) throws IOException {

		String roomId = request.get("RoomId").toString();

		if (Server.activeRoomList.containsKey(roomId)) {
			Room room = Server.activeRoomList.get(roomId);

			// Kiểm tra trạng thái game
			this.response.replace("GameStatus", room.getStatus().toString());
			LOG.info("Check game status: " + room.getStatus().toString());
			// Kiểm tra đến lượt
			room.game.playGame();
			// Kiểm tra nước đi trước

			// send json to client
			dataOutputStream.writeUTF(JSONObject.toJSONString(this.response));
		}
	}

	public String getName() {
		return name;
	}

}