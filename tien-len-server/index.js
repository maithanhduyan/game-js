const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const authenticateSocket = require('./middlewares/authen-socket-middleware')
const corsMiddleware = require('./middlewares/cors-middleware');
const initializeGameSocket = require('./socket/game-socket');
const PORT = process.env.PORT || 3000;

const app = express();


app.use(cors());
const server = http.createServer(app);
// const io = socketIo(server);

const io = socketIo(server, {
    cors: {
        origin: ['http://localhost:3001','*'],
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});


// Middleware cho CORS
app.use(corsMiddleware);

app.use(express.json());

// Routes
const webRoutes = require('./routes/web')
const apiRoutes = require('./routes/api');
app.use("/", webRoutes);
app.use("/api", apiRoutes);

// Middleware để tạo token xác thực client
io.use(authenticateSocket);

// Khởi tạo các yêu cầu Socket.io liên quan đến trò chơi
initializeGameSocket(io);

// Middleware để phân giải JSON
app.use(express.json());

// Khởi động máy chủ
server.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
});

