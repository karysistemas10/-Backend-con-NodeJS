
import { sequelize } from "./db"

export const resolvers = {
    Query: {
        getAllBooks: async () => await sequelize.models.Book.findAll()
    }
}