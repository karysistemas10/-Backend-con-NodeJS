import {gql} from 'apollo-server'

export const typeDefs = gql`
  #Definición de schema
  type Query {
    helloWorld: String
    hello(nombre:String!): String,
    getAllLives:[Live],
    getLive(id:ID!): Live
  }
  type Live{
    id: ID,
    title:. String,
    picture: String,
    date: String
  }
`