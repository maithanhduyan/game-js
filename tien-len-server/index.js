const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { User } = require('./models');
const { Deck } = require('./models/deck');
const cors = require('cors');
const { log } = require('console');
const PORT = process.env.PORT || 3000;

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
const secretKey = 'your-secret-key';
app.use(express.json());


// 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Xác thực người chơi và tạo token JWT
app.post('/login', (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ error: 'Vui lòng cung cấp tên người chơi.' });
    }

    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    log(`Cấp Token ${token} cho người dùng trong thời hạn 1H`)
    res.json({ token });
});

// Middleware để xác thực token cho các yêu cầu Socket.io
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        log('Không tìm thấy token.');
        return next(new Error('Không tìm thấy token.'));
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            log('Token không hợp lệ.');
            return next(new Error('Token không hợp lệ.'));
        }

        // Lưu thông tin người chơi vào đối tượng socket để sử dụng sau này
        socket.username = decoded.username;
        log('Lưu thông tin người chơi');
        next();
    });
});

// Đối tượng lưu trữ thông tin về các phòng chơi
const rooms = {};

// Create desk
const deck = new Deck();
const maxNumPlayers = 4;
const numCardsPerPlayer = 13;
const playerHands = deck.dealToPlayers(maxNumPlayers, numCardsPerPlayer);

// console.log("player hands: ");
// for (let i = 0; i < maxNumPlayers; i++) {
//     console.log(`Player ${i + 1}: ${playerHands[i].join(", ")}`);
// }

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
    socket.on('authentication', (token) => {
        log('Authentication Token: ' + token);
        // Kiểm tra token ở đây và xác thực client
        // Nếu token hợp lệ, cho phép client tham gia vào phòng chơi hoặc thực hiện các hoạt động khác
        // Nếu không hợp lệ, có thể ngắt kết nối hoặc thực hiện xử lý khác
    });
    console.log(`Client connected: ${socket.id}`);

    // Gửi danh sách phòng cho client
    socket.emit('roomList', Object.keys(rooms));

    // Khi một người chơi tham gia vào phòng
    socket.on('joinRoom', (roomName, playerName) => {
        socket.join('Socket id: ' + socket.id + '/ Room: ' + roomName);
        socket.join(playerName);
        console.log('Room name: ' + roomName);
        // Lưu thông tin người chơi trong phòng
        if (!rooms[roomName]) {
            rooms[roomName] = [];
        }
        if (rooms[roomName].length > maxNumPlayers) {
            socket.on('chat message', msg => {
                msg = 'Phòng đã đủ 4 người chơi.'
                console.log('' + msg);
                io.emit('chat message', msg);
            });
        } else {
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

// Hàm tạo mã phòng ngẫu nhiên với 7 số nguyên
function generateRoomId() {
    return Math.floor(1000000 + Math.random() * 9000000);
}

// Chia bài cho người chơi
function dealCards() {
    // Logic chia bài ở đây
    // Ví dụ: Tạo một mảng các lá bài ngẫu nhiên và chia cho người chơi
}

// Khởi động máy chủ
server.listen(PORT, () => {
    console.log(`Server đang lắng nghe tại cổng ${PORT}`);
});


