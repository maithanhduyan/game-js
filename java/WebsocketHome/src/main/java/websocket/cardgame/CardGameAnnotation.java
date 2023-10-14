package websocket.cardgame;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.websocket.CloseReason;
import jakarta.websocket.CloseReason.CloseCodes;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/websocket/cardgame")
public class CardGameAnnotation {

	private static final Logger log = LoggerFactory.getLogger(CardGameAnnotation.class);

	// Danh sách user online
	private static final Set<Session> sessions = Collections.synchronizedSet(new HashSet<Session>());
	// Danh sách user online, lưu trữ mỗi user và session của họ
	private static final Map<String, Session> userSessions = new ConcurrentHashMap<>();

	@OnOpen
	public void onOpen(Session session) {
		log.info("onOpen");
		log.info("Session ID: " + session.getId());
		// Đoạn mã để lấy thông tin user từ session, giả sử bạn có thông tin user từ
		// session
		String username = getUsernameFromSession(session);

		if (username != null) {
			// Kiểm tra xem user đã có session chưa
			if (userSessions.containsKey(username)) {
				Session existingSession = userSessions.get(username);
				try {
					// Nếu có session khác, đóng session cũ đi trước khi tạo session mới
					existingSession.close(new CloseReason(CloseCodes.VIOLATED_POLICY, "New session opened"));
				} catch (IOException e) {
					log.error("Error closing existing session: " + e.getMessage());
				}
			}
			// Lưu session mới của user
			userSessions.put(username, session);
		} else {
			// Xử lý khi không tìm thấy thông tin user
		}
	}

	@OnMessage
	public void onMessage(String message) {
		log.info("onMessage");
		log.info(message);

	}

	@OnClose
	public void onClose() {
		log.info("onClose");
	}

	@OnError
	public void onError(Throwable t) throws Throwable {
		log.info("onError");
	}

	private String getUsernameFromSession(Session session) {
		// Viết mã để trích xuất thông tin user từ session, giả sử thông tin user được
		// lưu trong các attributes của session
		// Trả về username hoặc null nếu không tìm thấy
		return null;
	}
}
