"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;
var _db = require("./db");
var _logger = require("./logger");
const resolvers = {
  Query: {
    getAllBooks: async () => await _db.sequelize.models.Book.findAll(),
    getBook: async (_, {
      asin
    }) => {
      return await _db.sequelize.models.Book.findOne({
        where: {
          asin
        } //asin
      });
    }
  },

  Mutation: {
    updateBook: async (_, {
      asin,
      title,
      author,
      pages
    }) => {
      // buscamos el libro con base al asin proporcionado
      let bookFound = await _db.sequelize.models.Book.findOne({
        where: {
          asin
        }
      });
      // Sino lo encontramos lanzamos un error
      if (!bookFound) {
        _logger.logger.error(`Book not found with asin: ${asin}`);
        throw new ApolloError('Book not found', 'ERR003');
      }
      // En caso de encontrarlo actualizamos las propiedades que no vengan nulas
      title && (bookFound.title = title);
      author && (bookFound.author = author);
      pages && (bookFound.pages = pages);
      // actualizamos el libro
      bookFound.save();
      return bookFound;
    }
  }
};
exports.resolvers = resolvers;