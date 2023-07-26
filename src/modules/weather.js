'use strict';

const axios = require('axios');

let cache = {};

class Forecast {
  constructor(cityObj) {
    this.city = cityObj.city_name;
    this.date = cityObj.datetime;
    this.description = cityObj.weather.description;
    this.low_temp = cityObj.low_temp;
    this.high_temp = cityObj.high_temp;
    this.pop = cityObj.pop;
    this.uvIndex = cityObj.uv;
    this.windSpd = cityObj.wind_spd;
    this.windDir = cityObj.wind_cdir;
    this.humidity = cityObj.rh;
    this.pressure = cityObj.pres;
    this.snow = cityObj.snow;
    this.weatherCode = cityObj.weather.code;
    this.icon = cityObj.weather.icon;
    this.iconPath = `https://cdn.weatherbit.io/static/img/icons/${cityObj.weather.icon}.png`;
    this.temp = cityObj.temp;
  }
}



async function getWeather(req, res, next, postalCode) {
  try {
    let postalCode = req.query.postal_code;
    let searchQuery = req.query.searchQuery;
    let key = `postalCode: ${postalCode} - weather`;

    if (cache[key] && (Date.now() - cache[key].timestamp) < 8.64e+7) {
      res.status(200).send(cache[key].data);

    } else {
      let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&postal_code=${postalCode}`;

      let foundCity = await axios.get(url);

      let dataToSend = [{
        city: foundCity.data.city_name,
        state: foundCity.data.state_code,
        timezone: foundCity.data.timezone,
        data: foundCity.data.data.map(newWeather => new Forecast(newWeather)),
      }];

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
