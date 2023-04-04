import request from 'supertest'
import app from '../src/app'
import { createAccount, deleteByEmail, findByEmail } from '../src/models/accountRepository'
import { IAccount } from '../src/models/accounts'

const testMail = 'jest@jest.com'
const hashPassword = '$2a$10$2K03Fc6d.U/nfVVVYecvtui5qdSpzu/OU8mfur57toHXSCPSGvWdm' // 123456789
const testPassword = '123456'

beforeAll(async () => {
   const testAccount: IAccount = {
      name: 'jest',
      email: testMail,
      password: hashPassword,
      domain: 'jest.com'
   }

   const result = await createAccount(testAccount)
   console.log("Before All", result)
})

afterAll(async () => {
   const result = await deleteByEmail(testMail)
   console.log("After All", result)
})

describe('Testando rotas de autenticação', () => {

   it('POST /accounts/login - Deve retornar status code 200', async () => {

      const payload = {
         email: testMail,
         password: testPassword
      }

      const result = await request(app).post('/accounts/login').send(payload)

      expect(result.status).toEqual(200)
      expect(result.body.auth).toBeTruthy()
      expect(result.body.token).toBeTruthy()

   })

   it('POST /accounts/login - 422 Unprocessable Entity', async () => {
      const payload = {
         email: testMail,
      }
 
      const result = await request(app).post('/accounts/login').send(payload)
 
      expect(result.status).toEqual(422)
   })

   it('POST /accounts/login - 401 Unauthorized', async () => {
      const payload = {
         email: testMail,
         password: testPassword + 'abc'
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