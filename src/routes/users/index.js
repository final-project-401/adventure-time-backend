'use strict';

const express = require('express');
const { User } = require('../../models/index');
const router = express.Router();

router.get('/users', handleGetAll);
router.get('/user/:name', handleGetOne);
router.post('/user', handleCreate);
router.put('/user/:id', handleUpdate);


async function handleGetAll(req, res) {
  try {
    console.log('user get works ====');
    let allUsers = await User.get();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function handleGetOne(req, res) {
  const name = req.params.name;
  let user = await User.get(name);
  res.status(200).json(user);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newUser = await User.create(obj);
  res.status(201).json(newUser);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedUser = await User.update(id, obj);
  res.status(200).json(updatedUser);
}

module.exports = router;
