import org.json.simple.JSONObject;

public final class GetInfoResponse extends ServerResponse {

	String info;

	@Override
	void setRawResponse(JSONObject resp) {
		super.setRawResponse(resp);

		if (resp.containsKey("Info")) {
			success = true;
			info = resp.get("Balance").toString();
		}
	}

	public String getInfo() {
		return info;
	}
}
