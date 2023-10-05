import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Deck {
	private static Deck instance;

	public static final String[] SUITS_ORDER = { "spades", "clubs", "diamonds", "hearts" };
	public static final String[] RANKS_ORDER = { "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King",
			"Ace","2" };
	public static final String[] CARDS_ORDER = { "spades3", "clubs3", "diamonds3", "hearts3", "spades4", "clubs4",
			"diamonds4", "hearts4", "spades5", "clubs5", "diamonds5", "hearts5", "spades6", "clubs6", "diamonds6",
			"hearts6", "spades7", "clubs7", "diamonds7", "hearts7", "spades8", "clubs8", "diamonds8", "hearts8",
			"spades9", "clubs9", "diamonds9", "hearts9", "spades10", "clubs10", "diamonds10", "hearts10", "spadesJack",
			"clubsJack", "diamondsJack", "heartsJack", "spadesQueen", "clubsQueen", "diamondsQueen", "heartsQueen",
			"spadesKing", "clubsKing", "diamondsKing", "heartsKing", "spadesAce", "clubsAce", "diamondsAce",
			"heartsAce", "spades2", "clubs2", "diamonds2", "hearts2" };

	private List<Card> cards;

	private Deck() {
		super();
		this.cards = new ArrayList<Card>();
		initDeck();
	}

	void initDeck() {
		for (int i = 0; i < SUITS_ORDER.length; i++) {
			for (int j = 0; j < RANKS_ORDER.length; j++) {
//				System.out.println(SUITS_ORDER[i] + RANKS_ORDER[j]);
				this.cards.add(new Card(SUITS_ORDER[i], RANKS_ORDER[j]));
			}
		}
	}

	public static Deck getInstance() {
		if (instance == null) {
			instance = new Deck();
		}
		return instance;
	}

	public void shufle() {
		Collections.shuffle(cards);
	}

	public List<Card> getCards() {
		return cards;
	}
	
}
