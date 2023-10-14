import Card from './card'
const suits = ['spades', 'clubs', 'diamonds', 'hearts'];
const ranks = ['3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace', '2'];
class Deck {
    constructor() {
        this.cards = [];
        this.initializeDeck();
    }

    initializeDeck() {
        for (const rank of ranks) {
            for (const suit of suits) {
                this.cards.push(new Card(suit, rank));
            }
        }
    }

    shuffle() {
        // Logic để xáo bài (bạn có thể tự xây dựng hoặc sử dụng một thư viện xáo bài)
        const numCards = this.cards.length;

        // Trường hợp đặc biệt: nếu chỉ có 1 lá bài hoặc không có lá bài nào, không cần trộn
        if (numCards <= 1) {
            return;
        }

        // Sử dụng thuật toán Fisher-Yates Shuffle
        for (let i = numCards - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Chọn một vị trí ngẫu nhiên từ i đến 0
            // Hoán đổi lá bài ở vị trí i và j
            const temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }

    drawCard() {
        if (this.cards.length > 0) {
            return this.cards.pop();
        } else {
            return null; // Không còn lá bài nào trong deck
        }
    }
}

export default Deck