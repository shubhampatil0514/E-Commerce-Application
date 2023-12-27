const request = require('supertest');
const app = require('../app');
const User = require('../model/User');
const bcrypt = require('bcrypt');

describe('userController', () => {
  it('should register a new user', async () => {
    const userData = {
      username: 'memouser',
      email: 'memouser@example.com',
      password: 'memotestpassword',
    };

    const response = await request(app)
      .post('/users/signup')
      .field('username', userData.username)
      .field('email', userData.email)
      .field('password', userData.password)
      .attach('profilePicture', 'C:\Users\Hardik\Pictures');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User registered successfully');

    const savedUser = await User.findOne({ email: userData.email });
    expect(savedUser).toBeTruthy();

    const passwordMatch = await bcrypt.compare(userData.password, savedUser.password);
    expect(passwordMatch).toBe(true);
  });
});
