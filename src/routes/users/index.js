'use strict';

const express = require('express');
const { User } = require('../../models/index');
const router = express.Router();
const axios = require('axios').default;

// Auth0 credentials
const auth0ClientId = 'NQ33EjV3cbB6iTGNoGFNEjbmymEMmXQA';
const auth0ClientSecret = 'L0PH8PKt6S9b5uTkIM8TfruZGDVhDLP6BJ1IQl_lNGUOwCHrgN8NPpGqJKxgH-bG';
const auth0Audience = 'https://dev-o6dxx3jjm2fuob3x.us.auth0.com/api/v2/';

// Auth0 Management API endpoint to assign a role to a user
const auth0AssignRoleEndpoint = 'https://dev-o6dxx3jjm2fuob3x.us.auth0.com/api/v2/users/rol_gkF1tpxIU3uAjYu3/roles';

router.post('/api/user', async (req, res) => {
  const { email } = req.body;

  // Request options to get the access token
  const tokenOptions = {
    method: 'POST',
    url: 'https://dev-o6dxx3jjm2fuob3x.us.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    data: {
      client_id: auth0ClientId,
      client_secret: auth0ClientSecret,
      audience: auth0Audience,
      grant_type: 'client_credentials',
    },
  };

  try {
    // Get the access token from Auth0
    const response = await axios.request(tokenOptions);
    const accessToken = response.data.access_token;

    // Check if the user exists in your local database
    let existingUser = await User.get(email);

    if (existingUser) {
      // If the user exists, you can assign a role to them using the Auth0 Management API
      const auth0UserId = existingUser.auth0UserId; // You should have a field in your local User model to store the Auth0 user ID

      // Role to be assigned
      const roleName = 'your_desired_role';

      // Request options to assign a role to the user
      const assignRoleOptions = {
        method: 'POST',
        url: auth0AssignRoleEndpoint.replace(':id', auth0UserId),
        headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
        data: { roles: [roleName] },
      };

      // Assign the role using the Auth0 Management API
      await axios.request(assignRoleOptions);

      // Update the accessToken field in the existingUser
      existingUser.accessToken = accessToken;
      await existingUser.save(); // Save the updated user to the database

      res.json({ message: 'User signed in successfully' });
    } else {
      // If the user does not exist, create a new user and assign the role during creation
      existingUser = await User.create({ email, accessToken }); // Save the accessToken during user creation

      // After creating the user, you can assign the role similarly as above.
      // ...

      res.json({ message: 'User added successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
