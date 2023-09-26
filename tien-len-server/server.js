const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const User = require('./models/user_model');
const bodyParser = require('body-parser');
const { Deck } = require('./models/deck'); // Import Deck from desk.js
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const io = socketIo(server);

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

// Hàm xử lý khi một người chơi kết nối với WebSocket
io.on('connection', (socket) => {
    console.log('Người chơi đã kết nối với WebSocket');

    // Xử lý sự kiện khi một người chơi gia nhập phòng
    socket.on('joinRoom', (roomId, playerName) => {
        // Kiểm tra xem phòng chơi có tồn tại hay không
        if (!rooms[roomId]) {
            socket.emit('joinRoomError', 'Phòng chơi không tồn tại.');
            return;
        }

        // Kiểm tra xem phòng chơi đã đủ người chơi hay chưa
        if (rooms[roomId].players.length >= 4) {
            socket.emit('joinRoomError', 'Phòng chơi đã đủ 4 người chơi.');
            return;
        }

        // Thêm người chơi vào phòng
        rooms[roomId].players.push(playerName);

        // Thông báo cho tất cả người chơi trong phòng về sự gia nhập
        socket.join(roomId);
        io.to(roomId).emit('playerJoined', playerName);
    });

    // Xử lý sự kiện khi một người chơi đánh bài, bạn có thể thêm sự kiện này tùy theo trò chơi
    socket.on('playCard', (roomId, playerName, card) => {
        // Xử lý logic đánh bài
        // Gửi thông báo về việc đánh bài cho tất cả người chơi trong phòng
        io.to(roomId).emit('cardPlayed', playerName, card);
    });

    // Xử lý sự kiện khi một người chơi thoát phòng
    socket.on('leaveRoom', (roomId, playerName) => {
        // Xử lý logic khi người chơi rời phòng
        // Gửi thông báo về việc rời phòng cho tất cả người chơi trong phòng
        io.to(roomId).emit('playerLeft', playerName);
    });

    // Xử lý sự kiện khi một người chơi ngắt kết nối
    socket.on('disconnect', () => {
        console.log('Người chơi đã ngắt kết nối');
        // Xử lý logic khi người chơi ngắt kết nối
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
