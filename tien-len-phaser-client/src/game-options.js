export default {
    screenSize: {
        width: 800,
        height: 800
    },
}

export const cardOptions = {
    // card width, in pixels
    cardWidth: 123,
    // card height, in pixels
    cardHeight: 162,
    // card scale. 1 = original size, 0.5 half size and so on
    cardScale: 0.5
}

const LEFT = 0
const RIGHT = 1
const UP = 2
const DOWN = 3

export const directions = {
    DOWN,
    LEFT,
    RIGHT,
    UP
}

export const gameRules = {
    cardNum: 13,
    MaxUsers: 4,
}

export const cardOrder = ['spades3', 'clubs3', 'diamonds3', 'hearts3', 'spades4', 'clubs4', 'diamonds4', 'hearts4', 'spades5', 'clubs5', 'diamonds5', 'hearts5', 'spades6', 'clubs6', 'diamonds6', 'hearts6', 'spades7', 'clubs7', 'diamonds7', 'hearts7', 'spades8', 'clubs8', 'diamonds8', 'hearts8', 'spades9', 'clubs9', 'diamonds9', 'hearts9', 'spades10', 'clubs10', 'diamonds10', 'hearts10', 'spadesJack', 'clubsJack', 'diamondsJack', 'heartsJack', 'spadesQueen', 'clubsQueen', 'diamondsQueen', 'heartsQueen', 'spadesKing', 'clubsKing', 'diamondsKing', 'heartsKing', 'spadesAce', 'clubsAce', 'diamondsAce', 'heartsAce', 'spades2', 'clubs2', 'diamonds2', 'hearts2'];