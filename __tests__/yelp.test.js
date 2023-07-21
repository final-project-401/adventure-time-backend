const { server } = require('../src/server');
const { db } = require('../src/models');
const supertest = require('supertest');
const req = supertest(server);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
},
);

describe('Testing server', () => {
  it('should get all data', async () => {
    const response = await req.get('/food');
    expect(response.status).toEqual(200);
    expect(typeof response.body).toEqual('object');
  });

});
