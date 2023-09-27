const io = require("socket.io-client");

const socket = io('http://localhost:3000', {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "game client"
    }
});
export default socket 