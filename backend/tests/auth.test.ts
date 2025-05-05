import request from 'supertest';
import { app } from '../src/index';
import fs from 'fs';
import path from 'path';

describe('Auth API', () => {
  it('should login with valid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'intern',
        password: 'letmein'
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should reject login with invalid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'intern',
        password: 'wrongpassword'
      });
    
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('should reject login with missing credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'intern'
        // missing password
      });
    
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Username and password are required');
  });
});