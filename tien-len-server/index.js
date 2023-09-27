const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const User = require('./models/user');
const Deck = require('./models/deck');
const cors = require('cors');
const { log } = require('console');
const jwt = require('jsonwebtoken');
const authenticateSocket = require('./midllewares/authen-socket')
const initializeGameSocket = require('./socket/game-socket');
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
app.use(express.json());

const webRoutes = require('./routes/web')
const apiRoutes = require('./routes/api');
app.use("/", webRoutes);
app.use("/api", apiRoutes);

io.use(authenticateSocket);

const maxNumPlayers = 4;
// Đối tượng lưu trữ thông tin về các phòng chơi
const rooms = {};
// Khởi tạo các yêu cầu Socket.io liên quan đến trò chơi
initializeGameSocket(io, rooms, maxNumPlayers);

// Create desk
const deck = new Deck();

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



// Hàm tạo mã phòng ngẫu nhiên với 7 số nguyên
function generateRoomId() {
    return Math.floor(1000000 + Math.random() * 9000000);
}



// Khởi động máy chủ
server.listen(PORT, () => {
    console.log(`Server đang lắng nghe tại cổng ${PORT}`);
});


