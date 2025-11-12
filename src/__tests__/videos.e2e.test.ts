import request from 'supertest';
import { app } from '../app';
import { db } from '../db/db';

describe('Videos API', () => {
  beforeEach(() => db.reset());

  it('GET /videos → пустой массив', async () => {
    const res = await request(app).get('/hometask_01/api/videos');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /videos → создаёт видео', async () => {
    const res = await request(app)
      .post('/hometask_01/api/videos')
      .send({ title: 'Test Video', author: 'Me', availableResolutions: ['P144'] });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title', 'Test Video');
  });

  it('GET /videos → возвращает 1 видео', async () => {
    await request(app)
      .post('/hometask_01/api/videos')
      .send({ title: 'Video', author: 'Author', availableResolutions: ['P144'] });

    const res = await request(app).get('/hometask_01/api/videos');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  it('PUT /videos/:id → обновляет видео', async () => {
    const createRes = await request(app)
      .post('/hometask_01/api/videos')
      .send({ title: 'Old', author: 'A', availableResolutions: ['P144'] });

    const id = createRes.body.id;

    const res = await request(app)
      .put(`/hometask_01/api/videos/${id}`)
      .send({
        title: 'New',
        author: 'B',
        availableResolutions: ['P240'],
        canBeDownloaded: true,
        minAgeRestriction: 16,
        publicationDate: new Date().toISOString(),
      });

    expect(res.status).toBe(204);
  });

  it('DELETE /videos/:id → удаляет видео', async () => {
    const createRes = await request(app)
      .post('/hometask_01/api/videos')
      .send({ title: 'Del', author: 'X', availableResolutions: ['P144'] });

    const id = createRes.body.id;
    const delRes = await request(app).delete(`/hometask_01/api/videos/${id}`);
    expect(delRes.status).toBe(204);
  });
});
