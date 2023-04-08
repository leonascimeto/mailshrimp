import contact, { IContactModel } from "./contactModel"
import { IContact } from "./contact"

function findAll(accountId: number): Promise<IContactModel[]> {
   return contact.findAll<IContactModel>({ where: { accountId } })
}

export default { findAll }