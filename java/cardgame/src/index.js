import Phaser from 'phaser';
import { BootGame, PlayGame } from './scenes';
import WebSocket from './socket';

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
        scene: [BootGame, PlayGame],
        socket: {},
    }

    const socket = new WebSocket();

    const game = new Phaser.Game(gameConfig);
    

    window.focus();

}
window.onload = onDeviceReady
document.addEventListener('deviceready', onDeviceReady)