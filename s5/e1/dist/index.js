"use strict";

require("dotenv/config");
var _db = require("./db");
var _logger = require("./logger");
const connection = async () => {
  try {
    await _db.sequelize.authenticate();
    _logger.logger.info('Conexion establecida');
  } catch (error) {
    _logger.logger.error('Error al conectarse a la BD:', error);
  }
};
connection();