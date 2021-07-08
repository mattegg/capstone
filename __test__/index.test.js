import { app } from '../src/server/index';
const supertest = require('supertest');
const request = supertest(app);

it('Test setup endpoint passes', async (done) => {
  const response = await request.get('/test');
  expect(response.status).toBe(200); // check if request was successfull
  expect(response.body).toBeDefined();
  done();
});

it('test random endpoint fails', async (done) => {
  const response = await request.get('/blah');
  expect(response.status).toBe(404); // check if request was successfull
  expect(response.body).toBeDefined();
  done();
});

it('test post to api endpoints', async (done) => {
  const response = await request.post('/processLocation');
  expect(response.status).toBe(200); // check if request was successfull
  expect(response.body).toBeDefined();
  done();
});