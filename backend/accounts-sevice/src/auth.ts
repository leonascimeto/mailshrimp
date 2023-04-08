import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import authCommons, {Token} from 'ms-commons/api/auth'
import path from 'path'

const privateKey = fs.readFileSync(path.resolve(__dirname,'../keys/private.key'), 'utf8')
const jwtExpirySeconds = parseInt(`${process.env.JWT_EXPIRES}`)
const algorithmJWT = 'RS256'

function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10)
}

function comparePassword(password: string, hashPassword: string) {
   return bcrypt.compareSync(password, hashPassword)
}

function sign(accountID: number) {
  const token: Token = { accountID }
  return jwt.sign(token, privateKey, { expiresIn: jwtExpirySeconds, algorithm: algorithmJWT })
}

async function verify(token: string) {
  return authCommons.verify(token)
}

export { hashPassword, comparePassword, sign, verify }