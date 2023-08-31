module.exports = function (app) {

    app.get('/healthcheck', (req, res) => {
        // Kiểm tra trạng thái của ứng dụng ở đây
        const isHealthy = true; // Đây là ví dụ, bạn có thể thay đổi giá trị này dựa trên kiểm tra thực tế

        if (isHealthy) {
            res.status(200).send('Healthy: OK');
        } else {
            res.status(500).send('Unhealthy');
        }
    });
}