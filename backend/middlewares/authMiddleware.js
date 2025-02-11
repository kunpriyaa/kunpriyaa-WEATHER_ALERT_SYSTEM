const jwt = require('jsonwebtoken');

exports.verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) return res.status(403).json({ message: 'ไม่อนุญาต' });

    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err || decoded.role !== 'admin') return res.status(403).json({ message: 'สิทธิ์ไม่เพียงพอ' });
        next();
    });
};
