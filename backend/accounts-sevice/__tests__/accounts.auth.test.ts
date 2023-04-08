import {jest, describe, expect, it, beforeAll, afterAll} from '@jest/globals'
import request from 'supertest'
import app from '../src/app'
import repository from '../src/models/accountRepository'
import { IAccount } from '../src/models/accounts'
import { sign, verify } from '../src/auth'

const testMail = 'jest@jest.com'
const hashPassword = '$2a$10$2K03Fc6d.U/nfVVVYecvtui5qdSpzu/OU8mfur57toHXSCPSGvWdm' // 123456789
const testPassword = '123456'

let tokenJWT: string | null = null
let testAccointId = 0

beforeAll(async () => {
   const testAccount: IAccount = {
      name: 'jest',
      email: testMail,
      password: hashPassword,
      domain: 'jest.com'
   }
   const result = await repository.createAccount(testAccount)
   testAccointId = result.id!
   tokenJWT = sign(testAccointId)
})

afterAll(async () => {
   const result = await repository.deleteByEmail(testMail)
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
      
      const result = await request(app)
         .post('/accounts/logout')
         .set('Authorization', `${tokenJWT}`)

      expect(result.status).toEqual(200)
      expect(result.body.auth).toBeFalsy()
      expect(result.body.token).toBeNull()
   })

   
})
