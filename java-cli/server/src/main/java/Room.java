import java.util.ArrayList;
import java.util.List;

public class Room {
	String id;
	// Danh sách người chơi
	List<Player> players;
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
		this.players = new ArrayList<Player>();
		this.status = RoomStatus.WAITING;
	}

	void createGame() {
		this.game = new Game(this.id);
	}
	
	public List<Player> addPlayer(Player player) {

		if (this.players.size() < maxPlayer) {
			this.players.add(player);

			return this.players;
		}
		return null;
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
