package websocket.smarthome;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.json.simple.JSONObject;

import jakarta.websocket.Session;


public class DeviceSessionHandler {
	private int deviceId = 0;
	private final Set<Session> sessions = new HashSet<>();
	private final Set<Device> devices = new HashSet<>();

	public void addSession(Session session) {
		sessions.add(session);
		for (Device device : devices) {
			JSONObject addMessage = createAddMessage(device);
			sendToSession(session, addMessage);
		}
	}

	public void removeSession(Session session) {
		sessions.remove(session);
	}

	public List<Device> getDevices() {
		return new ArrayList<>(devices);
	}

	public void addDevice(Device device) {
		device.setId(deviceId);
		devices.add(device);
		deviceId++;
		JSONObject addMessage = createAddMessage(device);
		sendToAllConnectedSessions(addMessage);
	}

	public void removeDevice(int id) {
		Map<String, String> x = new HashMap<String, String>();
		Device device = getDeviceById(id);
		if (device != null) {
			devices.remove(device);
			x.put("action", "remove");
			x.put("id", "" + id);
			JSONObject jsonObject = new JSONObject(x);
			sendToAllConnectedSessions(jsonObject);
		}
	}

	public void toggleDevice(int id) {
		Map<String, String> x = new HashMap<String, String>();
		Device device = getDeviceById(id);
		if (device != null) {
			if ("On".equals(device.getStatus())) {
				device.setStatus("Off");
			} else {
				device.setStatus("On");
			}
			x.put("action", "toggle");
			x.put("id", "" + device.getId());
			x.put("status", device.getStatus());
			JSONObject jsonObject = new JSONObject(x);
			sendToAllConnectedSessions(jsonObject);
		}

	}

	private Device getDeviceById(int id) {
		for (Device device : devices) {
			if (device.getId() == id) {
				return device;
			}
		}
		return null;
	}

	private JSONObject createAddMessage(Device device) {
		Map<String, String> x = new HashMap<String, String>();
		x.put("action", "add");
		x.put("id", "" + device.getId());
		x.put("name", device.getName());
		x.put("type", device.getType());
		x.put("status", device.getStatus());
		x.put("description", device.getDescription());
		JSONObject jsonObject = new JSONObject(x);
		return jsonObject;
	}

	private void sendToAllConnectedSessions(JSONObject message) {
		for (Session session : sessions) {
			sendToSession(session, message);
		}
	}

	private void sendToSession(Session session, JSONObject message) {
		try {
			session.getBasicRemote().sendText(message.toString());
		} catch (IOException ex) {
			sessions.remove(session);
			Logger.getLogger(DeviceSessionHandler.class.getName()).log(Level.SEVERE, null, ex);
		}
	}
}