const axios = require('axios');

const API_KEY = 'YOUR_API_KEY';
const LOCATION_ID = 'your_location_id'; // Replace this with the location ID of the desired location

async function getGrouponDeals(locationId) {
  try {
    const url = `https://partner-api.groupon.com/deals.json?tsToken=${API_KEY}&filters=location:${locationId}`;
    const response = await axios.get(url);

    // Process the response data
    if (response.data && response.data.deals) {
      const deals = response.data.deals;
      console.log(deals); // Do something with the deals data
    } else {
      console.log('No deals found.');
    }
  } catch (error) {
    console.error('Error fetching deals:', error.message);
  }
}

getGrouponDeals(LOCATION_ID);

module.exports = {
  getGrouponDeals,
};
