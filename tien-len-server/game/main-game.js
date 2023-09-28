const Card = require('./card');
const Deck = require('./deck');

class MainGame {
    constructor() {
        this.deck = new Deck();
        this.players = [];
    }

    initializeGame(numPlayers) {
        this.deck.initializeDeck();
        this.deck.shuffleDeck();
    }

    // Thêm các phương thức khác cho trò chơi ở đây

    printPlayerHands() {
        const player1 = [];
        const player2 = [];
        const player3 = [];
        const player4 = [];
        for (let i = 0; i < 13; i++) {
            const card = this.deck.cards.pop();
            // console.log(card);
            player1[i] = card;

        }
        console.log(this.deck.cards.length);

        for (let i = 0; i < 13; i++) {
            const card = this.deck.cards.pop();
            // console.log(card);
            player2[i] = card;

        }
        console.log(this.deck.cards.length);

        for (let i = 0; i < 13; i++) {
            const card = this.deck.cards.pop();
            // console.log(card);
            player3[i] = card;

        }
        console.log(this.deck.cards.length);

        for (let i = 0; i < 13; i++) {
            const card = this.deck.cards.pop();
            // console.log(card);
            player4[i] = card;

        }
        console.log(this.deck.cards.length);
        return player1;
    }
}

module.exports = MainGame;