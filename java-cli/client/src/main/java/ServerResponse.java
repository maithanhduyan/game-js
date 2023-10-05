import org.json.simple.JSONObject;

public abstract class ServerResponse {
	boolean success;
	String errorMessage;
	private JSONObject rawResponse;

	ServerResponse() {
	}

	void setRawResponse(JSONObject resp) {
		rawResponse = resp;
		if (resp.containsKey("error"))
			errorMessage = resp.get("error").toString();
		if (resp.containsKey("success"))
			success = true;
	}

	public boolean isSuccess() {
		return success;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public JSONObject getRawResponse() {
		return rawResponse;
	}
}
