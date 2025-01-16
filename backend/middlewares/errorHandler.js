const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'SequelizeAccessDeniedError') {
      res.status(403).json({ message: 'การเชื่อมต่อฐานข้อมูลถูกปฏิเสธ' });
  } else if (err.name === 'ValidationError') {
      res.status(400).json({ message: 'ข้อมูลไม่ถูกต้อง' });
  } else {
      
      res.status(500).json({ message: 'เกิดข้อผิดพลาดภายในระบบ' });
  }
};

module.exports = errorHandler;

  