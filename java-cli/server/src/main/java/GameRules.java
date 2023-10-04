import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GameRules {
	
	private static final Logger LOG = LoggerFactory.getLogger(GameRules.class);
	
	public static boolean isValidMove(Player player, List<Card> currentPlayerCards, List<Card> lastPlayedCards) {
		// Kiểm tra xem bài đánh ra có hợp lệ không
		// Đây là nơi để đặt các luật chơi của game

		// Ví dụ: Bài phải cùng rank hoặc suit với lá bài cuối cùng trên bàn
		if (lastPlayedCards.size() == 0) {
			// Nếu bàn chưa có lá bài nào, bất kỳ lá bài nào cũng hợp lệ
			return true;
		}

		int numOfLastPlayedCard = lastPlayedCards.size();

		int numOfCurrentPlayerCards = currentPlayerCards.size();

		// Kiểm tra người đi sau có cùng số lượng lá bài với bài trên bàn?
		if (numOfLastPlayedCard == numOfCurrentPlayerCards) {
			// Số lượng hợp lệ
			return true;
		}

		// Kiểm tra lá các bài trong danh sách đánh ra trên bàn là nước nào.
		// Nhận dạng các lá trên bàn là Đôi 2 lá cùng rank.
		switch (numOfLastPlayedCard) {
		case 1: {
			// Nếu là 1 lá là nước đi Lẻ
			// Người chơi sau phải đi rank lớn hơn
			System.out.println("" + lastPlayedCards.getFirst().getName());
			break;
		}
		default:
			throw new IllegalArgumentException("Unexpected value: " + numOfLastPlayedCard);
		}
		

		// Nếu tất cả các lá bài đánh ra đều thỏa mãn quy tắc, bài đánh ra hợp lệ
		return true;
	}
}
