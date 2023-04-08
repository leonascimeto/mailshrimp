import { Request, Response } from "express"
import commonsMiddlewares from 'ms-commons/api/routes/middlewares'
import { accountSchema, loginSchema, accountUpdateSchema } from "../models/accountsSchemas"

import commonsController from 'ms-commons/api/controllers/controller'
import { Token } from "ms-commons/api/auth"

function validateAccountSchema(req: Request, res: Response, next: any) {
   return commonsMiddlewares.validateSchema(accountSchema, req, res, next)
}

function validateUpdateAccountSchema(req: Request, res: Response, next: any): any {
   return commonsMiddlewares.validateSchema(accountUpdateSchema, req, res, next)
}

function validateLoginSchema(req: Request, res: Response, next: any) {
   return commonsMiddlewares.validateSchema(loginSchema, req, res, next)
}

async function validateAuth(req: Request, res: Response, next: any) {
   return commonsMiddlewares.validateAuth(req, res, next)
}

function bouncerAuthorize(req: Request, res: Response, next: any) {
   const accountId = +req.params.id
    if(!accountId) return res.status(400).end()

    const token = commonsController.getToken(res) as Token
    if(accountId !== token.accountID) return res.status(403).end()

    next()
}

export {validateAccountSchema, validateLoginSchema, validateUpdateAccountSchema, validateAuth, bouncerAuthorize}