
const axios = require('axios');

class Yelp {
  constructor(yelpObj) {
    this.name = yelpObj.name;
    this.address =yelpObj.location.address1;
    this.rating = yelpObj.rating;
  }
}


async function getReviews(req, res, next) {
  let zip = req.query.location;
  const apiKey = process.env.YELP_API_KEY;

  const yelpUrl = `https://api.yelp.com/v3/businesses/search?location=37042&categories=restaurants`;
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
