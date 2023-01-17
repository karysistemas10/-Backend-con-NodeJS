import { sequelize } from "./db"
import { logger } from "./logger"
import { ApolloError, AuthenticationError } from "apollo-server-errors"
import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { verifyToken } from "./auth"

const SALT_ROUNDS = 10

export const resolvers = {
    Query: {
      getAllLives: async (_, __, { token }) =>  verifyToken(token) && await sequelize.models.Live.findAll(),
      getLive: async (_, { id }, { token }) => {
        console.log(token)
        return await sequelize.models.Live.findOne({
          where: { id } 
        })
      }
    },
  Mutation: {
    insertLive: async (_, { id, title, picture, date }) => {
      return await sequelize.models.Live.create({
        id, title, picture, date
      })
    },
    updateLive: async (_, { id, title, picture, date }) => {
      // buscamos el libro con base al asin proporcionado
      let liveFound = await sequelize.models.Live.findOne({
        where: { id } 
      })
      // Sino lo encontramos lanzamos un error
      if (!liveFound) {
          logger.error(`Live not found with asin: ${id}`)
          throw new ApolloError('Live not found', 'ERR003');
      }
      // En caso de encontrarlo actualizamos las propiedades que no vengan nulas
      title && (liveFound.title = title)
      picture && (liveFound.picture = picture)
      date && (liveFound.date = date)
      // Actualizamos el libro
      liveFound.save()
      return liveFound;
   },
   signUp: async (_, { input: user }) => {
    user.password = await hash(user.password, SALT_ROUNDS)
    return await sequelize.models.User.create({ ...user })
  },
  signIn: async (_, { email, password }) => {
    const user = await sequelize.models.User.findOne({ where: { email } })
    if (user && await compare(password, user.password)){
      const tokenData = {
        fullName: user.name + ' ' + user.lastname,
        email,
        isAdmin: user.isAdmin
      }
      logger.info(`signIn: Usuario ${user.id} accedio`)
      return sign(tokenData, process.env.JWT_SECRET, { expiresIn: '8h' })
    } else {
      logger.error(`signIn: Credenciales invalidas para ${email}`)
      throw new AuthenticationError('Invalid credentials')
    }
  }
}
}