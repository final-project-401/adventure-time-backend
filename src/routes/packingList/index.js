'use strict';

const express = require('express');
const { Item } = require('../../models/index');
const router = express.Router();

router.get('/items', handleGetAll);
router.get('/item/:id', handleGetOne);
router.post('/item', handleCreate);
router.put('/item/:id', handleUpdate);

async function handleGetAll(req, res) {
  try {
    let allUsers = await Item.get();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let item = await Item.get(id);
  res.status(200).json(item);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newItem = await Item.create(obj);
  res.status(201).json(newItem);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedItem = await Item.update(id, obj);
  res.status(200).json(updatedItem);
}

module.exports = router;
