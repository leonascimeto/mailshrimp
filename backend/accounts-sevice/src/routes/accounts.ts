import { Router} from 'express'
import { addAccount, getAccount, getAccounts, loginAccount, logout, setAccount } from '../controllers/accounts'
import { validateAccounts, validateLogin, validateUpdateAccounts, validateAuth } from './middlewares'

const router = Router()

router.get('/accounts/', validateAuth, getAccounts)

router.get('/accounts/:id', validateAuth, getAccount)

router.patch('/accounts/:id', validateAuth, validateUpdateAccounts, setAccount)

router.post('/accounts/', validateAccounts, addAccount)

router.post('/accounts/login', validateLogin, loginAccount)

router.post('/accounts/logout', validateAuth, logout)

export default router