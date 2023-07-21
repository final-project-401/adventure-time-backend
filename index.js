'use strict';

require('dotenv').config();
const { db } = require('./src/models');
const server = require('./src/server');
const PORT = process.env.PORT || 5001;

db.sync()
  .then(() => {
    server.start(PORT);
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
