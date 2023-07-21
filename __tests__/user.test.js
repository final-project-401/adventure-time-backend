const { server } = require('../src/server');
const { db } = require('../src/models');
const supertest = require('supertest');
const req = supertest(server);

beforeAll(async () => {
  await db.sync();
},
);

afterAll(async () => {
  await db.drop();
},
);

describe('Testing server', () => {
  it('should create a new user', async () => {
    const response = await req.post('/user').send({
      name: 'test',
      password: 'test',
      role: 'admin',
      email: 'test',
    });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('test');
    expect(response.body.role).toEqual('admin');
    expect(response.body.email).toEqual('test');
  });

  it('should get all users', async () => {
    const response = await req.get('/users');
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('test');
    expect(response.body[0].role).toEqual('admin');
    expect(response.body[0].email).toEqual('test');
  },
  );

  it('should get one user', async () => {
    const response = await req.get('/user/1');
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
    expect(response.body.role).toEqual('admin');
    expect(response.body.email).toEqual('test');
  },
  );

  it('should update a user', async () => {
    const response = await req.put('/user/1').send({
      name: 'test',
      password: 'test',
      role: 'admin',
      email: 'test',
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
    expect(response.body.role).toEqual('admin');
    expect(response.body.email).toEqual('test');
  },
  );
  
  // it('should delete a user', async () => {
  //     const response = await req.delete('/users/1');
  //     expect(response.status).toEqual(200);
  // }
  // );
});




