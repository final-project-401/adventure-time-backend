

const eventModel = (sequelize, DataTypes) => sequelize.define('Events', {
  name: { type: DataTypes.STRING },
  desc: { type: DataTypes.STRING },
  date: { type: DataTypes.INTEGER },
  travelBuddies: { type: DataTypes.STRING },
  time: { type: DataTypes.STRING },
  packingList: { type: DataTypes.STRING },
  userId: { type: DataTypes.STRING },
});


module.exports = eventModel;
