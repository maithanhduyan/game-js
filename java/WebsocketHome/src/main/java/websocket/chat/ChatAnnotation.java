package websocket.chat;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.logging.Logger;

import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/websocket/chat")
public class ChatAnnotation {

	private static final Logger log = Logger.getLogger(ChatAnnotation.class.getName());

	private static final String GUEST_PREFIX = "Guest";
	private static final AtomicInteger connectionIds = new AtomicInteger(0);
	private static final Set<ChatAnnotation> connections = new CopyOnWriteArraySet<>();

	private final String nickname;
	private Session session;

	public ChatAnnotation() {
		nickname = GUEST_PREFIX + connectionIds.getAndIncrement();
	}

	@OnOpen
	public void start(Session session) {
		this.session = session;
		connections.add(this);
		String message = String.format("* %s %s", nickname, "has joined.");
		broadcast(message);
	}

	@OnClose
	public void end() {
		connections.remove(this);
		String message = String.format("* %s %s", nickname, "has disconnected.");
		broadcast(message);
	}

	@OnMessage
	public void incoming(String message) {
		// Never trust the client
		String filteredMessage = String.format("%s: %s", nickname, message.toString());
		broadcast(filteredMessage);
	}

	@OnError
	public void onError(Throwable t) throws Throwable {
		log.info("Chat Error: " + t.toString() + t.getMessage());
	}

	private static void broadcast(String msg) {
		for (ChatAnnotation client : connections) {
			try {
				synchronized (client) {
					client.session.getBasicRemote().sendText(msg);
				}
			} catch (IOException e) {
				log.info("Chat Error: Failed to send message to client" + e.getMessage());
				connections.remove(client);
				try {
					client.session.close();
				} catch (IOException e1) {
					// Ignore
				}
				String message = String.format("* %s %s", client.nickname, "has been disconnected.");
				broadcast(message);
			}
		}
	}
}
