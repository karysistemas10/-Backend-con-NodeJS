const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query {
    saludo: String,
    getExperto(id:ID!): Experto,
    getAllExpertos: [Experto],
    getBook(asin:ID!): Book,
    getAllBooks: [Book]
  },
  type Experto {
    id: ID,
    nombre: String,
    apellido: String
  },
  type Book {
    asin: ID,
    title: String,
    author: String,
    pages: Int
  }
`)

module.exports = { schema }