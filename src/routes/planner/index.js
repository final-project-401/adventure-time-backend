'use strict';

const express = require('express');
const { Event } = require('../../models/index');
const router = express.Router();

router.get('/planner', handleGetAll);
router.get('/planner/:id', handleGetOne);
router.post('/planner', handleCreate);
router.put('/planner/:id', handleUpdate);

async function handleGetAll(req, res) {
  try {
    console.log('user get works ====');
    let allUsers = await Event.get(); // Corrected method name to retrieve all users
    res.status(200).json(allUsers);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let adventure = await Event.get(id);
  res.status(200).json(adventure);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newAdventure = await Event.create(obj);
  res.status(201).json(newAdventure);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedAdventure = await Event.update(id, obj);
  res.status(200).json(updatedAdventure);
}

module.exports = router;
