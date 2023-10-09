package websocket.stickystory;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.websocket.EncodeException;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/websocket/story/notifications", encoders = { StickerEncoder.class }, decoders = {
		StickerDecoder.class })
public class StoryWebsocket {

	private static final Logger log = LoggerFactory.getLogger(StoryWebsocket.class);

	private static final List<Sticker> stickers = Collections.synchronizedList(new LinkedList<Sticker>());

	private static final Set<Session> sessions = Collections.synchronizedSet(new HashSet<Session>());

	@OnMessage
	public void onMessage(Session session, Sticker sticker) {
		stickers.add(sticker);
		for (Session openSession : sessions) {
			try {
				openSession.getBasicRemote().sendObject(sticker);
			} catch (IOException | EncodeException ex) {
				sessions.remove(openSession);
				log.error("Lỗi: " + ex.getMessage());
				log.error("Removed Session.");
			}
		}
	}

	@OnOpen
	public void onOpen(Session session) throws IOException, EncodeException {
		sessions.add(session);
		for (Sticker sticker : stickers) {
			session.getBasicRemote().sendObject(sticker);
		}
	}

	@OnClose
	public void onClose(Session session) throws IOException, EncodeException {
		sessions.remove(session);
	}

}
