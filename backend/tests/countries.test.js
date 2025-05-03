import request from 'supertest';
import express from 'express';
import axios from 'axios';
import countryRoutes from '../routes/countriesRoute.js';

jest.mock('axios'); // mock axios

const app = express();
app.use(express.json());
app.use('/api', countryRoutes);

describe('Country Routes', () => {
  it('should return all countries', async () => {
    const mockData = [{ name: { common: 'India' } }, { name: { common: 'USA' } }];
    axios.get.mockResolvedValue({ data: mockData });

    const res = await request(app).get('/api/countries');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].name.common).toBe('India');
  });

  it('should return country by name', async () => {
    const mockData = [{ name: { common: 'Japan' } }];
    axios.get.mockResolvedValue({ data: mockData });

    const res = await request(app).get('/api/countries/name/Japan');

    expect(res.statusCode).toBe(200);
    expect(res.body[0].name.common).toBe('Japan');
  });

  it('should return country by region', async () => {
    const mockData = [{ name: { common: 'France' } }];
    axios.get.mockResolvedValue({ data: mockData });

    const res = await request(app).get('/api/countries/region/europe');

    expect(res.statusCode).toBe(200);
    expect(res.body[0].name.common).toBe('France');
  });

  it('should return country by code', async () => {
    const mockData = [{ name: { common: 'Sri Lanka' } }];
    axios.get.mockResolvedValue({ data: mockData });

    const res = await request(app).get('/api/countries/code/LK');

    expect(res.statusCode).toBe(200);
    expect(res.body[0].name.common).toBe('Sri Lanka');
  });
});
