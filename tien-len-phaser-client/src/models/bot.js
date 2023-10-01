
const cardOrder = ['spades3', 'clubs3', 'diamonds3', 'hearts3', 'spades4', 'clubs4', 'diamonds4', 'hearts4', 'spades5', 'clubs5', 'diamonds5', 'hearts5', 'spades6', 'clubs6', 'diamonds6', 'hearts6', 'spades7', 'clubs7', 'diamonds7', 'hearts7', 'spades8', 'clubs8', 'diamonds8', 'hearts8', 'spades9', 'clubs9', 'diamonds9', 'hearts9', 'spades10', 'clubs10', 'diamonds10', 'hearts10', 'spadesJack', 'clubsJack', 'diamondsJack', 'heartsJack', 'spadesQueen', 'clubsQueen', 'diamondsQueen', 'heartsQueen', 'spadesKing', 'clubsKing', 'diamondsKing', 'heartsKing', 'spadesAce', 'clubsAce', 'diamondsAce', 'heartsAce', 'spades2', 'clubs2', 'diamonds2', 'hearts2'];

class BotPlayer {
    constructor(name) {
        this.name = name;
        this.handCards = [];
        this.permission = false;
        this.cardSelected = [];
    }

    // Hành động của bot để chọn lá bài để đánh
    chooseCardToPlay(card) {
        this.cardSelected.push(card);
    }

    addCard(card) {
        this.handCards.push(card);
    }

    /**
     * @argument{boolean} permission
     * 
     * */
    setPermission(permission) {
        this.permission = permission;
    }

    sortCards() {


        function customSort(a, b) {
            return cardOrder.indexOf(a.name) - cardOrder.indexOf(b.name);
        }

        this.handCards.sort(customSort);
    }


    /**
     * 
     * Skip game
     * */ 
    skip(){

    }

    /**
     * @argument{[]} cards 
     * 
     * */
    move() {
        console.log(this.handCards.toString());
        this.sortCards();
        if (this.permission) {
            this.handCards.splice(0, 1)
        }

        console.log(this.handCards);
    }


    run() {
        if (this.permission) {
            this.move();
        }
    }
}
export default BotPlayer;