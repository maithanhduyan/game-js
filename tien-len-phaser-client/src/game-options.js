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