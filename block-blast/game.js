const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const blocksContainer = document.getElementById('blocks-container');
const rows = 8;
const cols = 8;
let blocks = [];
let score = 0;

function initGame() {
    // Initialize game board
    for (let row = 0; row < rows; row++) {
        blocks[row] = [];
        for (let col = 0; col < cols; col++) {
            const block = document.createElement('div');
            block.className = 'block';
            block.dataset.row = row;
            block.dataset.col = col;
            gameBoard.appendChild(block);
            blocks[row][col] = block;
        }
    }

    // Initialize draggable blocks
    for (let i = 0; i < blocksContainer.children.length; i++) {
        const block = blocksContainer.children[i];
        block.style.backgroundColor = getRandomColor();
        block.innerText = getRandomInt(1, 3);
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    const colors = ['#4CAF50', '#FF5722', '#FFC107'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Event listeners for dragging blocks
blocksContainer.addEventListener('dragstart', function (event) {
    event.target.style.opacity = '0.5';
    event.dataTransfer.setData('text', event.target.innerText);
});

blocksContainer.addEventListener('dragend', function (event) {
    event.target.style.opacity = '1';
});

gameBoard.addEventListener('dragover', function (event) {
    event.preventDefault();
});

gameBoard.addEventListener('drop', function (event) {
    event.preventDefault();
    const block = event.target;
    if (block.className.includes('block')) {
        const value = event.dataTransfer.getData('text');
        block.innerText = value;
        block.style.backgroundColor = getRandomColor();
        block.classList.remove('hidden');
        score += parseInt(value);
        scoreElement.innerText = score;
    }
});

initGame();
