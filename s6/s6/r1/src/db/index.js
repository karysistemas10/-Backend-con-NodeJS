import { Sequelize, DataTypes } from 'sequelize'
import { logger } from '../logger'
import Book from './model/Book'
import User from './model/User'

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: msg => logger.debug(msg)
})

Book(sequelize, DataTypes)
User(sequelize, DataTypes)

if (process.env.NODE_ENV !== 'productivo'){
  const syncDB = async () => await sequelize.sync()
  syncDB()
}