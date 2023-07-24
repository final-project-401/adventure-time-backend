'use strict';

const express = require('express');
const { User } = require('../../models/index');
const router = express.Router();

router.post('/api/user', async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.get(email);

    if (existingUser) {

      res.json({ message: 'User signed in successfully' });
    } else {

      await User.create({ email });
      res.json({ message: 'User added successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
