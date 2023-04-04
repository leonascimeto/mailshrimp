import  Sequelize, { Model, Optional } from 'sequelize'
import database from '../db'
import { IAccount } from './accounts'

interface AccountCreationAttributes extends Optional<IAccount, 'id'> {}

export interface IAccountModel extends Model<IAccount, AccountCreationAttributes>, IAccount{}

export default database.define<IAccountModel>('accounts', {
   id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
   },
   name: {
      type: Sequelize.STRING(150),
      allowNull: false,
   },
   email: {
      type: Sequelize.STRING(150),
      allowNull: false,
      unique: true
   },
   password: {
      type: Sequelize.STRING(50),
      allowNull: false
   },
   status: {
      type: Sequelize.SMALLINT.UNSIGNED,
      allowNull: false,
      defaultValue: 100
   },
   domain: {
      type: Sequelize.STRING(100),
      allowNull: false,
   }
})
