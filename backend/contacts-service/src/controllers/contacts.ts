import { Request, Response } from 'express';
import repository from '../models/contactRepository';
import controllerCommons from 'ms-commons/api/controllers/controller';
import {Token} from 'ms-commons/api/auth';
import { IContact } from 'src/models/contact';

async function getContacts(req: Request, res: Response, next: any) {
   try {
      const token = controllerCommons.getToken(res) as Token
      const contacts = await repository.findAll(token.accountID)
      res.json(contacts)
   } catch (error) {
      console.log(`getContacts error: ${error}`)
      return res.status(400).end()
   }
}

async function getContact(req: Request, res: Response, next: any) {
   try {
      const id = +req.params.id
      if(!id) return res.status(400).end()

      const token = controllerCommons.getToken(res) as Token
      const contact = await repository.findById(id, token.accountID)
      if(!contact) return res.status(404).end();
   
      res.json(contact)
   } catch (error) {
      console.log(`getContact error: ${error}`)
      return res.status(400).end()
   }
}

async function addContact(req: Request, res: Response, next: any) {
   try {
      const contact: IContact = req.body as IContact
      const token = controllerCommons.getToken(res) as Token
      const newContact = await repository.addContact(contact, token.accountID)
      res.status(201).json(newContact)
   } catch (error) {
      console.log(`addContact error: ${error}`)
      return res.status(400).end()
   }
}

async function setContact(req: Request, res: Response, next: any) {
   try {
      const id = +req.params.id
      if(!id) return res.status(400).end()

      const contact: IContact = req.body as IContact
      const token = controllerCommons.getToken(res) as Token
      const updatedContact = await repository.set(id, contact, token.accountID)
      if(!updatedContact) return res.status(404).end();

      res.json(updatedContact)
   } catch (error) {
      console.log(`setContact error: ${error}`)
      return res.status(400).end()
   }
}


export default { getContacts, getContact, addContact, setContact }
