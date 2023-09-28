class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.name = `${suit}${rank}`;
    }

    toString() {
        // `${this.value} of ${this.suit}`
        this.name = `${this.suit}${this.rank}`;
        return this.name;
    }
}

export default Card