"use strict";

require("dotenv/config");
var _sequelize = require("sequelize");
var _db = require("./db");
var _Book = _interopRequireDefault(require("./db/model/Book"));
var _logger = require("./logger");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//import { Console } from 'winston/lib/winston/transports'

//import Book from './db/model/Book'

const connection = async () => {
  try {
    await _db.sequelize.authenticate();
    _logger.logger.info('Conexion establecida');
    console.log(_db.sequelize.models.Book);
    console.log(await _db.sequelize.models.Book.findAll());
    const book = await _db.sequelize.models.Book.create({
      asin: '162839BSD',
      title: 'Hola Mundo',
      author: 'Ricardo Lopez',
      pages: 100
    }, {
      fields: ['id', 'asin', 'title', 'author', 'pages']
    });
    console.log(book);
    console.log(await _db.sequelize.models.Book.findAll());
  } catch (error) {
    _logger.logger.error('Error al conectarse a la BD:', error);
  }
};
connection();