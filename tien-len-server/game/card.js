class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.name = `${this.suit}${this.rank}`;
    }

    toString() {
        return `${this.suit}${this.rank}`;
    }
}

module.exports = Card;
