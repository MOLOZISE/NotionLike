const request = require('supertest');
const app = require('../index');

describe('Notes API', () => {
  it('should create a note', async () => {
    const response = await request(app)
      .post('/notes')
      .send({ text: 'test note' })
      .expect(201);
    expect(response.body.text).toBe('test note');
  });

  it('should list notes', async () => {
    await request(app).post('/notes').send({ text: 'another note' });
    const response = await request(app)
      .get('/notes')
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
