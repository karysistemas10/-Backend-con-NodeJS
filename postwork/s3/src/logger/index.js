const winston = require('winston')

const logger = winston.createLogger({
    level:'info',
    //format: winston.format.json(),
    format: winston.format.combine(
        winston.format.timestamp({ format:'YYYY-MM-DDTHH:mm:ss'}),
        winston.format.errors({stack: true}),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} | ${level} | ${message}`)
    ),
    defaultMeta: {service: 'user-service'},
    transports:[
        new winston.transports.File({filename: 'logs/error.log',level: 'error'}),
        new winston.transports.File({filename: 'logs/combined.log'})
    ]
})
if(process.env.NODE_ENV !== 'production'){
    logger.add(new winston.transports.Console({
        format:winston.format.simple()
    }))
}

module.exports = {logger}