import jwt, {VerifyOptions} from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

const publicKey = fs.readFileSync(path.resolve(__dirname, '../../keys/public.key'), 'utf8')
const algorithmJWT = 'RS256'

export type Token = { accountID: number }

async function verify(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey, { algorithms: [algorithmJWT] } as VerifyOptions) as Token

    return { accountID: decoded.accountID }
  } catch (error) {
    console.log(`error: ${error}`)
    return null
  }
}

export default { verify }