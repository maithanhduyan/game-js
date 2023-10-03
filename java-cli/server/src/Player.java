import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Player implements Runnable {

	private List<Card> handCards;
	private String name;

	public Player() {
		super();
		this.handCards = new ArrayList<Card>();
	}

	public Player(String name) {
		super();
		this.name = name;
		this.handCards = new ArrayList<Card>();
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

	public void addCard(Card card) {
		this.handCards.add(card);
		if (this.handCards.size() == 13) {
			// Sau khi thêm lá bài, sắp xếp lại bài trong tay theo rank
//	        Collections.sort(this.handCards);
		}
	}

	public void displayHand() {
		int handCardSize = handCards.size();
		if (handCardSize > 0) {
			System.out.print(this.getName() + ": ");
			for (int i = 0; i < handCardSize; i++) {
				System.out.print(handCards.get(i).getName());
			}
			System.out.println();
		}
	}

	@Override
	public void run() {
		// Logic xử lý khi người chơi suy nghĩ
		// Ví dụ: Người chơi đơn giản chỉ in tên và số lượng lá bài trong tay
		System.out.println(name + "'s Number of Cards in Hand: " + handCards.size());
		// Thêm logic xử lý khác tại đây

	}

	public boolean hasPlayed() {
		// TODO Auto-generated method stub
		return false;
	}
	
	

}
