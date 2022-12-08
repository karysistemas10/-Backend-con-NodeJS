"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = void 0;
var _winston = _interopRequireDefault(require("winston"));
require("winston-daily-rotate-file");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const logger = _winston.default.createLogger({
  level: 'info',
  // format: winston.format.json(),
  format: _winston.default.format.combine(_winston.default.format.timestamp({
    format: 'YYYY-MM-DDTHH:mm:ss'
  }), _winston.default.format.errors({
    stack: true
  }), _winston.default.format.printf(({
    timestamp,
    level,
    message
  }) => `${timestamp} | ${level} | ${message}`)
  // winston.format.printf(({ timestamp, level, message }) => `{"time": "${timestamp}", "level": "${level}", "message": "${message}"}`)
  ),

  defaultMeta: {
    service: 'user-service'
  },
  transports: [
  //  new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  //  new winston.transports.File({ filename: 'logs/combined.log' })
  // Uso de transporte 'DailyRotateFile' con rotación por hora
  new _winston.default.transports.DailyRotateFile({
    level: 'error',
    filename: './logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '30m',
    maxFiles: '15d'
  }),
  // Uso de transporte 'DailyRotateFile' con rotación por minuto
  new _winston.default.transports.DailyRotateFile({
    filename: './logs/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH-mm',
    zippedArchive: true,
    maxSize: '30m',
    maxFiles: '15d'
  })]
});
exports.logger = logger;
if (process.env.NODE_ENV !== 'production') {
  logger.add(new _winston.default.transports.Console({
    format: _winston.default.format.simple()
  }));
}