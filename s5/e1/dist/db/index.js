"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = void 0;
var _sequelize = require("sequelize");
var _logger = require("../logger");
var _Book = _interopRequireDefault(require("./model/Book"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const sequelize = new _sequelize.Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: msg => _logger.logger.debug(msg)
});
exports.sequelize = sequelize;
(0, _Book.default)(sequelize, _sequelize.DataTypes);
if (process.env.NODE_ENV !== 'productivo') {
  const syncDB = async () => await sequelize.sync();
  syncDB();
}