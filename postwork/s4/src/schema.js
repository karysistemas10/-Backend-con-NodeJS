import {gql} from 'apollo-server'

export const typeDefs = gql`
  type Query {
    getAllLives: [Live],
    getLive(id:ID!): Live
  }
  type Mutation {
    insertLive(id:ID!,title:String, picture:String, date:String): Live,
    updateLive(id:ID!,title:String, picture:String, date:String): Live
  }
  type Live {
    id: ID,
    title: String,
    picture: String,
    date: String
  }
`