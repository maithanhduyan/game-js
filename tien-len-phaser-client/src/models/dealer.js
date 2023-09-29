import Deck from "./deck";


class Dealer {
    constructor(name) {
        this.name = name;
        this.deck = new Deck();
        this.shuffleDeck();
        this.players = [];
    }

    // Trộn bộ bài
    shuffleDeck() {
        
    }

    // Thêm người chơi vào trò chơi
    addPlayer(player) {
        this.players.push(player);
    }

    // Phát bài cho tất cả người chơi
    dealCards(numCards) {
        for (let i = 0; i < numCards; i++) {
            for (let player of this.players) {
                player.addCard(this.deck.drawCard());
            }
        }
    }

    getDeck(){
        return this.deck;
    }
}

export default Dealer;