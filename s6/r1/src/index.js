import 'dotenv/config'
import { logger } from "./logger"
import { ApolloServer } from 'apollo-server'
import { typeDefs } from './schema'
import { resolvers } from './resolver'

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: async ({ req }) => {
    return {
      token: req.headers.authorization
    }
  }
})

server.listen().then(({ url }) => {
  console.log(url);
  logger.info(`🚀  Servidor listo en ${url}, inicializado en ${process.env.NODE_ENV} a las ${new Date().toISOString()}`)
})