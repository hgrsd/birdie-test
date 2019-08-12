import app from '../src/application'
import * as request from 'supertest';

describe('Requesting event types for user', () => {
  it('Returns data', async () => {
    await request(app)
      .get('/events/types/df50cac5-293c-490d-a06c-ee26796f850d')
      .expect(200)
      .expect(function(res) {
        expect(res.body).toHaveProperty("data");
      });
  })
  it('Detects invalid UUIDs', async () => {
    await request(app)
      .get('/events/types/df50cac5-293c-490d-a06c-ee2696f850d')
      .expect(400)
      .expect(function(res) {
        expect(res.body).toHaveProperty("error");
      });
  })
});

describe('Requesting all events for user', () => {
  it('Returns data', async () => {
    await request(app)
      .get('/events/df50cac5-293c-490d-a06c-ee26796f850d')
      .expect(200)
      .expect(function(res) {
        expect(res.body).toHaveProperty("data");
      });
  })
  it('Detects invalid UUIDs', async () => {
    await request(app)
      .get('/events/df50cac5-293c-490d-a06c-ee2696f850d')
      .expect(400)
      .expect(function(res) {
        expect(res.body).toHaveProperty("error");
      });
  })
});

describe('Requesting events of specified type for user', () => {
  it('Returns data', async () => {
    await request(app)
      .get('/events/df50cac5-293c-490d-a06c-ee26796f850d?event_type=mood_observation')
      .expect(200)
      .expect(function(res) {
        expect(res.body).toHaveProperty("data");
      });
  })
  it('Detects invalid UUIDs', async () => {
    await request(app)
      .get('/events/df50cac5-293c-490d-a06c-ee26796f85d?event_type=mood_observation')
      .expect(400)
      .expect(function(res) {
        expect(res.body).toHaveProperty("error");
      });
  })
});
