import {jest, describe, expect, it, beforeAll, afterAll} from '@jest/globals'
import request from 'supertest';

import app from '../src/app';
import { sign } from '../src/auth';
import repository from '../src/models/accountRepository';
import { IAccount } from '../src/models/accounts';

const testMail = 'jestaccounts@jest.com'
const hashPassword = '$2a$10$2K03Fc6d.U/nfVVVYecvtui5qdSpzu/OU8mfur57toHXSCPSGvWdm' // 123456789
const testPassword = '123456'
let testID: number = 0
let token: string | null = null

beforeAll(async () => {
  const testAccount: IAccount = {
     name: 'jest',
     email: testMail,
     password: hashPassword,
     domain: 'jest.com'
  }

  const result = await repository.createAccount(testAccount)
  testID = result.id!
  token = await sign(result.id!)
})

afterAll(async () => {
  await repository.deleteByEmail(testMail)
  await repository.deleteByEmail('jest2@hotmail.com')
})


describe('testando rotas de accounts', () => {
  it('POST /accounts/ - Deve retornar status code 201', async () => {
    const payload: IAccount = {
      name: 'jest2',
      email: 'jest2@hotmail.com',
      password: '12345678910',
      status: 100,
      domain: 'jest.com',
    };

    const result = await request(app).post('/accounts/').send(payload);

    expect(result.status).toEqual(201);
    expect(result.body.id).toBeTruthy();
  });

  it('POST /accounts/ - Deve retornar status code 422', async () => {
    const payload = {
      street: 'rua ling',
      cidade: 'natal',
    };

    const result = await request(app).post('/accounts/').send(payload);

    expect(result.status).toEqual(422);
  });

  it('PATCH /accounts/:id - Deve retornar status code 200', async () => {
    const payload = {
      name: 'Leonardo Fernandes',
    };

    const result = await request(app)
    .patch('/accounts/' + testID)
    .send(payload)
    .set('Authorization', `${token}`);

    expect(result.status).toEqual(200);
    expect(result.body.id).toEqual(testID);
    expect(result.body.name).toEqual(payload.name);
  });

  it('PATCH /accounts/:id - Deve retornar status code 400', async () => {
    const payload = {
      name: 'Leonardo Fernandes',
    };

    const result = await request(app)
      .patch('/accounts/abc')
      .send(payload)
      .set('Authorization', `${token}`)

    expect(result.status).toEqual(400);
  });

  it('PATCH /accounts/:id - Deve retornar status code 403', async () => {
    const payload = {
      name: 'Leonardo Fernandes',
    };

      const result = await request(app)
        .patch('/accounts/-1')
        .send(payload)
        .set('Authorization', `${token}`)

    expect(result.status).toEqual(403);
  });

  it('GET /accounts/ - Deve retornar status code 200', async () => {
    const result = await request(app).get('/accounts/').set('Authorization', `${token}`)

    expect(result.status).toEqual(200);
    expect(Array.isArray(result.body)).toBeTruthy();
  });

  it('GET /accounts/:id - Deve retornar status code 200', async () => {
    const result = await request(app)
      .get('/accounts/'+ testID)
      .set('Authorization', `${token}`)

    expect(result.status).toEqual(200);
    expect(result.body.id).toEqual(testID);
  });

  it('GET /accounts/:id - Deve retornar status code 403', async () => {
    const result = await request(app)
      .get('/accounts/-1')
      .set('Authorization', `${token}`)

    expect(result.status).toEqual(403);
  });

  it('GET /accounts/:id - Deve retornar status code 400', async () => {
    const result = await request(app)
      .get('/accounts/abc')
      .set('Authorization', `${token}`)

    expect(result.status).toEqual(400);
  });

  it('DEELETE /accounts/:id - Deve retornar status code 200', async () => {
    const result = await request(app)
      .delete('/accounts/'+ testID)
      .set('Authorization', `${token}`)

    expect(result.status).toEqual(200);
  });

  it('DEELETE /accounts/:id - Deve retornar status code 403', async () => {
    const result = await request(app)
      .delete('/accounts/-1')
      .set('Authorization', `${token}`)

    expect(result.status).toEqual(403);
  });
});

