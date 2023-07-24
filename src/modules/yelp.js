
const axios = require('axios');

class Yelp {
  constructor(yelpObj) {
    this.id = yelpObj.id;
    this.name = yelpObj.name;
    this.address =yelpObj.location.display_address;
    this.displayPhone = yelpObj.display_phone;
    this.phone = yelpObj.phone;
    this.rating = yelpObj.rating;
    this.img = yelpObj.image_url;
    this.is_closed = yelpObj.is_closed;
    this.price = yelpObj.price;
    this.yelpUrl = yelpObj.url;
  }
}


async function getReviews(req, res, next) {
  let zip = req.query.location;
  const apiKey = process.env.YELP_API_KEY;

  const yelpUrl = `https://api.yelp.com/v3/businesses/search?location=${zip}&categories=restaurants`;
  axios.get(yelpUrl, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then(response => {
      let data = response.data.businesses.map(item => new Yelp(item));
      res.status(200).send(data);
      // console.log(response.data);
      // console.log(yelpUrl);
    })
    .catch(error => {
      console.log(error);
    });


}

module.exports = {
  getReviews,
};
