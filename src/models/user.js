const userModel = (sequelize, DataTypes) => sequelize.define('users', {
  name: { type: DataTypes.STRING, required: true, unique: true },
  email: { type: DataTypes.STRING, required: true },
  password: { type: DataTypes.STRING('user', 'writer', 'editor', 'admin'), required: true, defaultValue: 'user' },
  phoneNum: { type: DataTypes.STRING },
  zipCode: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING },
});

module.exports = userModel;
