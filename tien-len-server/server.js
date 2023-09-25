const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const User = require('./models/user_model');
const bodyParser = require('body-parser');
const { Deck } = require('./models/deck'); // Import Deck from desk.js
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Đối tượng lưu trữ thông tin về các phòng chơi
const rooms = {};

// Create desk
const deck = new Deck();
const numPlayers = 4;
const numCardsPerPlayer = 13;
const playerHands = deck.dealToPlayers(numPlayers, numCardsPerPlayer);

console.log("player hands: ");
for (let i = 0; i < numPlayers; i++) {
    console.log(`Player ${i + 1}: ${playerHands[i].join(", ")}`);
}
// Middleware để phân giải JSON
app.use(express.json());

// API endpoint để tạo phòng chơi mới
app.post('/create-room', (req, res) => {
    const roomId = generateRoomId();
    rooms[roomId] = { players: [], gameData: {} };
    res.json({ roomId });
});

// API endpoint để tham gia phòng chơi
app.post('/join-room/:roomId', (req, res) => {
    const { roomId } = req.params;
    const { playerName } = req.body;

    if (!rooms[roomId]) {
        return res.status(404).json({ error: 'Phòng chơi không tồn tại.' });
    }

    if (rooms[roomId].players.length >= 4) {
        return res.status(400).json({ error: 'Phòng chơi đã đủ 4 người chơi.' });
    }

    rooms[roomId].players.push(playerName);
    res.json({ success: true });
});



// Rest API
app.get('/users', (req, res) => {
    User.getAllUsers((err, users) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ users });
    });
});

app.post('/users', (req, res) => {
    const { username } = req.body;
    if (!username) {
        res.status(400).json({ error: 'Username is required' });
        return;
    }

    User.findUserByUsername(username, (err, user) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        if (user) {
            res.status(400).json({ error: 'Username already exists' });
            return;
        }

        const newUser = new User(username);
        newUser.save((err) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ message: 'User created successfully' });
        });
    });
});

// Khởi động máy chủ
server.listen(PORT, () => {
    console.log(`Server đang lắng nghe tại cổng ${PORT}`);
});

// Hàm tạo mã phòng ngẫu nhiên với 7 số nguyên
function generateRoomId() {
    return Math.floor(1000000 + Math.random() * 9000000);
}
