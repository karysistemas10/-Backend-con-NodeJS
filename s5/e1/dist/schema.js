"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDefs = void 0;
var _apolloServer = require("apollo-server");
const typeDefs = (0, _apolloServer.gql)`
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
`;
exports.typeDefs = typeDefs;