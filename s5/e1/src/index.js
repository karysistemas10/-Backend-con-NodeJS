import 'dotenv/config'
import { sequelize } from './db'
import { logger } from "./logger"
import { ApolloServer } from 'apollo-server'
import { typeDefs } from './schema'
import { resolvers } from './resolver'

// Ejemplo y reto 1
// const connection = async () => {
//   try {
//     await sequelize.authenticate()
//     logger.info('Conexión establecida!!!')
//     console.log(await sequelize.models.Book.findAll());
//     const book = await sequelize.models.Book.create({
//       asin: 'B0001244HBN',
//       title: 'NodeJS',
//       author: 'Beto',
//       pages: 200
//     });
//     console.log(book);
//     console.log(await sequelize.models.Book.findAll());
//   } catch (error) {
//     logger.error('Error al conectarse a la DB:', error)
//   }
// }
// connection()

// Ejemplo 02
const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  logger.info(`🚀  Servidor listo en ${url}, inicializado en ${process.env.NODE_ENV} a las ${new Date().toISOString()}`)
})