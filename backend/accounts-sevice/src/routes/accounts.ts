import { Router} from 'express'
import accountsController from '../controllers/accounts'
import { validateAccountSchema, validateLoginSchema, validateUpdateAccountSchema, validateAuth, bouncerAuthorize } from './middlewares'


const router = Router()

router.get('/accounts/', validateAuth, accountsController.getAccounts)

router.get('/accounts/:id', validateAuth, bouncerAuthorize, accountsController.getAccount)

router.patch('/accounts/:id', validateAuth, bouncerAuthorize, validateUpdateAccountSchema, accountsController.setAccount)

router.post('/accounts/', validateAccountSchema, accountsController.addAccount)

router.post('/accounts/login', validateLoginSchema, accountsController.loginAccount)

router.post('/accounts/logout', accountsController.logout)

router.delete('/accounts/:id', validateAuth, bouncerAuthorize, accountsController.deleteAccounts)

export default router
