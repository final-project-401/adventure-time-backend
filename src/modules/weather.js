'use strict';

const axios = require('axios');

let cache = {};

class Forecast {
  constructor(cityObj) {
    this.date = cityObj.datetime;
    this.description = cityObj.weather.description;
    this.low_temp = cityObj.low_temp;
    this.high_temp = cityObj.high_temp;
    this.precip = cityObj.precip;
    this.snow = cityObj.snow;
    this.icon = cityObj.weather.icon;
    this.iconPath = `https://cdn.weatherbit.io/static/img/icons/${cityObj.weather.icon}.png`;
    this.feelsLike = cityObj.app_temp;
    this.temp = cityObj.temp;
  }
}

async function getWeather(req, res, next) {
  try {
    let postalCode = req.query.postal_code;
    let searchQuery = req.query.searchQuery;
    let key = `postalCode: ${postalCode} - weather`;

    if (cache[key] && (Date.now() - cache[key].timestamp) < 8.64e+7) {
      console.log('Cache was hit!', cache);
      res.status(200).send(cache[key].data);

    } else {
      console.log('Cache was missed!');
      let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&postal_code=37042`;

      let foundCity = await axios.get(url);

      console.log('postalCode', postalCode, 'searchQuery', searchQuery);
      let dataToSend = foundCity.data.data.map(newWeather => new Forecast(newWeather));

      cache[key] = {
        data: dataToSend,
        timestamp: Date.now(),
      };

      res.status(200).send(dataToSend);
    }

  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getWeather,
};
