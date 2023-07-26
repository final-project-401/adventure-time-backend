const { server } = require('../src/server');
const { db, Item } = require('../src/models');
const supertest = require('supertest');
const request = supertest(server);

beforeAll(async () => {
  await db.sync();
  await request.post('/api/user').send({
    email: 'fake1@fake.com',
  });

});

afterAll(async () => {
  await db.drop();
});

describe('Items Routes', () => {
  // Mock the Item model methods
  beforeEach(() => {
    Item.get = jest.fn();
    Item.create = jest.fn();
    Item.update = jest.fn();
  });

  it('should create a new list', async () => {
    Item.create.mockResolvedValue({
      id: 1,
      name: 'list1',
      quantity: 1,
      eventId: 1,
    });

    let response = await request.post('/item').send({
      name: 'list1',
      quantity: 1,
      eventId: 1,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('list1');
  });

  it('should get all lists', async () => {
    Item.get.mockResolvedValue([
      {
        id: 1,
        name: 'list1',
        quantity: 1,
        eventId: 1,
      },
    ]);

    let response = await request.get('/items');

    expect(response.status).toBe(200);
    expect(response.body[0].name).toBe('list1');
  });

  it('should get a list by id', async () => {
    Item.get.mockResolvedValue({
      id: 1,
      name: 'list1',
      quantity: 1,
      eventId: 1,
    });

    let response = await request.get('/item/1');

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('list1');
  });

  it('should update a list', async () => {
    Item.update.mockResolvedValue({
      id: 1,
      name: 'list2',
      quantity: 1,
      eventId: 1,
    });

    let response = await request.put('/item/1').send({
      name: 'list2',
      quantity: 1,
      eventId: 1,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('list2');
  });
});
