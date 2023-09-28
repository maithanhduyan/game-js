
// Web CORS
const corsAllowMultiDomain = (req, res, next) => {
    // Response Headers
    // Cho phép truy cập từ domain này
    res.header('Access-Control-Allow-Origin', process.env.Access_Control_Allow_Origin || '*'); 
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('X-Powered-By', 'Tien-Len-Game-Server');
    next();
}
module.exports = corsAllowMultiDomain;