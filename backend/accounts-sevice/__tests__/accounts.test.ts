import { Response } from 'express';
import request from 'supertest';

import app from '../src/app';

describe('testando rotas de accounts', () => {
  it('POST /accounts/ - Deve retornar status code 201', async () => {
    const payload = {
      id: 1,
      name: 'leonardo',
      email: 'leoxin@hotmail.com',
      password: '12345678910',
      status: 100,
    };

    const result = await request(app).post('/accounts/').send(payload);

    expect(result.status).toEqual(201);
    expect(result.body.id).toBe(1);
  });

  it('POST /accounts/ - Deve retornar status code 422', async () => {
    const payload = {
      id: 3,
      street: 'rua ling',
      cidade: 'natal',
    };

    const result = await request(app).post('/accounts/').send(payload);

    expect(result.status).toEqual(422);
  });

  it('PATCH /accounts/:id - Deve retornar status code 200', async () => {
    const payload = {
      name: 'Leonardo Fernandes',
      email: 'leoxin@hotmail.com',
      password: 'leon**8989',
      status: 100,
    };

    const result = await request(app).patch('/accounts/1').send(payload);

    expect(result.status).toEqual(200);
    expect(result.body.id).toBe(1);
  });

  it('PATCH /accounts/:id - Deve retornar status code 400', async () => {
    const payload = {
      name: 'Leonardo Fernandes',
      email: 'leoxin@hotmail.com',
      password: 'leon**8989',
      status: 100,
    };

    const result = await request(app).patch('/accounts/abc').send(payload);

    expect(result.status).toEqual(400);
  });

  it('PATCH /accounts/:id - Deve retornar status code 404', async () => {
    const payload = {
      name: 'Leonardo Fernandes',
      email: 'leoxin@hotmail.com',
      password: 'leon**8989',
      status: 100,
    };

    const result = await request(app).patch('/accounts/-1').send(payload);

    expect(result.status).toEqual(404);
  });

  it('GET /accounts/ - Deve retornar status code 200', async () => {
    const result = await request(app).get('/accounts/');

    expect(result.status).toEqual(200);
    expect(Array.isArray(result.body)).toBeTruthy();
  });

  it('GET /accounts/:id - Deve retornar status code 200', async () => {
    const result = await request(app).get('/accounts/1');

    expect(result.status).toEqual(200);
    expect(result.body.id).toBe(1);
  });

  it('GET /accounts/:id - Deve retornar status code 404', async () => {
    const result = await request(app).get('/accounts/100');

    expect(result.status).toEqual(404);
  });

  it('GET /accounts/:id - Deve retornar status code 400', async () => {
    const result = await request(app).get('/accounts/abc');

    expect(result.status).toEqual(400);
  });
});

