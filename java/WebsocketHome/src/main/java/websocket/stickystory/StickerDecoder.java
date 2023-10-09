package websocket.stickystory;

import java.io.IOException;
import java.io.Reader;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.websocket.DecodeException;
import jakarta.websocket.Decoder;
import jakarta.websocket.EndpointConfig;

public class StickerDecoder implements Decoder.TextStream<Sticker> {

	private static final Logger log = LoggerFactory.getLogger(StoryWebsocket.class);

	@Override
	public Sticker decode(Reader reader) throws DecodeException, IOException {
		JSONParser jsonParser = new JSONParser();
		JSONObject jsonSticker;
		Sticker sticker = null;
		try {
			jsonSticker = (JSONObject) jsonParser.parse(reader);
			sticker = new Sticker();
			sticker.setX(Integer.parseInt(jsonSticker.get("x").toString()));
			sticker.setY(Integer.parseInt(jsonSticker.get("y").toString()));
			sticker.setImage(jsonSticker.get("sticker").toString());
		} catch (IOException e) {
			log.error("Lỗi: " + e.getMessage());
		} catch (ParseException e) {
			log.error("Lỗi: " + e.getMessage());
		}
		return sticker;
	}

	@Override
	public void init(EndpointConfig ec) {
	}

	@Override
	public void destroy() {
	}

}
