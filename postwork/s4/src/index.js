import 'dotenv/config'
import { sequelize } from './db'
import {logger} from './logger'
import { ApolloServer}from 'apollo-server'
import {resolvers} from './resolver'
import {typeDefs} from './schema'

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
logger.info(`🐈 Servidor corriendo en: 🔥 ${url},se inicializo en: ${process.env.NODE_ENV} a las: ${new Date()}`)
})

const connection = async () => {
  try{
    await sequelize.authenticate()
    logger.info('Conexion establecida!!!')

  }catch (error){
    logger.error('Error al conectarse a la BD', error)

  }
}
//connection()

