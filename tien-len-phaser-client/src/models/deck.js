import Card from './card'
const suits = ['spades', 'clubs', 'diamonds', 'hearts'];
const ranks = ['3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace', '2'];
const cardOrder = ['spades3', 'clubs3', 'diamonds3', 'hearts3', 'spades4', 'clubs4', 'diamonds4', 'hearts4', 'spades5', 'clubs5', 'diamonds5', 'hearts5', 'spades6', 'clubs6', 'diamonds6', 'hearts6', 'spades7', 'clubs7', 'diamonds7', 'hearts7', 'spades8', 'clubs8', 'diamonds8', 'hearts8', 'spades9', 'clubs9', 'diamonds9', 'hearts9', 'spades10', 'clubs10', 'diamonds10', 'hearts10', 'spadesJack', 'clubsJack', 'diamondsJack', 'heartsJack', 'spadesQueen', 'clubsQueen', 'diamondsQueen', 'heartsQueen', 'spadesKing', 'clubsKing', 'diamondsKing', 'heartsKing', 'spadesAce', 'clubsAce', 'diamondsAce', 'heartsAce', 'spades2', 'clubs2', 'diamonds2', 'hearts2'];
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