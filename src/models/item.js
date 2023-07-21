const itemModel = (sequelize, DataTypes) => sequelize.define('items', {
  name: { type: DataTypes.STRING, required: true },
  quantity: { type: DataTypes.INTEGER },
  eventId: { type: DataTypes.INTEGER, allowNull: false },

});

module.exports = itemModel;
