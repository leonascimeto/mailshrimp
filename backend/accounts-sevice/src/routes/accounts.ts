import { Router} from 'express'
import { addAccount, getAccount, getAccounts, loginAccount, logout, setAccount } from '../controllers/accounts'
import { validateAccountSchema, validateLoginSchema, validateUpdateAccountSchema, validateAuth } from './middlewares'


const router = Router()

router.get('/accounts/', validateAuth, getAccounts)

router.get('/accounts/:id', validateAuth, getAccount)

router.patch('/accounts/:id', validateAuth, validateUpdateAccountSchema, setAccount)

router.post('/accounts/', validateAccountSchema, addAccount)

router.post('/accounts/login', validateLoginSchema, loginAccount)

router.post('/accounts/logout', logout)


export default router