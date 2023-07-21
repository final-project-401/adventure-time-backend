const eventModel = (sequelize, DataTypes) => sequelize.define('events', {
  name: { type: DataTypes.STRING },
  desc: { type: DataTypes.STRING },
  date: { type: DataTypes.INTEGER },
  travelBuddies: { type: DataTypes.STRING },
  time: { type: DataTypes.STRING },
  userId: { type: DataTypes.INTEGER, allowNull: false },

});

module.exports = eventModel;
