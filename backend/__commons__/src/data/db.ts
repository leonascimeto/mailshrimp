//db.ts
import { Sequelize } from 'sequelize'

const dbName = process.env.DB_NAME!
const dbUser = process.env.DB_USER!
const dbPassword = process.env.DB_PASSWORD!
const dbHost = process.env.DB_HOST!

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {host: dbHost, dialect: 'mysql', logging: false})

console.log({dbName, dbUser, dbPassword, dbHost})

console.log('Connecting to database...')

export default sequelize
