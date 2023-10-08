

import java.util.HashSet;
import java.util.Set;

import jakarta.websocket.Endpoint;
import jakarta.websocket.server.ServerApplicationConfig;
import jakarta.websocket.server.ServerEndpointConfig;

public class ExamplesConfig implements ServerApplicationConfig {

	@Override
	public Set<Class<?>> getAnnotatedEndpointClasses(Set<Class<?>> scanned) {
		// Deploy all WebSocket endpoints defined by annotations in the examples
		// web application. Filter out all others to avoid issues when running
		// tests on Gump
		Set<Class<?>> results = new HashSet<>();
		for (Class<?> clazz : scanned) {
			if (clazz.getPackage().getName().startsWith("websocket.")) {
				results.add(clazz);
			}
		}
		
		return results;
	}

	@Override
	public Set<ServerEndpointConfig> getEndpointConfigs(Set<Class<? extends Endpoint>> scanned) {

		Set<ServerEndpointConfig> result = new HashSet<>();


		return result;
	}

}
