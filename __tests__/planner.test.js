const { server } = require('../src/server');
const { db } = require('../src/models');
const supertest = require('supertest');
const req = supertest(server);


beforeAll(async () => {
  await db.sync();
  await req.post('/user').send({
    name: 'test',
    password: 'test',
    role: 'admin',
    email: 'test',
  });
});

afterAll(async () => {
  await db.drop();
});

describe('Event Routes',() => {
  let event1 = {
    name: 'Test Event 1',
    desc:'Test Description',
    date: 123,
    travelBuddies: 'Test Buddies',
    time: 'Test Timestamp',
    userId: 1,
  };

  let event2 ={
    name: 'Test Event 2',
    desc:'Test Description',
    date: 123,
    travelBuddies: 'Test Buddies',
    time: 'Test Timestamp',
    userId: 1,
  };

  it('Creates event', async () => {
    let response = await req.post('/planner').send({
      name:'Test Event 1',
      desc:'Test Description',
      date:123,
      travelBuddies:'Test Buddies',
      time:'Test Timestamp',
      userId:1,
    });

    expect(response.status).toEqual(201);

  });

  it('Read all events', async()=>{
    await req.post('/planner').send(event2);

    let response = await req.get('/planner');

    expect(response.status).toBe(200);
    expect(response.body[0].name).toBe('Test Event 1');
    expect(response.body[1].name).toBe('Test Event 2');
  });

  it('Update an event', async()=>{
    await req.post('/planner').send(event1);
    let response = await req.put('/planner/1').send({
      name: 'Test Updated',
      desc:'Test Description',
      date: 123,
      travelBuddies: 'Test Buddies',
      time: 'Test Timestamp',
      userId: 1,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Test Updated');
  });

  it('Read one Event', async()=>{
    await req.post('/planner').send(event1);
    await req.post('/planner').send(event2);
    let response = await req.get('/planner/2');
    expect(response.body.name).toBe('Test Event 2');
  });

});
