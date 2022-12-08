import winston from 'winston'
import 'winston-daily-rotate-file'

export const logger = winston.createLogger({
  level: 'info',
  // format: winston.format.json(),
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} | ${level} | ${message}`)
    // winston.format.printf(({ timestamp, level, message }) => `{"time": "${timestamp}", "level": "${level}", "message": "${message}"}`)
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
   //  new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
   //  new winston.transports.File({ filename: 'logs/combined.log' })
   // Uso de transporte 'DailyRotateFile' con rotación por hora
   new winston.transports.DailyRotateFile({
      level: 'error',
      filename: './logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '30m',
      maxFiles: '15d'
   }),
   // Uso de transporte 'DailyRotateFile' con rotación por minuto
   new winston.transports.DailyRotateFile({
      filename: './logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH-mm',
      zippedArchive: true,
      maxSize: '30m',
      maxFiles: '15d'
   }),
  ]
})

if(process.env.NODE_ENV !== 'production'){
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}