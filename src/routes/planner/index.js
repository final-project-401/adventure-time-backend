'use strict';

const express = require('express');
const { Event } = require('../../models/index');
const router = express.Router();
const axios = require('axios');
const jwtDecode = require('jwt-decode');

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

router.get('/planner', handleGetAll);
router.get('/planner/:id', handleGetOne);
router.post('/planner', handleCreate);
router.put('/planner/:id', handleUpdate);
router.delete('/planner/:id', handleDelete);

router.delete('/plannerAdmin/:id', testMiddleware, handleDelete);

async function testMiddleware(req, res) {
  // const id = req.params.id;
  try {
    axios
      .request(adminOptions)
      .then(function (response) {
        console.log('respons data ======>', response.data);
        let auth0User = jwtDecode(response.data.access_token);
        console.log('TOKEN WITH CAPABILITEIS', auth0User);
        // add axios call to perform operation here
      })
      .catch(function (error) {
        console.error(error);
      });

    res.status(200).json('we can delete if we want');
  } catch (error) {
    console.error(error);
  }
  // const obj = req.body;
  // console.log('REQ', req.user);
  // await Event.delete(id, obj);
  // let updatedAdventure = await Event.get();
}

async function handleGetAll(req, res) {
  try {
    let allUsers = await Event.get();
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
  console.log(newAdventure);
  res.status(201).json(newAdventure);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedAdventure = await Event.update(id, obj);
  res.status(200).json(updatedAdventure);
}

async function handleDelete(req, res) {
  const id = req.params.id;
  const obj = req.body;
  await Event.delete(id, obj);
  let updatedAdventure = await Event.get();
  res.status(200).json(updatedAdventure);
}

module.exports = router;
