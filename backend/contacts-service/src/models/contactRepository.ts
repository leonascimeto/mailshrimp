import contactModel, { IContactModel } from "./contactModel"
import { IContact } from "./contact"
import { DestroyOptions } from "sequelize"

function findAll(accountId: number): Promise<IContactModel[]> {
   return contactModel.findAll<IContactModel>({ where: { accountId } })
}

function findById(id: number, accountId: number): Promise<IContactModel | null> {
   return contactModel.findOne<IContactModel>({ where: { id, accountId } })
}

async function addContact(contact: IContact, accountId: number)
 {
   contact.accountId = accountId
   const result = await contactModel.create<IContactModel>(contact) 
   contact.id = result.id!
   return contact
}

async function set(contactId: number, contact: IContact, accountId: number)
 {
   const originalContact = await contactModel.findOne({ where: { id: contactId, accountId } })

   if(!originalContact) return null
   if(contact.name) originalContact.name = contact.name
   if(contact.phone) originalContact.phone = contact.phone
   if(contact.status) originalContact.status = contact.status

   const result = await originalContact.save()
   contact.id = result.id!
   return contact
}

function deleteById(id: number, accountId: number){
   return contactModel.destroy({ where: { id, accountId } } as DestroyOptions<IContact>)
}

function deleteByEmail(email: string, accountId: number){
   return contactModel.destroy({ where: { email, accountId } } as DestroyOptions<IContact>)
}

export default { findAll, findById, addContact, deleteById, deleteByEmail, set }