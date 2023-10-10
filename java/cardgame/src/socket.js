class Websocket{
    constructor(){
        if(Websocket.instance = this){
            return Websocket.instance;
        }
        // Khởi tạo WebSocket ở đây
        this.socket = new WebSocket('ws://' + 'localhost:8080/WebsocketHome/websocket/cardgame');

        Websocket.instance = this;
        return this;
    }
}
// Sử dụng singleton WebSocket
export default Websocket