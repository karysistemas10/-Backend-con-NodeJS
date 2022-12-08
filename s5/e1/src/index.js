import 'dotenv/config'
//import { Console } from 'winston/lib/winston/transports'
import {sequelize} from './db'
//import Book from './db/model/Book'
import {logger} from "./logger"

const connection = async () => {
    try{
        await sequelize.authenticate()
        logger.info('Conexion establecida')
        console.log(sequelize.models.Book);
        
        Console.log(await Book.findAll());
        const book = await Book.create({

        })
    } catch (error) {
        logger.error('Error al conectarse a la BD:', error)
    }
}
connection()