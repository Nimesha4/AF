import request from 'supertest';
import express from 'express';
import countryRoutes from '../routes/countriesRoute.js';

const app = express();
app.use(express.json());
app.use('/api', countryRoutes);

describe('Country Controller Integration Tests', () => {
  it('should fetch all countries', async () => {
    const res = await request(app).get('/api/countries');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should fetch country by name', async () => {
    const res = await request(app).get('/api/countries/name/india');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('name');
  });

  it('should fetch country by region', async () => {
    const res = await request(app).get('/api/countries/region/asia');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should fetch country by code', async () => {
    const res = await request(app).get('/api/countries/code/IN');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
