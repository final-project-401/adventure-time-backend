'use strict';

const express = require('express');
const { User } = require('../../models/index');
const router = express.Router();
const axios = require('axios').default;


// Auth0 credentials
const auth0ClientId = 'NQ33EjV3cbB6iTGNoGFNEjbmymEMmXQA';
const auth0ClientSecret = 'L0PH8PKt6S9b5uTkIM8TfruZGDVhDLP6BJ1IQl_lNGUOwCHrgN8NPpGqJKxgH-bG';
const auth0Audience = 'https://dev-o6dxx3jjm2fuob3x.us.auth0.com/api/v2/';

const adminOptions = {
  method: 'POST',
  url: 'https://dev-o6dxx3jjm2fuob3x.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  data: {
    client_id: 'NQ33EjV3cbB6iTGNoGFNEjbmymEMmXQA',
    client_secret: 'L0PH8PKt6S9b5uTkIM8TfruZGDVhDLP6BJ1IQl_lNGUOwCHrgN8NPpGqJKxgH-bG',
    audience: 'https://dev-o6dxx3jjm2fuob3x.us.auth0.com/api/v2/',
    grant_type: 'client_credentials',
  },
};


axios
  .request(adminOptions)
  .then(function (response) {
    console.log('respons data ======>', response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

router.post('/api/user', async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.get(email);

    if (existingUser) {

      res.json({ message: 'User signed in successfully' });
    } else {

      await User.create({ email });

      await User.create({ email });
      res.json({ message: 'User added successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
