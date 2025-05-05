import request from 'supertest';
import { app } from '../src/index';
import jwt from 'jsonwebtoken';

describe('Notes API', () => {
  let authToken: string;
  
  // Get an auth token before testing notes endpoints
  beforeAll(async () => {
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({
        username: 'intern',
        password: 'letmein'
      });
      
    authToken = loginResponse.body.token;
  });
  
  it('should create a new note', async () => {
    const response = await request(app)
      .post('/notes')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        text: 'Test Note Content'
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.text).toBe('Test Note Content');
  });
  
  it('should retrieve all notes', async () => {
    const response = await request(app)
      .get('/notes')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
  
  it('should reject note creation without authentication', async () => {
    const response = await request(app)
      .post('/notes')
      .send({
        text: 'This should fail'
      });
    
    expect(response.status).toBe(401);
  });
  
  it('should reject note creation with invalid token', async () => {
    const response = await request(app)
      .post('/notes')
      .set('Authorization', 'Bearer invalid-token')
      .send({
        text: 'This should fail'
      });
    
    expect(response.status).toBe(401);
  });
  
  it('should reject note creation with empty text', async () => {
    const response = await request(app)
      .post('/notes')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        text: ''
      });
    
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Note text is required');
  });
});