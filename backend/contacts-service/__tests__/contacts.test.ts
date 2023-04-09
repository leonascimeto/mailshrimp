import { jest, describe, expect, it, beforeAll, afterAll } from '@jest/globals'
import request from 'supertest';
import app from '../src/app';
import accountApp from '../../accounts-sevice/src/app';
import repository from '../src/models/contactRepository';
import { IContact } from '../src/models/contact';


const testEmailAccount = 'jest@accounts.com';
const testEmailContact = 'jest@contacts.com';
const testEmailContactPost = 'jest2@contacts.com'
const testPassword = '123456';
let jwt: string = '';
let testAccountId: number = 0;
let testContactId: number = 0;


beforeAll(async () => {
   const testAccount = {
      name: 'jest',
      email: testEmailAccount,
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
         email: testEmailAccount,
         password: testPassword
      });
   console.log(`loginResponse: ${loginResponse.status}`);
   jwt = loginResponse.body.token;
   
   const testContact = {
      name: 'jest-contact',
      email: testEmailContact,
      phone: '84988118811',
      accountId: testAccountId
   } as IContact
   
   const addResult = await repository.addContact(testContact, testAccountId);
   console.log(`contactResponse: ${addResult}`);
   testContactId = addResult.id!;
})

afterAll(async () => {
   await repository.deleteByEmail(testEmailContact, testAccountId);
   await repository.deleteByEmail(testEmailContactPost, testAccountId);

   await request(accountApp)
      .delete('/accounts/' + testAccountId)
      .set('Authorization', jwt)
   await request(accountApp)
      .post('/accounts/logout')

})

describe('testando rotas de contacts', () => {
   it('GET /contacts/ - Deve retornar status code 200', async () => {
      const result = await request(app)
         .get('/contacts/')
         .set('Authorization', jwt)

      expect(result.status).toEqual(200);
      expect(Array.isArray(result.body)).toBeTruthy();
   })

   it('GET /contacts/ - Deve retornar status code 401', async () => {
      const result = await request(app)
         .get('/contacts/')

      expect(result.status).toEqual(401);
   })

   it('GET /constats/ - Deve retornar status code 400', async () => {
      const result = await request(app)
         .get('/contacts/abc')
         .set('Authorization', jwt)

      expect(result.status).toEqual(400);
   })

   it('GET /contacts/:id - Deve retornar status code 200', async () => {
      const response = await request(app)
         .get('/contacts/' + testContactId)
         .set('Authorization', jwt)

      expect(response.status).toEqual(200);
      expect(response.body.id).toEqual(testContactId);
   })

   it('GET /contacts/:id - Deve retornar status code 404', async () => {
      const response = await request(app)
         .get('/contacts/-1')
         .set('Authorization', jwt)

      expect(response.status).toEqual(404);
   })

   it('GET /contacts/:id - Deve retornar status code 401', async () => {
      const response = await request(app)
         .get('/contacts/')

      expect(response.status).toEqual(401);
   })

   it('GET /contacts/:id - Deve retornar status code 400', async () => {
      const response = await request(app)
         .get('/contacts/abc')
         .set('Authorization', jwt)

      expect(response.status).toEqual(400);
   })

   it('POST /contacts/ - Deve retornar status code 201', async () => {
      const testContact = {
         name: 'jest2',
         email: testEmailContactPost,
         phone: '84988118821',
      } as IContact
      const result = await request(app)
         .post('/contacts/')
         .set('Authorization', jwt)
         .send(testContact)

      expect(result.status).toEqual(201);
      expect(result.body.id).toBeTruthy();
   })

   it('POST /contacts/ - Deve retornar status code 401', async () => {
      const testContact = {
         name: 'jest2',
         email: testEmailContactPost,
         phone: '84988118821',
      } as IContact
      const result = await request(app)
         .post('/contacts/')
         .send(testContact)

      expect(result.status).toEqual(401);
   })

   it('POST /contacts/ - Deve retornar status code 422', async () => {
      const testContact = {
         street: 'my street, 24'
      } 
      const result = await request(app)
         .post('/contacts/')
         .set('Authorization', jwt)
         .send(testContact)
      
      expect(result.status).toEqual(422);
   })

   it('POST /contacts/ - Deve retornar status code 400', async () => {
      const testContact = {
         name: 'jest2',
         email: testEmailContactPost,
         phone: '84988118821',
      } as IContact
      const result = await request(app)
         .post('/contacts/')
         .set('Authorization', jwt)
         .send(testContact)

      expect(result.status).toEqual(400);
   })

   it('PATCH /contacts/:id - Deve retornar status code 200', async () => {
      const testContact = {
         name: 'jestalterado'
      } 
      const result = await request(app)
         .patch('/contacts/' + testContactId)
         .set('Authorization', jwt)
         .send(testContact)

      expect(result.status).toEqual(200);
      expect(result.body.name).toEqual('jestalterado');
   })

   it('PATCH /contacts/:id - Deve retornar status code 401', async () => {
      const testContact = {
         name: 'jestalterado'
      } 
      const result = await request(app)
         .patch('/contacts/' + testContactId)
         .send(testContact)

      expect(result.status).toEqual(401);
   })

   it('PATCH /contacts/:id - Deve retornar status code 422', async () => {
      const testContact = {
         street: 'my street, 24'
      }
      const result = await request(app)
         .patch('/contacts/' + testContactId)
         .set('Authorization', jwt)
         .send(testContact)

      expect(result.status).toEqual(422);
   })

   it('PATCH /contacts/:id - Deve retornar status code 404', async () => {
      const testContact = {
         name: 'jestalterado'
      } 
      const result = await request(app)
         .patch('/contacts/-1')
         .set('Authorization', jwt)
         .send(testContact)

      expect(result.status).toEqual(404);
   })

   it('PATCH /contacts/:id - Deve retornar status code 400', async () => {
      const testContact = {
         name: 'jestalterado'
      } 
      const result = await request(app)
         .patch('/contacts/abc')
         .set('Authorization', jwt)
         .send(testContact)

      expect(result.status).toEqual(400);
   })
})
