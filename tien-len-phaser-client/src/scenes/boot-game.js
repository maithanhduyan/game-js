import Phaser from 'phaser'

import cardPng from '../assets/cards.png'
import cardJson from '../assets/cards.json'

class BootGame extends Phaser.Scene {
    constructor() {
        super('BootGame')
    }

    preload() {
        // Tải hình ảnh nền vào cache của Phaser
        this.load.atlas('cards', cardPng, cardJson);
    }

    create() {
        // TODO: Tạo chức năng loading cho game   

        // TODO: Tạo nút vào phòng chơi
        this.scene.start('PlayGame');

    }

    createStartGameButton() {
        // Tạo một nút hình vuông
        const squareButton = this.add.rectangle(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            200, // Chiều rộng của nút
            200, // Chiều cao của nút
            0xC31629 // Màu của nút 
        );

        // Đặt phản ứng cho nút khi nhấp vào
        squareButton.setInteractive();
        squareButton.on('pointerdown', () => {
            // Chuyển đến scene play-game
            this.scene.start('PlayGame');
        });

        // Thêm chữ "CHƠI NGAY" vào nút
        const buttonText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            'CHƠI NGAY',
            { fontSize: '24px', fill: '#fff', fontWeight: 'bold' }
        );
        buttonText.setOrigin(0.5, 0.5);
        // Thêm nút và chữ vào cùng một container để có thể căn giữa chúng
        const buttonContainer = this.add.container(0, 0);
        buttonContainer.add([squareButton, buttonText]);
    }
}

export default BootGame
