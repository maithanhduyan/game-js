
const maxPlayerInRoom = 4;
class Referee {
    constructor(name) {
        this.name = name;
        this.players = [];
        this.newRound = true;
        this.checkspades3Flag = false;
        this.init();
    }

    init() {

    }

    // Kiểm tra xem lá bài có thể được đánh hay không
    static isValidPlay() {
        // Kiểm tra các luật chơi, ví dụ: cùng giá trị hoặc cùng loại bài
        // Trả về true nếu hợp lệ, false nếu không hợp lệ
    }

    isNewRound() {
        return this.newRound;
    }

    addPlayer(player) {
        if (this.players.length < maxPlayerInRoom) {
            this.players.push(player);
        } else {
            console.log('Room full.')
        }
    }

    checkPermission() {
        // Nếu là bàn mới
        if (this.isNewRound) {
            // Kiểm tra ai có 3 bích đi trước
            this.checkedSpades3();

        } else {
            // Bàn tiếp theo
            // Lấy thông tin người thắng của bàn trước
            console.log(`Ai Thắng đi trước`);
        }
    }



    checkedSpades3() {
        // Kiểm tra có 3 Bích (spades3)
        if (!this.checkspades3Flag) {
            for (let i = 0; i < this.players.length; i++) {
                // console.log(this.players[i]);
                for (let j = 0; j < this.players[i].handCards.length; j++) {
                    if (this.players[i].handCards[j].name === 'spades3') {
                        this.checkspades3Flag = true; // nếu đã kiểm tra spades3 ko kiểm nữa

                        // console.log(`${this.name}: ${this.players[i].name} có spades3.`);
                        // trao quyền cho player có spades3
                        this.players[i].setPermission(true);
                        console.log(`${this.players[i].name}: đi trước`);
                        this.newRound = false;
                        break;
                    }
                }
            }
        }

    }

    checkRules() {
        // Bộ bài gồm có
        // Chất bài
        // const suits = ['spades', 'clubs', 'diamonds', 'hearts'];
        // Thứ tự
        // const ranks = ['3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace', '2'];
        // Thứ tự và chất từ nhỏ đến lớn
        // const cardOrder = ['spades3', 'clubs3', 'diamonds3', 'hearts3', 'spades4', 'clubs4', 'diamonds4', 'hearts4', 'spades5', 'clubs5', 'diamonds5', 'hearts5', 'spades6', 'clubs6', 'diamonds6', 'hearts6', 'spades7', 'clubs7', 'diamonds7', 'hearts7', 'spades8', 'clubs8', 'diamonds8', 'hearts8', 'spades9', 'clubs9', 'diamonds9', 'hearts9', 'spades10', 'clubs10', 'diamonds10', 'hearts10', 'spadesJack', 'clubsJack', 'diamondsJack', 'heartsJack', 'spadesQueen', 'clubsQueen', 'diamondsQueen', 'heartsQueen', 'spadesKing', 'clubsKing', 'diamondsKing', 'heartsKing', 'spadesAce', 'clubsAce', 'diamondsAce', 'heartsAce', 'spades2', 'clubs2', 'diamonds2', 'hearts2'];

        //TODO Luật chơi
        // Bắt đầu chơi
        // Chia bài cho người chơi.
        // Tối thiểu 2 người
        // Tối đa 4 người
        // Mỗi người 13 lá bài

        // Định nghĩa các nước đi:
        // Lẻ: 1 lá bài lớn nhỏ dựa vào rank 
        // Đôi: 2 lá có rank giống nhau so sánh dựa vào rank lớn nhất
        // Tam Cô: 3 lá có rank giống nhau so sánh dựa vào rank lớn nhất
        // Sảnh: các lá có thứ tự liền nhau từ 3 lá trở lên
        // Ba Đôi thông: các đôi thứ tự liền nhau. Đôi 3, Đôi4, Đôi5
        // Tứ Quý: 4 lá giống nhau. Tất cả tứ quý đều lớn hơn con 2.
        // Tứ Quý 2: Có 4 lá rank là 2. Nếu có 4 con 2 thì tới trắng.
        // Tới Trắng: Nếu có tứ quý 2 và 6 đôi thì tới trắng.

        // GIAI ĐOẠN A: Nếu là vòng mới
        // 1. Kiểm tra ai có con 3 Bích(spades3) thì trao quyền cho player đó đi trước
        // 2. Kiểm tra có tới trắng (6 Đôi, 4 con 2)
        // 3. Kiểm tra người đi trước đánh 3 Bích(spades3) có hay không?
        // 4. Trao quyền cho người chơi tiếp.

        // GIAI ĐOẠN B: Nếu là vòng cũ
        // 1. Kiểm tra có tới trắng (6 Đôi, 4 con 2)
        // 2. Người thắng sẽ đi trước

        // GIAI ĐOẠN C: Bắt đầu chơi theo nước
        // 1. Người đi sau sẽ đi theo nước của người đi trước.
        // 2. Người đi sau nếu không có nước đi cao hơn thì sẽ bỏ qua.
        // 3. Nếu tất cả người chơi bỏ qua thì người đó sẽ đi tiếp.
        // 4. Kiểm tra ai hết bài trước thì thắng.
    }
}
export default Referee;