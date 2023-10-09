import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Game {

	List<Player> players;

	public enum GameStatus {
		DEALING_CARDS, // Đang chia bài
		STARTED, // Trò chơi đã bắt đầu
		WAITING, // Trò chơi đang đợi người chơi
		PLAYING, // Thêm các trạng thái khác nếu cần thiết
		FINISHED // Trò chơi đã kết thúc
	}

	private GameStatus status;

	private static final Logger LOG = LoggerFactory.getLogger(Game.class);

	boolean newRound = true;

	private Deck deck;

	// Tạo một đối tượng GameRules
	private GameRules gameRules;

	public Game(String id) {
		super();
		this.status = GameStatus.STARTED; // Trạng thái mặc định khi tạo trò chơi mới
		players = new ArrayList<Player>();
		initGame();
		LOG.info("Create new game.");
	}

	void initGame() {
		Deck.getInstance();
	}

	void addPlayer(Player player) {
		if (this.status == GameStatus.STARTED) {
			this.players.add(player);
			this.status = GameStatus.WAITING;
		}

	}

	public void isNewRound() {

	}

	public void playGame() {
		if (players.size() > 2 && this.status == GameStatus.WAITING) {
			LOG.info("Chia bài");
			LOG.info("Trộn bài");
			this.deck.shufle();
			LOG.info(deck.getCards().toString());
			for (int i = 0; i < deck.getCards().size(); i++) {
				for (int j = 0; j < players.size(); j++) {
					players.get(j).addCard(deck.getCards().get(i));
				}
			}
			this.setStatus(GameStatus.DEALING_CARDS);
		}
		if (this.status == GameStatus.DEALING_CARDS) {
			// Nếu chia xong
			// Kiểm tra player nào đi trước
			this.setStatus(GameStatus.PLAYING);
		}

	}

	public GameStatus getStatus() {
		return status;
	}

	public void setStatus(GameStatus status) {
		this.status = status;
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

}
