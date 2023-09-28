const Card = require('./card'); // Import Card from card.js

class Deck {
    constructor() {
        this.suits = ["spades", "clubs", "diamonds", "hearts"];
        this.ranks = ["3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace", "2"];
        this.cards = [];
    }

    initializeDeck() {
        for (const suit of this.suits) {
            for (const rank of this.ranks) {
                this.cards.push(new Card(suit, rank));
            }
        }
    }

    shuffleDeck() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    dealToPlayers(numPlayers, numCardsPerPlayer) {
        const hands = [];
        for (let i = 0; i < numCardsPerPlayer; i++) {
            for (let j = 0; j < numPlayers; j++) {
                const card = this.cards.pop();
                hands[j].push(card);
            }
        }

        return hands;
    }
}

module.exports = Deck;
