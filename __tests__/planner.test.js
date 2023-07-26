const { server } = require('../src/server');
const { db, Event } = require('../src/models');
const supertest = require('supertest');
const request = supertest(server);

beforeAll(async () => {
  await db.sync();
  await request.post('/api/user').send({
    email: 'fake@fake.com',
  });
});

afterAll(async () => {
  await db.drop();
});

describe('Event Routes', () => {

  // Mock the Event.create method
  Event.create = jest.fn().mockResolvedValue({
    id: 1,
    name: 'Test Event 1',
    desc: 'Test Description',
    date: 123,
    travelBuddies: ['Test Buddies'],
    time: 13,
    userId: 1,
  });

  it('Creates event', async () => {
    let response = await request.post('/planner').send({
      name: 'Test Event 1',
      desc: 'Test Description',
      date: 123,
      travelBuddies: ['Test Buddies'],
      time: 13,
      userId: 1,
    });

    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('Test Event 1');
  });

  it('Read all events', async () => {

    let response = await request.get('/planner');

    expect(response.status).toBe(200);
  });

  it('Update an event', async () => {
    // Mock the Event.update method
    Event.update = jest.fn().mockResolvedValue({
      id: 1,
      name: 'Test Updated',
      // ... Other properties ...
    });

    let response = await request.put('/planner/1').send({
      name: 'Test Updated',
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Test Updated');
  }, 10000);
});
