import Phaser from 'phaser'
import socket from '../sockets/send_msg';
import Deck from '../models/deck'
import { directions, gameRules, cardOptions } from '../game-options';

class PlayGame extends Phaser.Scene {

    constructor() {
        super('PlayGame')
        this.deck = null;
    }
    preload() {
        // Láy dữ liệu từ Deck
        this.deck = new Deck(this);
    }
    create() {
        // console.log('enter game')
        // socket.emit('chat message','Enter game.');
        socket.emit('joinRoom','Room-123','An Phaser');
        socket.on('chat message',(msg)=>{
            console.log('Server response:' + msg);
        })



        // Tính kích thước của màn hình
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;

        // Tính kích thước tối ưu cho lá bài
        const cardWidth = screenWidth / 10; // Ví dụ: chia 1/10 kích thước màn hình
        const cardHeight = cardWidth * 1.4; // Ví dụ: giữ tỷ lệ khung hình

        // Nhận bài từ server
        // const _13La = gameRules.cardNum;
        // let x = cardOptions.cardWidth;
        // let y = this.cameras.main.height - cardOptions.cardHeight;
        // this.add.image(x, y, 'cards', Phaser.Math.RND.pick(this.deck.cards)).setInteractive();
        // Tạo một lá bài (ví dụ)
        const card = this.add.image(0, 0, 'cards', Phaser.Math.RND.pick(this.deck.cards)); // Thay 'card' bằng tên texture thích hợp
        // Đặt kích thước cho lá bài
        card.setScale(cardWidth / card.width, cardHeight / card.height);

        // Đặt vị trí của lá bài (ví dụ: giữ nguyên trung tâm)
        card.setPosition(screenWidth / 2, screenHeight - (cardHeight / 2));

        // Thêm lá bài vào scene
        this.add.existing(card);

        // Tạo animation cho lá bài di chuyển từ trên xuống dưới
        const cardAnimation = this.tweens.add({
            targets: card,
            y: cardHeight,
            duration: 300, // Thời gian di chuyển (ms)
            ease: 'Bounce.easeOut', // Loại easing (có thể thay đổi) Bounce.easeOut,Linear,
            onComplete: () => {
                // Xử lý khi animation hoàn thành (nếu cần)
                // console.log('hoàn thành')
            }
        });

        // Bắt đầu animation
        cardAnimation.play();

        // TODO: Chia bài từ server
        // for (let i = 0; i < _13La; i++) {
        //     this.add.image(x, y, 'cards', Phaser.Math.RND.pick(this.deck.cards)).setInteractive();
        //     x += 40;
        // }

        // this.input.on('gameobjectdown', function (pointer, gameObject) {
        //     //  Will contain the top-most Game Object (in the display list)
        //     this.tweens.add({
        //         targets: gameObject,
        //         x: { value: 400, duration: 1500, ease: 'Power2' },
        //         y: { value: 300, duration: 500, ease: 'Bounce.easeOut', delay: 150 },
        //         onComplete: () => {
        //             // Xử lý khi chia xong bài (hoàn thành tween)
        //             console.log('Đã chia bài xong');
        //         },
        //     });

        // }, this);


    }
    update() {
        
    }

}

export default PlayGame
