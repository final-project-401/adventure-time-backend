const userModel = (sequelize, DataTypes) => sequelize.define('users', {
  email: { type: DataTypes.STRING, required: true },
});

module.exports = userModel;
