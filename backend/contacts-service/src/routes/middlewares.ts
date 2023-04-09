import { Request, Response } from "express"
import commonsMiddlewares from 'ms-commons/api/routes/middlewares'
import { contactSchema, contactUpdateSchema } from "../models/contactSchemas"

function validateContactSchema(req: Request, res: Response, next: any) {
   return commonsMiddlewares.validateSchema(contactSchema, req, res, next)
}

function validateUpdateContactSchema(req: Request, res: Response, next: any): any {
   return commonsMiddlewares.validateSchema(contactUpdateSchema, req, res, next)
}


export { validateContactSchema, validateUpdateContactSchema }