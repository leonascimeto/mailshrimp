import request from 'supertest'
import app from '../src/app'

describe('Testando rotas de autenticação', () => {

   it('POST /accounts/login - Deve retornar status code 200', async () => {
      // mocking
      const newAccount = {
         id: 1,
         name: 'Leonardo Fernandes',
         email: 'leonidas@gmail.com',
         password: '123456',
      }

      await request(app).post('/accounts').send(newAccount)

      const payload = {
         email: 'leonidas@gmail.com',
         password: '123456'
      }

      const result = await request(app).post('/accounts/login').send(payload)

      expect(result.status).toEqual(200)
      expect(result.body.auth).toBeTruthy()
      expect(result.body.token).toBeTruthy()

   })

   it('POST /accounts/login - 422 Unprocessable Entity', async () => {
      const payload = {
         email: 'nascimentoleo899@gmail.com',
         password: 'abc'
      }
 
      const result = await request(app).post('/accounts/login').send(payload)
 
      expect(result.status).toEqual(422)
   })

   it('POST /accounts/login - 401 Unauthorized', async () => {
      const payload = {
         email: 'nascimentoleo899@gmail.com',
         password: 'abcabc'
      }
 
      const result = await request(app).post('/accounts/login').send(payload)
 
      expect(result.status).toEqual(401)
   })

   it('POST /accounts/logout - 200 Ok', async () => {
      
      const result = await request(app).post('/accounts/logout')
 
      expect(result.status).toEqual(200)
      expect(result.body.auth).toBeFalsy()
      expect(result.body.token).toBeNull()
   })

})