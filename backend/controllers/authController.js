const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.adminLogin = (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
        const token = jwt.sign({ role: 'admin' }, 'secret_key', { expiresIn: '1h' });
        return res.json({ token });
    }
    res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
};
