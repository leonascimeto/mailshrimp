import  Sequelize, { Model, Optional } from 'sequelize'
import database from '../db'
import { IAccount } from './accounts'

interface AccountCreationAttributes extends Optional<IAccount, 'id'> {}

export interface AccountModel extends Model<IAccount, AccountCreationAttributes>, IAccount{}

const accountModel =  database.define<AccountModel>('accounts', {
   id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
   },
   name: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
   },
   password: {
      type: Sequelize.STRING,
      allowNull: false
   },
   status: {
      type: Sequelize.SMALLINT.UNSIGNED,
      allowNull: false,
      defaultValue: 100
   },
   domain: {
      type: Sequelize.STRING,
      allowNull: false,
   }
})

export function findAll(){
   return accountModel.findAll<AccountModel>();
}

export function findById(id: number){
   return accountModel.findByPk<AccountModel>(id);
}

export function findByEmail(email: string){
   return accountModel.findOne<AccountModel>({where: {email}});
}

export function createAccount(account: IAccount){
   return accountModel.create<AccountModel>(account);
}

export async function updateAccount(id: number, account: IAccount){
   const originalAccount = await accountModel.findByPk<AccountModel>(id);
   if(originalAccount){
      originalAccount.name = account.name
      originalAccount.domain = account.domain
      originalAccount.status = account.status

      if(!originalAccount.password) originalAccount.password = account.password

      await originalAccount.save()
      return originalAccount
   }

   throw new Error('Account not found')
}