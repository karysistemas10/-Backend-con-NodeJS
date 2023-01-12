import { sequelize } from "./db"
import { logger } from "./logger"
import {ApolloError}

export const resolvers = {
  Query: {
    getAllBooks: async () => await sequelize.models.Book.findAll(),
    getBook: async (_,{asin})=> {
        return await sequelize.models.Book.findOne({
            where: {asin} //asin
        })
    }
  },

  Mutation: {
    updateBook: async (_, { asin, title, author, pages }) => {
        // buscamos el libro con base al asin proporcionado
        let bookFound = await sequelize.models.Book.findOne({
            where: {asin}
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
        // actualizamos el libro
        bookFound.save()
        return bookFound;
    },
}
}