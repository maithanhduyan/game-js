import Deck from "./deck";


class Dealer {
    constructor(name) {
        this.name = name;
        this.deck = new Deck();
        this.shuffleDeck();
        this.players = [];
    }

    // Trộn bộ bài
    shuffleDeck() {
         // Logic để xáo bài (bạn có thể tự xây dựng hoặc sử dụng một thư viện xáo bài)
         const numCards = this.deck.cards.length;

         // Trường hợp đặc biệt: nếu chỉ có 1 lá bài hoặc không có lá bài nào, không cần trộn
         if (numCards <= 1) {
             return;
         }
 
         // Sử dụng thuật toán Fisher-Yates Shuffle
         for (let i = numCards - 1; i > 0; i--) {
             const j = Math.floor(Math.random() * (i + 1)); // Chọn một vị trí ngẫu nhiên từ i đến 0
             // Hoán đổi lá bài ở vị trí i và j
             const temp = this.deck.cards[i];
             this.deck.cards[i] = this.deck.cards[j];
             this.deck.cards[j] = temp;
         }
    }
}

export default Dealer;