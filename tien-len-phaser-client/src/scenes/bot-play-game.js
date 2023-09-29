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

    }

    preload() {
        this.bot1 = new BotPlayer(`BotPlayer1`);
        this.bot2 = new BotPlayer(`BotPlayer2`);
        this.bot3 = new BotPlayer(`BotPlayer3`);
        this.bot4 = new BotPlayer(`BotPlayer4`);
    }

    create() {
        // Dealer chia bài cho 4 BotPlayer từ 1 đến 4
        // Đưa các bot vào một mảng để dễ dàng quản lý
        this.botPlayers = [this.bot1, this.bot2, this.bot3, this.bot4];

        // Lấy bộ bài từ Dealer
        const deck = this.dealer.getDeck();
        // console.log(`${deck.cards.toString()}`);
        // Trộn bài
        deck.shuffle();
        console.log(`${deck.cards.toString()}`);

        // Chia bài cho các bot
        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < this.botPlayers.length; j++) {
                const card = deck.cards.pop(); // Lấy lá bài từ đỉnh bộ bài
                this.botPlayers[j].addCard(card); // Thêm lá bài vào tay của bot
            }
        }

        // Bây giờ các bot đã có bài trong tay của mình để chơi
        console.log(`Bot1: ${this.bot1.handCards.toString()}`);
        console.log(`Bot2: ${this.bot2.handCards.toString()}`);
        console.log(`Bot3: ${this.bot3.handCards.toString()}`);
        console.log(`Bot4: ${this.bot4.handCards.toString()}`);

        // Trao quyền cho trọng tài
        this.referee.addPlayer(this.bot1);
        this.referee.addPlayer(this.bot2);
        this.referee.addPlayer(this.bot3);
        this.referee.addPlayer(this.bot4);

       console.log(this.referee.checkPermission()) ;

    }
}

export default BotPlayGame;