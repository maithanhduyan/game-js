import Phaser from 'phaser';
import { BootGame, PlayGame } from './scenes';
import { directions, gameRules, cardOptions } from './game-options';
import socket from './sockets/send_msg' 

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
    }

    const game = new Phaser.Game(gameConfig);
    window.focus();
    // socket.emit('chat message','Index Connected.')

}
window.onload = onDeviceReady
document.addEventListener('deviceready', onDeviceReady)