import java.util.ArrayList;
import java.util.List;

public class Room {
	String id;
	List<Player> players;
	int num;

	public Room(String id) {
		super();
		this.id = id;
		this.players = new ArrayList<Player>();
	}

	public List<Player> addPlayer(Player player) {

		if (this.players.size() < 4) {
			this.players.add(player);

			return this.players;
		}
		return null;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getNum() {
		return this.players.size();
	}

}
