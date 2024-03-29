import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Query {
    getAllBooks: [Book],
    getBook(asin:ID!); Book
  }
  type Book {
    asin: ID,
    title: String,
    author: String,
    pages: Int
  }

  type Mutation {
    updateBook(asin:ID!,title:String, author:String, pages:Int): Book
  }
`


