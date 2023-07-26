
const axios = require('axios');

class Yelp {
  constructor(yelpObj) {
    this.id = yelpObj.id;
    this.name = yelpObj.name;
    this.address = yelpObj.location.display_address;
    this.displayPhone = yelpObj.display_phone;
    this.phone = yelpObj.phone;
    this.rating = yelpObj.rating;
    this.img = yelpObj.image_url;
    this.is_closed = yelpObj.is_closed;
    this.price = yelpObj.price;
    this.yelpUrl = yelpObj.url;
  }
}




const categoryList = (arr) => {
  let activities = '';

  arr.forEach((activity) => {
    activities += `&categories=${activity}`;
  });

  return activities;
};


async function getReviews(req, res, next) {
  let zip = req.query.location;
  const apiKey = process.env.YELP_API_KEY;
  const yelpUrl = `https://api.yelp.com/v3/businesses/search?location=${zip}&categories=restaurants&sort_by=rating`;
  axios.get(yelpUrl, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then(response => {
      let data = response.data.businesses.map(item => new Yelp(item));
      res.status(200).send(data);
    })
    .catch(error => {
      console.log(error);
    });


}

let actArr = ['amusementparks', 'aquariums', 'axethrowing', 'galleries', 'museums', 'nightlife', 'wineries', 'tours', 'escapegames', 'gokarts', 'golfing', 'hiking', 'horsebackriding', 'waterparks', 'zoos'];
async function getActivities(req, res, next) {
  let zip = req.query.location;
  const apiKey = process.env.YELP_API_KEY;

  const yelpUrl = `https://api.yelp.com/v3/businesses/search?location=${zip}${categoryList(actArr)}&sort_by=rating&limit=20`;
  axios.get(yelpUrl, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then(response => {
      let data = response.data.businesses.map(item => new Yelp(item));
      res.status(200).send(data);
    })
    .catch(error => {
      console.log(error);
    });
}


let lodging = ['bedbreakfast', 'campgrounds', 'guesthouses', 'hostels', 'hotels', 'skiresorts', 'resorts'];
async function getLodging(req, res, next) {
  let zip = req.query.location;
  const apiKey = process.env.YELP_API_KEY;

  const yelpUrl = `https://api.yelp.com/v3/businesses/search?location=${zip}${categoryList(lodging)}&sort_by=rating&limit=20`;
  axios.get(yelpUrl, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then(response => {
      let data = response.data.businesses.map(item => new Yelp(item));
      res.status(200).send(data);
    })
    .catch(error => {
      console.log(error);
    });
}

module.exports = {
  getReviews,
  getActivities,
  getLodging,
};
