import java.awt.BorderLayout;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.InetAddress;
import java.net.Socket;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JTextField;
import javax.swing.SwingUtilities;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Client {

	private JFrame frame;
	private JTextField usernameField;
	private JPasswordField passwordField;

	private static final Logger LOG = LoggerFactory.getLogger(Client.class);

	static final int PORT = 3000;

	static boolean isConnecting = false;

	private static final JSONParser JSON_PARSER = new JSONParser();

	private static final JSONObject REQUEST = new JSONObject();

	private static JSONObject RESPONSE = new JSONObject();

	private static Map<String, String> sendData;

	private static Map<String, String> receiveData;

	// Địa chỉ IP hoặc tên máy chủ của server
	private static String serverAddress = "10.220.56.16";

	private ClientUI clientUI;

	public Client() {
		clientUI = new ClientUI(this);
	}

	void initiallize() {

		User player1 = new User();

		Scanner userInput = new Scanner(System.in);

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
			// Send Message Thread
			Thread sendMessage = new Thread(new Runnable() {

				@Override
				public void run() {
					LOG.info("Tạo luồng gửi data.");
					while (isConnecting) {
						try {
							// read the message to deliver.
							int option = userInput.nextInt();
							switch (option) {
							case 0:
								LOG.info(REQUEST.toJSONString());
								break;
							case 1:

								sendData = GetFormDataLogin("anmtd", "passe");
								// write on the output stream
								dos.writeUTF(JSONObject.toJSONString(sendData));
								break;

							case 2: // Fake Login info
								JSONObject request = new JSONObject();
								request.put("a", "Login");
								request.put("age", 30);
								request.put("status", true);
								// write on the output stream
								dos.writeUTF(request.toJSONString());
								break;

							case 3:
								REQUEST.put("x", "ss");
								dos.writeUTF(REQUEST.toJSONString());
								break;

							case 4: // Tạo Phòng và vào Phòng
								// Check đã đăng nhập có Token chưa?
								if (REQUEST.containsKey("Token")) {
									sendData = GetFormCreateRoom(REQUEST.get("Token").toString(), "");
									// write on the output stream
									dos.writeUTF(JSONObject.toJSONString(sendData));
								} else {
									LOG.info("Chưa Đăng Nhập");
									LOG.info(RESPONSE.toJSONString());
								}
								break;
							case 5: // Vào Phòng
								LOG.info("Vào Phòng ID");
								String roomId = userInput.next();
								LOG.info("Nhập Pass (Nếu không có để trống):");
								String pass = userInput.next();
								// Gọi Form lấy dữ liệu
								sendData = GetFormJoinRoom(REQUEST.get("Token").toString(), roomId, pass);
								// write on the output stream
								dos.writeUTF(JSONObject.toJSONString(sendData));
								break;
							case 6:
								sendData = GetGamePlay(REQUEST.get("Token").toString(),
										REQUEST.get("RoomId").toString());
								// write on the output stream
								dos.writeUTF(JSONObject.toJSONString(sendData));
								break;
							default:
								LOG.info("Nhập Không Hợp Lệ");
								// break;
							}

						} catch (IOException e) {
							LOG.error("Lỗi Gửi Data: " + e.getMessage());
							isConnecting = false;
							break;
						}
					}
					//
				}
			});

			// Read Message Thread
			Thread readMessage = new Thread(new Runnable() {
				@Override
				public void run() {
					LOG.info("Tạo luồng nhận data.");
					while (isConnecting) {
						try {

							String received = dis.readUTF();
							LOG.info("Received: " + received);

							JSONObject recv = (JSONObject) JSON_PARSER.parse(received);

							// Đăng nhập thành công có token
							if (recv.containsKey("Token")) {

								// LOG.info(recv.get("Token").toString());

								// Đặt Token vào REQUEST để gửi lần sau.
								REQUEST.put("Token", recv.get("Token").toString());

								if (recv.containsKey("RoomId")) {
									// Set trạng thái ở trong phòng
									REQUEST.put("RoomId", recv.get("RoomId").toString());

									// Get Game Status
									if (recv.containsKey("GameStatus")) {
										REQUEST.put("GameStatus", recv.get("GameStatus").toString());

									}
								}
							}

						} catch (Exception e) {
							LOG.error("Lỗi Nhận Data:" + e.getMessage());
							isConnecting = false;
							break;
						}
					}
				}
			});
			sendMessage.setName("Send Message");
			readMessage.setName("Read Message");
			sendMessage.start();
			readMessage.start();

		} catch (IOException e) {
			LOG.error("Lỗi: " + e.getMessage());
		}
	}

	public void handleLogin(String username, char[] password) {
		// Xử lý đăng nhập ở đây
		// Kiểm tra thông tin đăng nhập
		// Nếu hợp lệ, thực hiện các hành động tiếp theo
		// Nếu không hợp lệ, hiển thị thông báo lỗi
		boolean isValid = validateLogin(username, password);
		if (isValid) {
			clientUI.showMessage("Login successful!");
			// Thực hiện các hành động sau khi đăng nhập thành công
			clientUI.showMainScreen();
		} else {
			clientUI.showMessage("Invalid username or password. Please try again.");
			// Xử lý trường hợp đăng nhập không hợp lệ
		}
	}

	private boolean validateLogin(String username, char[] password) {
		// Xử lý logic kiểm tra thông tin đăng nhập ở đây
		// Trả về true nếu thông tin hợp lệ, ngược lại trả về false
		return true; // Giả sử luôn trả về true để minh họa
	}

	public static void main(String[] args) {
//		new Client();
		SwingUtilities.invokeLater(new Runnable() {
			@Override
			public void run() {
				new Client();
			}
		});

	}

	static Map<String, String> GetFormDataLogin(String username, String password) {
		Map<String, String> x = new HashMap<String, String>();
		x.put("a", "Login");
		x.put("Username", username);
		x.put("Password", password);
		return x;
	}

	static Map<String, String> GetFormCreateRoom(String token, String password) {
		Map<String, String> x = new HashMap<String, String>();
		x.put("a", "CreateRoom");
		x.put("Token", token);
		x.put("Password", password);
		return x;
	}

	static Map<String, String> GetFormJoinRoom(String token, String roomId, String password) {
		Map<String, String> x = new HashMap<String, String>();
		x.put("a", "JoinRoom");
		x.put("Token", token);
		x.put("RoomId", roomId);
		x.put("RoomPassword", password);
		return x;
	}

	static Map<String, String> GetGamePlay(String token, String roomId) {
		Map<String, String> x = new HashMap<String, String>();
		x.put("a", "PlayGame");
		x.put("Token", token);
		x.put("RoomId", roomId);
		return x;
	}

}
