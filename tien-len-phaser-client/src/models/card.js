class Card {
    constructor(suit, rank) {
        this.name = '';
        this.suit = suit;
        this.rank = rank;
    }

    toString() {
        // `${this.value} of ${this.suit}`
        this.name = `${this.suit}${this.rank}`;
        return this.name;
    }
}

export default Card