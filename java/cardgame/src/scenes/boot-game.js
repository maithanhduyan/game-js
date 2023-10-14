import cardPng from '../assets/cards.png'
import cardJson from '../assets/cards.json'


class BootGame extends Phaser.Scene {
    constructor() {
        super({ key: 'BootGame' });
        this.deck = null;
    }

    preload() {
        // Tải hình ảnh nền vào cache của Phaser
        this.load.atlas('cards', cardPng, cardJson);
    }

    create() {
        this.scene.start('PlayGame');
    }

    update() { }
}

export default BootGame