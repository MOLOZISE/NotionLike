const request = require('supertest');
const app = require('../index');

describe('Notes API', () => {
  const agent = request.agent(app);

  beforeAll(async () => {
    await agent.post('/register').send({ username: 'user', password: 'pass' });
    await agent.post('/login').send({ username: 'user', password: 'pass' });
  });

  it('should create a note', async () => {
    const response = await agent
      .post('/notes')
      .send({ text: 'test note' })
      .expect(201);
    expect(response.body.text).toBe('test note');
  });

  it('should list notes', async () => {
    const response = await agent.get('/notes').expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
