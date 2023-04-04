import { Request, Response } from "express"
import Joi from "joi"
import { verify } from "../auth"
import { accountSchema, loginSchema, accountUpdateSchema } from "../models/accountsSchemas"

function validateSchema(schema: Joi.ObjectSchema<any>, req: Request, res: Response, next: any) {
   const {error} = schema.validate(req.body)
   if (error == null) return next()

   const {details} = error
   const message = details.map(i => i.message).join(',')

   console.log(message)
   res.status(422).end()
}

function validateAccountSchema(req: Request, res: Response, next: any) {
   return validateSchema(accountSchema, req, res, next)
}

function validateUpdateAccountSchema(req: Request, res: Response, next: any) {
   return validateSchema(accountUpdateSchema, req, res, next)
}

function validateLoginSchema(req: Request, res: Response, next: any) {
   return validateSchema(loginSchema, req, res, next)
}

async function validateAuth(req: Request, res: Response, next: any) {
   try {
      const token = req.headers.authorization as string
      console.log({token})
      if(!token) return res.status(401).end()

      const payload = await verify(token)
      if(!payload) return res.status(401).end()

      res.locals.payload = payload

      next()   
   } catch (error) {
      console.log(error)
      res.status(400).end()
   }
}

export {validateAccountSchema, validateLoginSchema, validateUpdateAccountSchema, validateAuth}