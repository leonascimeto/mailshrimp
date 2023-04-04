import { DestroyOptions } from "sequelize";
import accountModel, { IAccountModel } from "./accountModel";
import { IAccount } from "./accounts";

export function findAll(){
   return accountModel.findAll<IAccountModel>();
}

export function findById(id: number){
   return accountModel.findByPk<IAccountModel>(id);
}

export function findByEmail(email: string){
   return accountModel.findOne<IAccountModel>({where: {email}});
}

export function createAccount(account: IAccount){
   return accountModel.create<IAccountModel>(account);
}

export async function updateAccount(id: number, account: IAccount){
   const originalAccount = await accountModel.findByPk<IAccountModel>(id);
   if(originalAccount){
      if(account.email) originalAccount.email = account.email
      if(account.name) originalAccount.name = account.name
      if(account.status) originalAccount.status = account.status
      if(account.domain) originalAccount.domain = account.domain
      if(account.password) originalAccount.password = account.password


      await originalAccount.save()
      return originalAccount
   }
   return null
}

export function deleteAccount(id: number){
   return accountModel.destroy({where: {id}} as DestroyOptions<IAccount>)
}

export function deleteByEmail(email: string){
   return accountModel.destroy({where: {email}} as DestroyOptions<IAccount>)
}