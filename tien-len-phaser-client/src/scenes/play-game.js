import Phaser from 'phaser'
// import socket from '../sockets/send_msg';
import Deck from '../models/deck'

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

        // Tính kích thước của màn hình
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;

        // Tính kích thước tối ưu cho lá bài
        const cardWidth = screenWidth / 10; // Ví dụ: chia 1/10 kích thước màn hình
        const cardHeight = cardWidth * 1.4; // Ví dụ: giữ tỷ lệ khung hình


        this.deck.shuffle();

        // Chia 13 lá bài cho người chơi
        const numCardsToDeal = 13;
        const selectedCards = []; // Danh sách để lưu các lá bài được chọn
        const handCards = []; // Danh sách để lưu các lá bài người chơi
        const cardSpacing = cardWidth / 2; // Khoảng cách giữa các lá bài
        let initialX = (screenWidth - (numCardsToDeal * (cardWidth - cardSpacing) + cardSpacing)) / 2;
        for (let i = 0; i < numCardsToDeal; i++) {
            let selectedCard = null; // Biến để theo dõi lá bài đã được chọn
            const card = this.add.image(
                initialX + i * (cardWidth - cardSpacing),
                screenHeight - cardHeight / 2,
                'cards',
                this.deck.cards[i]
            );
            handCards.push(card);

            // Đặt kích thước cho lá bài
            card.setScale(cardWidth / card.width, cardHeight / card.height);
            // Thêm sự kiện pointerdown cho lá bài
            card.setInteractive();
            card.on('pointerdown', () => {
                if (selectedCard === card) {
                    // Nếu lá bài đã được chọn trước đó, bỏ chọn nó và trả lại màu bình thường
                    selectedCard.clearTint();
                    selectedCard.y += 20; // Trả lại vị trí ban đầu
                    selectedCard = null; // Bỏ chọn lá bài
                } else {
                    if (selectedCard) {
                        // Nếu đã có lá bài được chọn trước đó, trả về vị trí và màu bình thường cho lá bài đó
                        selectedCard.clearTint();
                        selectedCard.y += 10; // Trả lại vị trí ban đầu
                    }
                    selectedCards.push(card);
                    console.log(card.frame.name);
                    // Đặt lá bài hiện tại là lá bài được chọn
                    selectedCard = card;

                    // Thay đổi viền và nâng lá bài lên
                    card.setTint(0xffff00); // Màu vàng
                    card.y -= 20; // Nâng lên 20 pixels
                }
            });

            // Thêm lá bài vào scene
            this.add.existing(card);

        }
        // Tạo nút BỎ QUA'
        const skipButton = this.add.text(
            screenWidth - 600,
            screenHeight - 170,
            'BỎ QUA',
            {
                fontSize: '16px',
                backgroundColor: '#CD9933', // Màu nút
                padding: {
                    x: 10,
                    y: 10
                }
            }
        );
        skipButton.setOrigin(0.5); // Đặt gốc của nút ở giữa
        // Thêm sự kiện cho nút Đánh
        skipButton.setInteractive();
        skipButton.on('pointerdown', () => {
            console.log('BỎ QUA')
        });
        // Tạo nút Đánh
        const playButton = this.add.text(
            screenWidth - 400,
            screenHeight - 170,
            'ĐÁNH BÀI',
            {
                fontSize: '16px',
                backgroundColor: '#3AB54A', // Màu nút
                padding: {
                    x: 10,
                    y: 10
                }
            }
        );
        playButton.setOrigin(0.5); // Đặt gốc của nút ở giữa

        // Thêm sự kiện cho nút ĐÁNH BÀI
        playButton.setInteractive();
        playButton.on('pointerdown', () => {
            console.log('ĐÁNH BÀI')
            let destroyList = [];
            let initialX = (screenWidth - (selectedCards.length * (cardWidth - cardSpacing) + cardSpacing)) / 2;
            for (let i = 0; i < selectedCards.length; i++) {
                console.log('Đánh' + selectedCards[i].frame.name)
                selectedCards[i].clearTint();
                // Đặt kích thước cho lá bài nhỏ lại
                selectedCards[i].setScale(cardWidth / selectedCards[i].width * 0.7, cardHeight / selectedCards[i].height * 0.7);
                selectedCards[i].y = screenHeight / 2; // Đặt lá bài vào giữa màn hình theo trục dọc
                // Đặt lá bài vào giữa màn hình theo trục 
                selectedCards[i].x = initialX + i * (cardWidth - (cardSpacing));
                this.children.bringToTop(selectedCards[i]);
                destroyList.push(selectedCards[i]);
                // selectedCards[i].destroy();
            }

            destroyList.forEach(card => {
                console.log(`Need Destroy: ${card.frame.name}`);
            })

            handCards.forEach(card => {
                console.log(card.frame.name)
            });

        });

        // Tạo nút Xếp Bài
        const sortButton = this.add.text(
            screenWidth - 200,
            screenHeight - 170,
            'XẾP BÀI',
            {
                fontSize: '16px',
                backgroundColor: '#9D0B0E', // Màu nút
                padding: {
                    x: 10,
                    y: 10
                }
            }
        );
        sortButton.setOrigin(0.5); // Đặt gốc của nút ở giữa
        sortButton.setInteractive();
        sortButton.on('pointerdown', () => {
            console.log('Xếp bài')
        });



        // Thêm nút vào scene
        this.add.existing(skipButton);
        this.add.existing(playButton);
        this.add.existing(sortButton);
    }
    update() {

    }

}

export default PlayGame
