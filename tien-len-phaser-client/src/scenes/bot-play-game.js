import Phaser from "phaser";
import BotPlayer from "../models/bot";
import Dealer from "../models/dealer";
import Referee from "../models/referee";
import Deck from "../models/deck";
import Card from "../models/card";

class BotPlayGame extends Phaser.Scene {

    constructor() {
        super('BotPlayGame')
        this.dealer = new Dealer('Người chia bài');
        this.referee = new Referee('Trọng Tài');
        this.botPlayers = [];
        this.newRound = true;

        this.bot1 = new BotPlayer(`BotPlayer1`);
        this.bot2 = new BotPlayer(`BotPlayer2`);
        this.bot3 = new BotPlayer(`BotPlayer3`);
        this.bot4 = new BotPlayer(`BotPlayer4`);
    }

    preload() {
        this.botPlayers.push(this.bot1)
        this.botPlayers.push(this.bot2)
        this.botPlayers.push(this.bot3)
        this.botPlayers.push(this.bot4)
    }

    create() {
        const deck = new Deck();
        console.log(deck.cards.toString());
        // Trộn bài
        deck.shuffle();
        // console.log(`${deck.cards}`);

        // Chia bài cho các bot
        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < this.botPlayers.length; j++) {
                const card = deck.cards.pop(); // Lấy lá bài từ đỉnh bộ bài
                this.botPlayers[j].addCard(card); // Thêm lá bài vào tay của bot
            }
        }

        // Bây giờ các bot đã có bài trong tay của mình để chơi
        // console.log(`${this.bot1.name}: ${this.bot1.handCards.toString()}`);
        // console.log(`${this.bot2.name}: ${this.bot2.handCards.toString()}`);
        // console.log(`${this.bot3.name}: ${this.bot3.handCards.toString()}`);
        // console.log(`${this.bot4.name}: ${this.bot4.handCards.toString()}`);

        // Trao quyền cho trọng tài
        this.referee.addPlayer(this.bot1);
        this.referee.addPlayer(this.bot2);
        this.referee.addPlayer(this.bot3);
        this.referee.addPlayer(this.bot4);

        this.referee.checkPermission();
        for (let i = 0; i < this.botPlayers.length; i++) {
            this.botPlayers[i].run();
        }


    }
    update() {
    }
}

export default BotPlayGame;