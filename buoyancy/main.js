// Abstract class Shape
class Shape {
    constructor(canvas, context, x, y) {
        if (new.target === Shape) {
            throw new Error("Cannot instantiate abstract class Shape.");
        }

        this.canvas = canvas;
        this.ctx = context;
        this.position = {
            x,
            y
        };
    }

    // Abstract method draw()
    draw() {
        throw new Error("Method draw() must be implemented.");
    }

    // Method update()
    update() {
        // Implement the update logic in the subclasses
        throw new Error("Method update() must be implemented.");
    }
}

// Example subclass Rectangle
class Rectangle extends Shape {
    constructor(canvas, context, x, y, width, height) {
        super(canvas, context, x, y);
        this.width = width;
        this.height = height;
    }

    draw() {
        this.ctx.fillStyle = "while";
        this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        this.ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {}
}

/// Example subclass Ball
class Ball extends Shape {
    constructor(canvas, context, x, y, radius) {
        super(canvas, context, x, y);
        this.radius = radius;
        this.velocity = {
            x: 0,
            y: 0
        };
    }

    draw() {
        // Vẽ quả bóng
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.stroke();

    }

    update() {
        // Áp dụng gia tốc rơi tự do
        const gravity = 0.5; // Gia tốc rơi tự do
        this.velocity.y += gravity;

        // Cập nhật vị trí dựa trên vận tốc
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Kiểm tra va chạm với cạnh dưới của canvas
        if (this.position.y + this.radius > canvas.height) {
            this.position.y = canvas.height - this.radius; // Đặt vị trí của quả bóng ngay trên cạnh dưới
            this.velocity.y *= -0.8; // Giảm vận tốc theo chiều dọc khi va chạm
        }

        // Kiểm tra va chạm với cạnh trên của canvas
        if (this.position.y - this.radius < 0) {
            this.position.y = this.radius; // Đặt vị trí của quả bóng ngay trên cạnh trên
            this.velocity.y *= -0.8; // Giảm vận tốc theo chiều dọc khi va chạm
        }

        // Kiểm tra va chạm với cạnh phải của canvas
        if (this.position.x + this.radius > canvas.width) {
            this.position.x = canvas.width - this.radius; // Đặt vị trí của quả bóng ngay bên phải cạnh phải
            this.velocity.x *= -0.8; // Giảm vận tốc theo chiều ngang khi va chạm
        }

        // Kiểm tra va chạm với cạnh trái của canvas
        if (this.position.x - this.radius < 0) {
            this.position.x = this.radius; // Đặt vị trí của quả bóng ngay bên trái cạnh trái
            this.velocity.x *= -0.8; // Giảm vận tốc theo chiều ngang khi va chạm
        }

    }
}



// Main
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Khởi tạo các thông số
canvas.width = 800;
canvas.height = 600;
const cX = canvas.width / 2;
const cY = canvas.height / 2;


const ball = new Ball(canvas, ctx, cX, cY, 9);

function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball.draw();
    ball.update();

    // Request next frame
    requestAnimationFrame(animate);
}

animate();