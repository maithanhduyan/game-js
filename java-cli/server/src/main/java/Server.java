import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.HashMap;
import java.util.UUID;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Server {
	private static final int PORT = 3000;

	private static ExecutorService executorService = Executors.newCachedThreadPool();

	private static final Logger LOG = LoggerFactory.getLogger(Server.class);

	static HashMap<String, ClientHandler> activeClientList = new HashMap<String, ClientHandler>();

	static HashMap<String, Room> activeRoomList = new HashMap<String, Room>();
	
	// counter for clients
	static int numberClient = 0;

	static boolean isServerRunning = true;

	static ServerSocket serverSocket = null;

	static Socket clientSocket;

	public static void main(String[] args) {
		LOG.info("Game Server");

		Thread clientCounter = new Thread(new Runnable() {

			@Override
			public void run() {
				while (true) {
					LOG.info(" " + activeClientList.size() + " active.");

					try {
						Thread.sleep(5000);
					} catch (InterruptedException e) {
						LOG.error(e.getMessage());
					}
				}

			}
		});
		clientCounter.setName("Client Counter");
//		clientCounter.start();

		Thread gameServer = new Thread(new Runnable() {

			@Override
			public void run() {
				try {
					serverSocket = new ServerSocket(PORT);
					LOG.info("Server listening on port " + PORT);

					// Vòng lặp vô hạn nhận kết nối từ client
					while (isServerRunning) {
						clientSocket = serverSocket.accept();
						String uuid = UUID.randomUUID().toString();
						LOG.info("Ray id:[" + uuid + "]" + " with client from: "
								+ clientSocket.getInetAddress().getHostAddress());

						// obtain input and output streams
						DataInputStream dis = new DataInputStream(clientSocket.getInputStream());
						DataOutputStream dos = new DataOutputStream(clientSocket.getOutputStream());

						// Tạo một luồng mới cho kết nối từ client và đặt thời hạn đợi phản hồi
						// executorService.submit(new ClientHandler(clientSocket,uuid,dis,dos));
						// Create a new handler object for handling this request.
						ClientHandler clientHandler = new ClientHandler(clientSocket, uuid, dis, dos);

						// Create new thread for client
						Thread clientThread = new Thread(clientHandler);
						clientThread.setName(uuid);
						
						// add this client to active client list
						activeClientList.put(uuid, clientHandler);

						// Start the thread
						clientThread.start();

						// increase i for new client
						numberClient++;
					}

				} catch (IOException e) {
					LOG.info("Lỗi:" + e.getMessage());
				}

			}
		});

		gameServer.setName("Game Server");
		gameServer.start();
	}
}
