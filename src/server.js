const express = require('express');
const cors = require('cors');
const listRoutes = require('./routes/packingList');
const plannerRoutes = require('./routes/planner');
const userRoutes = require('./routes/users');
const { getWeather } = require('./modules/weather');
const { getReviews, getActivities, getLodging } = require('./modules/yelp');
const { sendEmail } = require('./modules/email');
// const { getGrouponDeals } = require('./modules/groupon');
const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(listRoutes);
app.use(plannerRoutes);

app.get('/email', sendEmail);

app.get('/', (req, res) => {
  res.status(200).send('Hello');
});

app.get('/forecast', (req, res) => {
  getWeather(req, res).catch(error => console.error(error));
});

app.get('/food', (req, res) => {
  getReviews(req, res).catch(error => console.error(error));
});
app.get('/rest', (req, res) => {
  getLodging(req, res).catch(error => console.error(error));
});
app.get('/play', (req, res) => {
  getActivities(req, res).catch(error => console.error(error));
});

// app.get('/deals', (req, res) => {
//   getGrouponDeals(req, res).catch(error => console.error(error));
// });

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
