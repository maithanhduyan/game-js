package websocket.smarthome;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/websocket/actions")
public class DeviceAnnotation {
	DeviceSessionHandler deviceSessionHandler = new DeviceSessionHandler();

	@OnOpen
	public void open(Session session) {
		deviceSessionHandler.addSession(session);
	}

	@OnMessage
	public void handleMessage(String message, Session session) {
		System.out.println(message);
		JSONParser jsonParser = new JSONParser();
		try {
			JSONObject request = (JSONObject) jsonParser.parse(message);

			if (request.containsKey("action") && request.get("action").equals("add")) {
				Device device = new Device();
				device.setName(request.get("name").toString());
				device.setDescription(request.get("description").toString());
				device.setType(request.get("type").toString());
				device.setStatus("Off");
				deviceSessionHandler.addDevice(device);
			}

			if (request.get("action").equals("remove")) {
				int id = Integer.parseInt(request.get("id").toString());
				deviceSessionHandler.removeDevice(id);
			}

			if (request.get("action").equals("toggle")) {
				int id = Integer.parseInt(request.get("id").toString());
				deviceSessionHandler.toggleDevice(id);
			}

		} catch (ParseException e) {
			System.err.println("Lỗi:" + e.getMessage());
		}

	}

	@OnClose
	public void close(Session session) {
		deviceSessionHandler.removeSession(session);
	}

	@OnError
	public void onError(Throwable error) {
		System.err.println("Lỗi:" + error.getMessage());
	}
}