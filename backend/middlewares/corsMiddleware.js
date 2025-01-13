const cors = require('cors');

const corsMiddleware = cors({
    origin: 'http://localhost:3001', // ใส่ URL ของ frontend ของคุณ
});

module.exports = corsMiddleware;
