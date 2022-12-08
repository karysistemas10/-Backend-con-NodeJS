import 'dotenv/config'
import {sequelize} from './db'
import {logger} from "./logger"
import {ApolloServer} from 'apollo-server'
import {typeDefs} from './resolver'
import { typeDefs } from './schema'

const server = ApolloServer({})


/* Reto1 
const connection = async () => {
    try{
        await sequelize.authenticate()
        logger.info('Conexion establecida')
        console.log(sequelize.models.Book);
        console.log (await sequelize.models.Book.findAll());
        const book = await sequelize.models.Book.create({ 
            asin: '162839BSD',
            title:'Hola Mundo',
            author: 'Ricardo Lopez',
            pages: 100
        },{fields: ['id','asin','title','author','pages']});
        console.log(book);
        console.log (await sequelize.models.Book.findAll()); 
    } catch (error) {
        logger.error('Error al conectarse a la BD:', error)
    }
}
connection()
*/

//Ejemplo 2
