const { server } = require('../src/server');
const { db } = require('../src/models');
const supertest = require('supertest');
const req = supertest(server);

beforeAll(async () => {
  await db.sync();
  await req.post('/user').send({
    name: 'Test Name',
    email: 'Test Email',
    password: 'pass',
    phoneNum: 'Phone Number',
    zipCode: 'Zip Code',
    role: 'Role',
    userId: 1,
  });

});


afterAll(async () => {
  await db.drop();
},
);

describe('Testing server', () => {
  it('create event', async () => {
    let res = await req.post('/planner').send({
      name: 'Test Name',
      desc: 'Description',
      date: 'Date',
      travelBuddies: 'Travel Buddies',
      time: 'Time',
      userId: 1,
    });

    expect(res.status).toBe(201);
  });
  it('should create a new list', async () => {
    const res = await req.post('/item').send({
      name: 'list1',
      quantity: 1,
      eventId: 1,
    });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('list1');
    expect(res.body.quantity).toBe(1);
  },
  );

  it('should get all lists', async () => {
    const res = await req.get('/list');
    expect(res.status).toBe(200);
    expect(res.body[0].name).toBe('list1');
    expect(res.body.length).toBe(1);
  },
  );

  it('should get a list by id', async () => {
    const res = await req.get('/list/1');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('list1');
    expect(res.body.quantity).toBe(1);
  },
  );

  it('should update a list', async () => {
    const res = await req.put('/list/1').send({
      name: 'list2',
      quantity: 1,
      eventId: 1,
    });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('list2');
    expect(res.body.quantity).toBe(1);
  },
  );

  // it('should delete a list', async () => {
  //   const res = await req.delete('/list/1');
  //   expect(res.status).toBe(204);
  // },
  // );
});
