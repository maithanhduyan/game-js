import java.util.HashMap;
import java.util.Map;

public class Room {
	String id;
	// Danh sách người chơi
	private Map<String, Player> players;
	int num;
	private int maxPlayer = 4;

	Game game;

	private RoomStatus status;

	// Trạng thái phòng game
	public enum RoomStatus {
		WAITING, // Đang chờ người chơi
		PLAYING, // Đang trong trạng thái chơi game
		FULL, // Đã đủ người chơi
		LOCKED // Phòng bị khóa
	}

	public Room(String id) {
		super();
		this.id = id;
		this.status = RoomStatus.WAITING;
		this.players = new HashMap<String, Player>();
	}

	void createGame() {
		this.game = new Game(this.id);
	}
	
	void addPlayer(String id) {
		if(this.players.size() < maxPlayer) {
			Player player = new Player(id);
			this.players.put(id, player);
			this.game.addPlayer(player);
		}
	}

	public String getId() {
		return id;
	}

	public int getNum() {
		return this.players.size();
	}

	public int getMaxPlayer() {
		return maxPlayer;
	}

	public void setMaxPlayer(int maxPlayer) {
		this.maxPlayer = maxPlayer;
	}

	public RoomStatus getStatus() {
		return status;
	}

	public void setStatus(RoomStatus status) {
		this.status = status;
	}

	public Game getGame() {
		return game;
	}

}
