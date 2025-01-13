const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('./index');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;
