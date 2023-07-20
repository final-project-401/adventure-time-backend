const express = require('express');
const cors = require('cors');
const listRoutes = require('./routes/packingList');
const plannerRoutes = require('./routes/planner');
const userRoutes = require('./routes/users');
const app = express();

app.use(cors());
app.use(express.json());

// app.use('/test', (req, res, next) => {
//   console.log('this works');
//   res.send('Success');

// });

app.use(userRoutes);
app.use(listRoutes);
app.use(plannerRoutes);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
