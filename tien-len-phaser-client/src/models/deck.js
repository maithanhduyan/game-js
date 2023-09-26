import Card from './card'

class Deck {
    constructor() {
        this.cards = [];
        this.suits = ['spades', 'clubs', 'diamonds', 'hearts'];
        this.values = ['3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace', '2'];
        this.initializeDeck();
    }

    initializeDeck() {
        for (const suit of this.suits) {
            for (const value of this.values) {
                this.cards.push(new Card(suit, value));
            }
        }
    }

    shuffle() {
        // Logic để xáo bài (bạn có thể tự xây dựng hoặc sử dụng một thư viện xáo bài)
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