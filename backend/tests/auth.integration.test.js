import request from 'supertest';
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from '../routes/authRoutes.js';
import User from '../models/User.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.Mongo_DB);
});

// Cleanup test user before each test
beforeEach(async () => {
  await User.deleteOne({ email: 'integration@example.com' });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth Integration Test', () => {
  it('should register and login a user successfully', async () => {
    // Register
    const registerRes = await request(app).post('/api/auth/register').send({
      username: 'integrationUser',
      email: 'integration@example.com',
      password: 'testpass123'
    });

    expect(registerRes.statusCode).toBe(201);
    expect(registerRes.body).toHaveProperty('token');

    // Login
    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'integration@example.com',
      password: 'testpass123'
    });

    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body).toHaveProperty('message', 'Login successful');
    expect(loginRes.body).toHaveProperty('token');
  });
});
