const userModel = (sequelize, DataTypes) => sequelize.define('users', {
  email: { type: DataTypes.STRING, required: true },
  auth0UserId: { type: DataTypes.STRING(1000), allowNull: true }, // Field to store the Auth0 user ID
  accessToken: { type: DataTypes.STRING(2000), allowNull: true }, // Field to temporarily store the access token
});

module.exports = userModel;
