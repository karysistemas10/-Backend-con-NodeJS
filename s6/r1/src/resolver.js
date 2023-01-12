import { sequelize } from "./db"
import { logger } from "./logger"
import { ApolloError, AuthenticationError } from "apollo-server-errors"
import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { verifyToken } from "./auth"

const SALT_ROUNDS = 10

export const resolvers = {
  Query: {
    getAllBooks: async (_, __, { token }) =>  verifyToken(token) && await sequelize.models.Book.findAll(),
    getBook: async (_, { asin }, { token }) => {
      verifyToken(token)
      return await sequelize.models.Book.findOne({
        where: { asin } // asin: asin
      })
    }
  },
  Mutation: {
    insertBook: async (_, { asin, title, author, pages }) => {
      return await sequelize.models.Book.create({
        asin, title, author, pages
      })
    },
    updateBook: async (_, { asin, title, author, pages }) => {
      // buscamos el libro con base al asin proporcionado
      let bookFound = await sequelize.models.Book.findOne({
        where: { asin } // asin: asin
      })
      // Sino lo encontramos lanzamos un error
      if (!bookFound) {
          logger.error(`Book not found with asin: ${asin}`)
          throw new ApolloError('Book not found', 'ERR003');
      }
      // En caso de encontrarlo actualizamos las propiedades que no vengan nulas
      title && (bookFound.title = title)
      author && (bookFound.author = author)
      pages && (bookFound.pages = pages)
      // Actualizamos el libro
      bookFound.save()
      return bookFound;
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
        return sign(tokenData, process.env.JWT_SECRET, { expiresIn: 180 })
      } else {
        logger.error(`signIn: Credenciales invalidas para ${email}`)
        throw new AuthenticationError('Invalid credentials')
      }
    }
  }
}