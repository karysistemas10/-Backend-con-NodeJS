"use strict";

require("dotenv/config");
var _db = require("./db");
var _logger = require("./logger");
var _apolloServer = require("apollo-server");
var _schema = require("./schema");
var _resolver = require("./resolver");
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
const server = new _apolloServer.ApolloServer({
  typeDefs: _schema.typeDefs,
  resolvers: _resolver.resolvers
});
server.listen().then(({
  url
}) => {
  _logger.logger.info(`🚀  Servidor listo en ${url}, inicializado en ${process.env.NODE_ENV} a las ${new Date().toISOString()}`);
});