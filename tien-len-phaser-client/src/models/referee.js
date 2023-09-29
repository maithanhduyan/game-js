
const maxPlayerInRoom = 4;
class Referee {
    constructor(name) {
        this.name = name;
        this.players = [];
        this.newRound = true;
        this.checkspades3 = false;
    }
    // Kiểm tra xem lá bài có thể được đánh hay không
    static isValidPlay(cardToPlay, lastPlayedCard) {
        // Kiểm tra các luật chơi, ví dụ: cùng giá trị hoặc cùng loại bài
        // Trả về true nếu hợp lệ, false nếu không hợp lệ
    }

    addPlayer(player) {
        if (this.players.length < maxPlayerInRoom) {
            this.players.push(player);
        } else {
            console.log('Room full.')
        }
    }

    checkPermission() {
        // Kiểm tra có 3 Bích (spades3)
        for (let i = 0; i < this.players.length; i++) {
            console.log(this.players[i]);
            for (let j = 0; j < this.players[i].handCards.length; j++) {
                if (this.players[i].handCards[j].name === 'spades3') {
                    this.checkspades3 = true; // đã kiểm tra spades3 ko kiểm nữa
                    const player = i + 1;
                    console.log(`bot ${player} có spades3.`);
                    return player;
                    // break;
                }
            }
        }
    }

    checkSpades3() {
        // Kiểm tra có 3 Bích (spades3)
        for (let i = 0; i < this.players.length; i++) {
            console.log(this.players[i]);
            for (let j = 0; j < this.players[i].handCards.length; j++) {
                if (this.players[i].handCards[j].name === 'spades3') {
                    this.checkspades3 = true; // đã kiểm tra spades3 ko kiểm nữa
                    const player = i + 1;
                    console.log(`bot ${player} có spades3.`);
                    return player;
                    // break;
                }
            }
        }
    }

    checkRules() {
        //TODO Luật chơi
        // Định nghĩa:
        // Lẻ: 1 lá bài lớn nhỏ dựa vào rank
        // Đôi: 2 lá có rank giống nhau so sánh dựa vào rank lớn nhất
        // Tam Cô: 3 lá có rank giống nhau so sánh dựa vào rank lớn nhất
        // Sảnh: các lá có thứ tự liền nhau từ 3 lá trở lên
        // Tứ Quý: 4 lá giống nhau có thể chặt con 2
        // Ba Đôi thông: các đôi thứ tự liền nhau. Đôi 3, Đôi4, Đôi5
        // Tứ Quý 2: Nếu có 4 con 2 thì tới trắng.
        //

        // Nếu là vòng mới
        // 1. Kiểm tra ai có con 3Bích(spades3) thì trao quyền cho player đó đi trước
        // 2. Kiểm tra có tới trắng (6 Đôi, 4 con 2)
        // 3. Kiểm tra người đi trước đánh 3Bích(spades3) có hay không?
        // 3.1 Nếu có thì kiểm tra đánh 3Bích(spades3) Lẻ, Đôi, Tam Cô, Sảnh, Tứ Quý
        // 4. Kiểm tra hết bài(Thắng) hay không? Nếu không qua bước 4
        // 4. Trao quyền cho người chơi tiếp.

        // Nếu là vòng cũ
        // 1. Người thắng sẽ đi trước
        // 2. Kiểm tra có tới trắng (6 Đôi, 4 con 2)
        // 
    }
}
export default Referee;