const eventModel = (sequelize, DataTypes) => sequelize.define('events', {
  name: { type: DataTypes.STRING },
  desc: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
  travelBuddies: { type: DataTypes.ARRAY(DataTypes.STRING) },
  time: { type: DataTypes.TIME },
  userId: { type: DataTypes.INTEGER, allowNull: false },

});

module.exports = eventModel;
