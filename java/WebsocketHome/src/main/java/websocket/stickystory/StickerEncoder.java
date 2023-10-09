package websocket.stickystory;

import java.io.IOException;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.websocket.EncodeException;
import jakarta.websocket.Encoder;
import jakarta.websocket.EndpointConfig;

public class StickerEncoder implements Encoder.TextStream<Sticker> {

	private static final Logger log = LoggerFactory.getLogger(StoryWebsocket.class);

	@Override
	public void encode(Sticker sticker, Writer writer) throws EncodeException, IOException {
		Map<String, String> x = new HashMap<String, String>();
		JSONObject jsonSticker = new JSONObject();
		try {

			x.put("action", "add");
			x.put("x", "" + sticker.getX());
			x.put("y", "" + sticker.getY());
			x.put("sticker", "" + sticker.getImage());
			writer.write(jsonSticker.toJSONString(x));
			
		} catch (IOException e) {
			log.error("Lỗi: " + e.getMessage());
		}

	}

	@Override
	public void init(EndpointConfig ec) {
	}

	@Override
	public void destroy() {
	}
}
