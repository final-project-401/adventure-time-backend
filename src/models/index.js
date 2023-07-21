const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const userModel = require('./user');
const eventModel = require('./events');
const Collection = require('./collection');
const itemModel = require('./item');

const DB_URL = process.env.DATABASE_URL || 'sqlite::memory:';

const sequelize = new Sequelize(DB_URL);

const user = userModel(sequelize, DataTypes);
const event = eventModel(sequelize, DataTypes);
const item = itemModel(sequelize, DataTypes);

user.hasMany(event);
event.belongsTo(user);
event.hasMany(item);
item.belongsTo(event);

module.exports = {
  db: sequelize,
  User: new Collection(user),
  Event: new Collection(event),
  Item: new Collection(item),
};
