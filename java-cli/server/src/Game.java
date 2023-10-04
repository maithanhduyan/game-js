import java.util.HashMap;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.CountDownLatch;
public class Game {

	HashMap<String, Player> playerInRoom;

	HashMap<String, Room> rooms;

	boolean newRound = true;

	private ExecutorService executorService;
	
	private CountDownLatch turnLatch;

	// Tạo một đối tượng GameRules
	private GameRules gameRules;

	public Game() {
		super();
		AsynLogger.logInfo("Create new game.");
		this.rooms = new HashMap<String, Room>();
		initGame();
	}

	void initGame() {
		// Khởi tạo đối tượng GameRules
		this.gameRules = new GameRules();

		String roomId = "AAA";
		Room room = new Room(roomId);
		this.rooms.put(roomId, room);
		AsynLogger.logInfo("Create sample room with id:" + room.id);

		// Tạo ra 4 player
		Player playerA = new Player("A");
		Player playerB = new Player("B");
		Player playerC = new Player("C");
		Player playerD = new Player("D");
		
		// Cho player vào phòng
		addPlayerInRoom(playerA, room);
		addPlayerInRoom(playerB, room);
		addPlayerInRoom(playerC, room);
		addPlayerInRoom(playerD, room);
		AsynLogger.logInfo("Create 4 players " + playerA.getName() + ", " + playerB.getName() + ", " + playerC.getName()
				+ ", " + playerD.getName());

		// Tạo bộ bài
		Deck deck = Deck.getInstance();
		
		// Trộn bài
		deck.shufle();
		
		// Lấy bài
		List<Card> cards = deck.getCards();

		// Xuất các lá bài ra màn hình
//		AsynLogger.logInfo("Deck was created.");
//		for (Card card : cards) {
//			System.out.print(card.getSuit() + "" + card.getRank());
//		}
//		System.out.println();

		// Chia bài cho 4 người chơi
		int cardIndex = 0;
		while (cardIndex < cards.size()) {
			playerA.addCard(cards.get(cardIndex++));
			playerB.addCard(cards.get(cardIndex++));
			playerC.addCard(cards.get(cardIndex++));
			playerD.addCard(cards.get(cardIndex++));
		}

		// Hiển thị bài trong tay của mỗi người chơi
		playerA.displayHand();
		playerB.displayHand();
		playerC.displayHand();
		playerD.displayHand();

		// Bắt đầu chơi
		// Tạo và khởi chạy luồng cho từng người chơi
		Thread playerAThread = new Thread(playerA);
		Thread playerBThread = new Thread(playerB);
		Thread playerCThread = new Thread(playerC);
		Thread playerDThread = new Thread(playerD);

		playerAThread.start();
		playerBThread.start();
		playerCThread.start();
		playerDThread.start();

	}

	public void isNewRound() {

	}

	public void playGame() {
		while (!isGameOver()) {
			for (Player player : this.rooms.get("AAA").players) {
				if (!player.hasPlayed()) {
					// Đợi cho đến khi người chơi đánh bài xong
					while (!player.hasPlayed()) {
						try {
							Thread.sleep(100); // Đợi 100 milliseconds trước khi kiểm tra lại
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
					}
					// Người chơi đã đánh bài xong, chuyển đến người chơi tiếp theo
					break;
				}
			}
		}
	}

	private boolean isGameOver() {
		// Xác định xem trò chơi đã kết thúc hay chưa
		// Trả về true nếu trò chơi đã kết thúc, ngược lại trả về false
		return false;
	}

	// Phương thức kiểm tra hợp lệ của bước chơi
	public boolean isValidMove(Player player, List<Card> currentPlayerCards, List<Card> lastPlayedCards) {
		return gameRules.isValidMove(player, currentPlayerCards, lastPlayedCards);
	}

	boolean addPlayerInRoom(Player player, Room room) {
		if (this.rooms.containsKey(room.id)) {
			int numOfPlayerInRoom = room.getNum();
			room.addPlayer(player);
			if (room.getNum() > numOfPlayerInRoom) {
				return true;
			}
		}
		return false;
	}

	// Phương thức bắt đầu tính toán thời gian suy nghĩ
//	public void startThinkingTime(Player player) {
//		int maxThinkingTime = 20000; // 20 giây
//		CountDownLatch latch = new CountDownLatch(1);
//
//		executorService.submit(() -> {
//			try {
//				long startTime = System.currentTimeMillis();
//				while (System.currentTimeMillis() - startTime < maxThinkingTime) {
//					// Kiểm tra nếu người chơi đã đánh bài xong
//					if (player.hasPlayed()) {
//						latch.countDown(); // Giảm đếm để kết thúc luồng
//						return;
//					}
//					// Đợi 1 giây trước khi kiểm tra lại
//					Thread.sleep(1000);
//				}
//				// Thời gian suy nghĩ đã hết, thực hiện các hành động liên quan
//				// ...
//			} catch (InterruptedException e) {
//				e.printStackTrace();
//			}
//		});
//
//		try {
//			latch.await(); // Chờ đến khi người chơi đánh bài xong hoặc hết thời gian suy nghĩ
//		} catch (InterruptedException e) {
//			e.printStackTrace();
//		}
//	}

	public void startThinkingTime(Player player) {
	    int maxThinkingTime = 20000; // 20 giây
	    CountDownLatch latch = new CountDownLatch(1);

	    executorService.submit(() -> {
	        try {
	            long startTime = System.currentTimeMillis();
	            while (System.currentTimeMillis() - startTime < maxThinkingTime) {
	                // Kiểm tra nếu người chơi đã đánh bài xong
	                if (player.hasPlayed()) {
	                    latch.countDown(); // Giảm đếm để kết thúc luồng
	                    return;
	                }
	                // Đợi 1 giây trước khi kiểm tra lại
	                Thread.sleep(1000);
	            }
	            // Thời gian suy nghĩ đã hết, thực hiện các hành động liên quan
	            // ...
	        } catch (InterruptedException e) {
	            e.printStackTrace();
	        }
	    });

	    try {
	        latch.await(); // Chờ đến khi người chơi đánh bài xong hoặc hết thời gian suy nghĩ
	    } catch (InterruptedException e) {
	        e.printStackTrace();
	    }
	}
}
