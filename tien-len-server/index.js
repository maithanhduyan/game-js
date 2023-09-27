const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const User = require('./models/user');
const path = require('path');
const bodyParser = require('body-parser');
const { Deck } = require('./models/deck');
const cors = require('cors');
const PORT = process.env.PORT ||3000;

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: ['http://localhost:3001'], // http://localhost:3001
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

// Middleware cho CORS
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://0.0.0.0:3001'); // Cho phép truy cập từ domain này
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });

//
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client.html'));
});

// Đối tượng lưu trữ thông tin về các phòng chơi
const rooms = {};

// Create desk
const deck = new Deck();
const maxNumPlayers = 4;
const numCardsPerPlayer = 13;
const playerHands = deck.dealToPlayers(maxNumPlayers, numCardsPerPlayer);

console.log("player hands: ");
for (let i = 0; i < maxNumPlayers; i++) {
    console.log(`Player ${i + 1}: ${playerHands[i].join(", ")}`);
}
// Middleware để phân giải JSON
app.use(express.json());

// API endpoint để tạo phòng chơi mới
const roomId = generateRoomId();
app.post('/create-room', (req, res) => {
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

// Socket.io 
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Gửi danh sách phòng cho client
    socket.emit('roomList', Object.keys(rooms));

    // Khi một người chơi tham gia vào phòng
    socket.on('joinRoom', (roomName, playerName) => {
        socket.join('Socket id: '+socket.id + '/ Room: ' + roomName);
        socket.join(playerName);
        console.log('Room name: ' + roomName);
        // Lưu thông tin người chơi trong phòng
        if (!rooms[roomName]) {
            rooms[roomName] = [];
        }
        if(rooms[roomName].length > maxNumPlayers ){
            socket.on('chat message', msg => {
                msg = 'Phòng đã đủ 4 người chơi.'
                console.log('' + msg);
                io.emit('chat message', msg);
            });
        }else{
            rooms[roomName].push({ id: socket.id, name: playerName });
        }

        // Gửi thông báo cho tất cả người chơi trong phòng
        io.to(roomName).emit('playerJoined', rooms[roomName]);

        // Gửi danh sách phòng cho tất cả người chơi
        io.emit('roomList', Object.keys(rooms));
    });

    // Chia bài cho người chơi
    socket.on('deal', (roonName, playerName, playerHands) => {

    })

    // Khi một người chơi rời phòng
    socket.on('leaveRoom', (roomName) => {
        socket.leave(roomName);

        // Xóa người chơi ra khỏi danh sách
        rooms[roomName] = rooms[roomName].filter(player => player.id !== socket.id);
        console.log('Người chơi rời khỏi phòng');
        // Gửi thông báo cho tất cả người chơi trong phòng
        io.to(roomName).emit('playerLeft', rooms[roomName],);

        // Nếu không còn người chơi trong phòng, xóa phòng
        if (rooms[roomName].length === 0) {
            delete rooms[roomName];
            io.emit('roomList', Object.keys(rooms));
        }
    });

    socket.on('chat message', msg => {
        console.log('' + msg);
        io.emit('chat message', msg);
    });

    // Khi một người chơi ngắt kết nối
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
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
