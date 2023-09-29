

class Player {
    constructor() {
        this.hand = [];
    }

    // Thêm lá bài vào tay người chơi
    addCard(card) {
        this.hand.push(card);
    }

    // Kiểm tra xem có lá bài nào có thể đánh không
    canPlay() {
        // Kiểm tra từng lá bài trong tay người chơi
        // Trả về true nếu có thể đánh, false nếu không thể đánh
    }

    // Đánh một lá bài từ tay người chơi
    playCard(card) {
        // Xóa lá bài từ tay người chơi
        // Trả về lá bài đã đánh nếu hợp lệ, hoặc null nếu không hợp lệ
    }
}

export default Player;