import 'dotenv/config'
import {logger} from './logger'
import { ApolloServer}from 'apollo-server'
import {resolvers} from './resolver'
import {typeDefs} from './schema'

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
  logger.info(`Servidor corriendo en ${url}`)
})
