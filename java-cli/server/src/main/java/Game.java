import java.util.HashMap;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.CountDownLatch;

public class Game {

	public enum GameStatus {
		DEALING_CARDS, // Đang chia bài
		STARTED, // Trò chơi đã bắt đầu
		FINISHED, // Trò chơi đã kết thúc
		WAITING, // Trò chơi đang đợi người chơi
		// Thêm các trạng thái khác nếu cần thiết
	}

	private GameStatus status;

	private static final Logger LOG = LoggerFactory.getLogger(Game.class);

	private String id;

	boolean newRound = true;

	private ExecutorService executorService;

	private CountDownLatch turnLatch;

	// Tạo một đối tượng GameRules
	private GameRules gameRules;

	public Game(String id) {
		super();
		this.id = id;
		this.status = GameStatus.WAITING; // Trạng thái mặc định khi tạo trò chơi mới
		initGame();
		LOG.info("Create new game.");
	}

	void initGame() {

	}

	public void isNewRound() {

	}

	public void playGame() {

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
