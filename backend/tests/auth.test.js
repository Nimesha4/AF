import request from 'supertest';
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from '../routes/authRoutes.js';
import User from '../models/User.js'; // <- Add this line

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.Mongo_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// ✅ Clean up the user before each test
beforeEach(async () => {
  await User.deleteOne({ email: 'testuser@example.com' });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth Routes', () => {
  it('should register a user successfully', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpass123'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
    expect(res.body).toHaveProperty('token');
  });
});
