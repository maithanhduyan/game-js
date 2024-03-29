package websocket.snake;

import java.awt.Color;
import java.io.EOFException;
import java.util.Iterator;
import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;

import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/websocket/snake")
public class SnakeAnnotation {
	public static final int PLAYFIELD_WIDTH = 640;
	public static final int PLAYFIELD_HEIGHT = 480;
	public static final int GRID_SIZE = 10;

	private static final AtomicInteger snakeIds = new AtomicInteger(0);
	private static final Random random = new Random();

	private final int id;
	private Snake snake;

	public static String getRandomHexColor() {
		float hue = random.nextFloat();
		// sat between 0.1 and 0.3
		float saturation = (random.nextInt(2000) + 1000) / 10000f;
		float luminance = 0.9f;
		Color color = Color.getHSBColor(hue, saturation, luminance);
		return '#' + Integer.toHexString((color.getRGB() & 0xffffff) | 0x1000000).substring(1);
	}

	public static Location getRandomLocation() {
		int x = roundByGridSize(random.nextInt(PLAYFIELD_WIDTH));
		int y = roundByGridSize(random.nextInt(PLAYFIELD_HEIGHT));
		return new Location(x, y);
	}

	private static int roundByGridSize(int value) {
		value = value + (GRID_SIZE / 2);
		value = value / GRID_SIZE;
		value = value * GRID_SIZE;
		return value;
	}

	public SnakeAnnotation() {
		this.id = snakeIds.getAndIncrement();
	}

	@OnOpen
	public void onOpen(Session session) {
		this.snake = new Snake(id, session);
		SnakeTimer.addSnake(snake);
		StringBuilder sb = new StringBuilder();
		for (Iterator<Snake> iterator = SnakeTimer.getSnakes().iterator(); iterator.hasNext();) {
			Snake snake = iterator.next();
			sb.append(String.format("{\"id\": %d, \"color\": \"%s\"}", Integer.valueOf(snake.getId()),
					snake.getHexColor()));
			if (iterator.hasNext()) {
				sb.append(',');
			}
		}
		SnakeTimer.broadcast(String.format("{\"type\": \"join\",\"data\":[%s]}", sb.toString()));
	}

	@OnMessage
	public void onTextMessage(String message) {
		if ("west".equals(message)) {
			snake.setDirection(Direction.WEST);
		} else if ("north".equals(message)) {
			snake.setDirection(Direction.NORTH);
		} else if ("east".equals(message)) {
			snake.setDirection(Direction.EAST);
		} else if ("south".equals(message)) {
			snake.setDirection(Direction.SOUTH);
		}
	}

	@OnClose
	public void onClose() {
		SnakeTimer.removeSnake(snake);
		SnakeTimer.broadcast(String.format("{\"type\": \"leave\", \"id\": %d}", Integer.valueOf(id)));
	}

	@OnError
	public void onError(Throwable t) throws Throwable {
		// Most likely cause is a user closing their browser. Check to see if
		// the root cause is EOF and if it is ignore it.
		// Protect against infinite loops.
		int count = 0;
		Throwable root = t;
		while (root.getCause() != null && count < 20) {
			root = root.getCause();
			count++;
		}
		if (root instanceof EOFException) {
			// Assume this is triggered by the user closing their browser and
			// ignore it.
		} else {
			throw t;
		}
	}
}
