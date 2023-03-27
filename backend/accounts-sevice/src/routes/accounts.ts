import { Router} from 'express'
import { addAccount, getAccount, getAccounts, loginAccount, logout, setAccount } from '../controllers/accounts'
import { validateAccounts, validateLogin } from './middlewares'

const router = Router()

router.get('/accounts/', getAccounts)

router.get('/accounts/:id', getAccount)

router.patch('/accounts/:id', validateAccounts, setAccount)

router.post('/accounts/', validateAccounts, addAccount)

router.post('/accounts/login', validateLogin, loginAccount)

router.post('/accounts/logout', logout)

export default router