import { jest, describe, expect, it, beforeAll, afterAll } from '@jest/globals'
import request from 'supertest';
import app from '../src/app';
import accountApp from '../../accounts-sevice/src/app';


const testEmail = 'jest@accounts.com';
const testEmail2 = 'jest2@accounts.com';
const testPassword = '123456';
let jwt: string = '';
let testAccountId: number = 0;
let testContactId: number = 0;

beforeAll(async () => {
   const testAccount = {
      name: 'jest',
      email: testEmail,
      password: testPassword,
      domain: 'jest.com'
   }
   const accountResponse = await request(accountApp)
         .post('/accounts/')
         .send(testAccount);
   console.log(`accountResponse: ${accountResponse.status}`);
   testAccountId = accountResponse.body.id;

   const loginResponse = await request(accountApp)
         .post('/accounts/login')
         .send({
            email: testEmail,
            password: testPassword
         });
   console.log(`loginResponse: ${loginResponse.status}`);
   jwt = loginResponse.body.token;
})

afterAll(async () => {
   await request(accountApp)
      .post('/accounts/logout')
   await request(accountApp)
      .delete('/accounts/' + testAccountId)
})


describe('testando rotas de contacts', () => {
   it('GET /contacts/ - Deve retornar status code 200', async () => {

      const result = await request(app)
         .get('/contacts/')
         .set('Authorization', jwt)

      expect(result.status).toEqual(200);
      expect(Array.isArray(result.body)).toBeTruthy();
   })
})
