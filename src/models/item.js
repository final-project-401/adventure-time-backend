


const itemModel = (sequelize, DataTypes) => sequelize.define('items', {
  name: { type: DataTypes.STRING, required: true },
  quantity: { type: DataTypes.INTEGER },

});

module.exports = itemModel;
