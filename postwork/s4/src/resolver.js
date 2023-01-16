import { sequelize } from "./db"
import { logger } from "./logger"
import { ApolloError } from "apollo-server-errors"

export const resolvers = {
  Query: {
    getAllLives: async () => await sequelize.models.Live.findAll(),
    getLive: async (_, { id }) => {
      return await sequelize.models.Live.findOne({
        where: { id } 
      })
    }
  },
  Mutation: {
    insertLive: async (_, { id, title, picture, date }) => {
      return await sequelize.models.Live.create({
        id, title, picture, date
      })
    },
    updateLive: async (_, { id, title, picture, date }) => {
      // buscamos el libro con base al asin proporcionado
      let liveFound = await sequelize.models.Live.findOne({
        where: { id } 
      })
      // Sino lo encontramos lanzamos un error
      if (!liveFound) {
          logger.error(`Live not found with asin: ${id}`)
          throw new ApolloError('Live not found', 'ERR003');
      }
      // En caso de encontrarlo actualizamos las propiedades que no vengan nulas
      title && (liveFound.title = title)
      picture && (liveFound.picture = picture)
      date && (liveFound.date = date)
      // Actualizamos el libro
      liveFound.save()
      return liveFound;
  },
  }
}
