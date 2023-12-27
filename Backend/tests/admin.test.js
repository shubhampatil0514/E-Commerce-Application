const request = require('supertest');
const app = require('../app');
const Admin = require('../model/admin'); 

describe('adminController', () => {
  it('should create a new admin', async () => {
    const adminData = {
      username: 'shzxcvbhssdfhwe',
      email: 'dgxcdfgergdg@example.com',
      password: 'tgzxcvdgfdgfdertyggdgdhh',
    };

    const response = await request(app)
      .post('/admin/create')
      .send(adminData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Admin created successfully');
  });
});

