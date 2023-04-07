import { Request, Response } from "express"
import commonsMiddlewares from 'ms-commons/api/routes/middlewares'
import { accountSchema, loginSchema, accountUpdateSchema } from "../models/accountsSchemas"

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

export {validateAccountSchema, validateLoginSchema, validateUpdateAccountSchema, validateAuth}