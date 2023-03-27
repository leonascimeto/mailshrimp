import { Request, Response } from "express"
import Joi from "joi"
import { accountSchema, loginSchema } from "../models/accounts"

function validateSchema(schema: Joi.ObjectSchema<any>, req: Request, res: Response, next: any) {
   const {error} = schema.validate(req.body)
   if (error == null) return next()

   const {details} = error
   const message = details.map(i => i.message).join(',')

   console.log(message)
   res.status(422).end()
}

function validateAccounts(req: Request, res: Response, next: any) {
   return validateSchema(accountSchema, req, res, next)
}

function validateLogin(req: Request, res: Response, next: any) {
   return validateSchema(loginSchema, req, res, next)
}

export {validateAccounts, validateLogin}