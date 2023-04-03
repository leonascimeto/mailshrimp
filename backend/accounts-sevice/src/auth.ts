import bcrypt from 'bcryptjs'
import jwt, {VerifyOptions} from 'jsonwebtoken'
import fs from 'fs'

const privateKey = fs.readFileSync('./keys/private.key', 'utf8')
const publicKey = fs.readFileSync('./keys/public.key', 'utf8')
const jwtExpirySeconds = parseInt(`${process.env.JWT_EXPIRES}`)
const algorithmJWT = 'RS256'

function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10)
}

function comparePassword(password: string, hashPassword: string) {
   return bcrypt.compareSync(password, hashPassword)
}

type Token = { accountID: number }

function sign(accountID: number) {
  const token = { accountID }
  return jwt.sign(token, privateKey, { expiresIn: jwtExpirySeconds, algorithm: algorithmJWT })
}

async function verify(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey, { algorithms: [algorithmJWT] } as VerifyOptions) as Token

    return { accountID: decoded.accountID }
  } catch (error) {
    console.log(`error: ${error}`)
    return null
  }
}

export { hashPassword, comparePassword, sign, verify }