import Phaser from 'phaser';
import { BootGame, PlayGame } from './scenes';
import { directions, gameRules, cardOptions } from './game-options';

let gameSreenWidth, gameSreenHeight;

function onDeviceReady() {
    gameSreenWidth = window.innerWidth
    gameSreenHeight = window.innerHeight

    const gameConfig = {
        backgroundColor: '0x5C0321',
        scale: {
            autoCenter: Phaser.Scale.CENTER_BOTH,
            mode: Phaser.Scale.FIT,
            parent: 'thegame',
            width: gameSreenWidth,
            height: gameSreenHeight,
        },
        scene: [BootGame, PlayGame]
    }

    const game = new Phaser.Game(gameConfig);
    window.focus();

    console.log('Kết nối websocket');
    const socket = new WebSocket('ws://localhost:3000');
}

window.onload = onDeviceReady
document.addEventListener('deviceready', onDeviceReady)