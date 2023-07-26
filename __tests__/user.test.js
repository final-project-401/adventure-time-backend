const { server } = require('../src/server');
const { db, User } = require('../src/models'); // Assuming you have a User model
const supertest = require('supertest');
const request = supertest(server);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe('Testing server', () => {
  beforeEach(() => {
    // Mock User.get and User.create methods before each test
    User.get = jest.fn();
    User.create = jest.fn();
  });

  it('should create a new user', async () => {
    // Mock the User.get method to return null (indicating user doesn't exist)
    User.get.mockResolvedValue(null);

    const response = await request.post('/api/user').send({
      email: 'fake@fake.com',
    });

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('User added successfully');
    // expect(response.body.email).toEqual('fake@fake.com');
    // Check if User.get and User.create methods were called as expected
    expect(User.get).toHaveBeenCalledWith('fake@fake.com');
    expect(User.create).toHaveBeenCalledTimes(2);
    expect(User.create).toHaveBeenCalledWith({ email: 'fake@fake.com' });
  });

  it('should sign in an existing user', async () => {
    // Mock the User.get method to return an existing user
    User.get.mockResolvedValue({ email: 'fake@fake.com' });

    const response = await request.post('/api/user').send({
      email: 'fake@fake.com',
    });

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('User signed in successfully');
    // Check if User.get and User.create methods were called as expected
    expect(User.get).toHaveBeenCalledWith('fake@fake.com');
    expect(User.create).not.toHaveBeenCalled();
  });

  it('should handle server errors', async () => {
    // Mock the User.get method to throw an error
    User.get.mockRejectedValue(new Error('Some error occurred'));

    const response = await request.post('/api/user').send({
      email: 'fake@fake.com',
    });

    expect(response.status).toEqual(500);
    expect(response.body.error).toEqual('Server Error');
    // Check if User.get and User.create methods were called as expected
    expect(User.get).toHaveBeenCalledWith('fake@fake.com');
    expect(User.create).not.toHaveBeenCalled();
  });
});




// const { server } = require('../src/server');
// const { db } = require('../src/models');
// const supertest = require('supertest');
// const req = supertest(server);

// beforeAll(async () => {
//   await db.sync();
// },
// );

// afterAll(async () => {
//   await db.drop();
// },
// );

// describe('Testing server', () => {
//   it('should create a new user', async () => {
//     const response = await req.post('/api/user').send({
//       email: 'fake@fake.com',
//     });
//     expect(response.status).toEqual(201);
//     expect(response.body.email).toEqual('fake@fake.com');
//   });

//   it('should get all users', async () => {
//     const response = await req.get('/users');
//     expect(response.status).toEqual(200);
//     expect(response.body[0].name).toEqual('test');
//     expect(response.body[0].role).toEqual('admin');
//     expect(response.body[0].email).toEqual('test');
//   },
//   );

//   it('should get one user', async () => {
//     const response = await req.get('/user/1');
//     expect(response.status).toEqual(200);
//     expect(response.body.email).toEqual('fake@fake.com');
//   },
//   );

//   it('should update a user', async () => {
//     const response = await req.put('/user/1').send({
//       email: 'test@fake.com',
//     });

//     expect(response.body.email).toEqual('test@fake.com');
//   },
//   );

// });
