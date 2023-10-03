import java.util.List;

public class Player {

	private List<Card> handCards;
	private String name;

	public Player() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Player(String name) {
		super();
		this.name = name;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Card> getHandCards() {
		return this.handCards;
	}

	public void setHandCards(List<Card> handCards) {
		this.handCards = handCards;
	}

}
