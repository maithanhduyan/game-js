
class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.name = `${suit}${rank}`;
    }

    toString() {
        return this.name;
    }
}

export default Card