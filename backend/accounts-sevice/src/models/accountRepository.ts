import { DestroyOptions } from "sequelize";
import accountModel, { IAccountModel } from "./accountModel";
import { IAccount } from "./accounts";

function findAll(){
   return accountModel.findAll<IAccountModel>();
}

function findById(id: number){
   return accountModel.findByPk<IAccountModel>(id);
}

function findByEmail(email: string){
   return accountModel.findOne<IAccountModel>({where: {email}});
}

function createAccount(account: IAccount){
   return accountModel.create<IAccountModel>(account);
}

async function updateAccount(id: number, account: IAccount){
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

function deleteAccount(id: number){
   return accountModel.destroy({where: {id}} as DestroyOptions<IAccount>)
}

function deleteByEmail(email: string){
   return accountModel.destroy({where: {email}} as DestroyOptions<IAccount>)
}

export default { createAccount, deleteAccount, deleteByEmail, findAll, findByEmail, findById, updateAccount }
