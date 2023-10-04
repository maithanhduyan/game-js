
public class Card {
	private String suit;
	private String rank;
	private String name;

	public Card() {
		super();
	}

	public Card(String suit, String rank) {
		super();
		this.suit = suit;
		this.rank = rank;
		this.name = this.suit + this.rank;
	}

	public String getSuit() {
		return suit;
	}

	public void setSuit(String suit) {
		this.suit = suit;
	}

	public String getRank() {
		return rank;
	}

	public void setRank(String rank) {
		this.rank = rank;
	}

	public String getName() {
		return this.name = this.suit + "" + this.rank;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Card [suit=" + suit + ", rank=" + rank + ", name=" + name + "]";
	}

}
