const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models/db');

exports.registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
        }

        const checkUserQuery = 'SELECT * FROM admins WHERE username = ?';
        db.query(checkUserQuery, [username], async (err, result) => {
            if (err) return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการตรวจสอบบัญชี' });
            if (result.length > 0) return res.status(400).json({ message: 'ชื่อผู้ใช้ถูกใช้งานแล้ว' });

            const hashedPassword = await bcrypt.hash(password, 10);
            const insertQuery = 'INSERT INTO admins (username, password) VALUES (?, ?)';
            db.query(insertQuery, [username, hashedPassword], (err, result) => {
                if (err) return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสมัคร' });
                res.status(201).json({ message: 'สมัครแอดมินสำเร็จ' });
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error });
    }
};

exports.adminLogin = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'กรุณาป้อนชื่อผู้ใช้และรหัสผ่าน' });
    }

    const query = 'SELECT * FROM admins WHERE username = ?';
    db.query(query, [username], async (err, result) => {
        if (err) return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการตรวจสอบบัญชี' });
        if (result.length === 0) return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });

        const admin = result[0];
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });

        const token = jwt.sign(
            { id: admin.id, username: admin.username, role: 'admin' },
            'secret_key',
            { expiresIn: '1h' }
        );

        res.json({ token, message: 'เข้าสู่ระบบสำเร็จ' });
    });
};
