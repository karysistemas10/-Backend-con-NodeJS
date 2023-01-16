"use strict";

const {
  buildSchema
} = require('graphql');
const schema = buildSchema(`
  type Query {
    getLive(id:ID!): Live,
    getAllLives: [Live]
  },
  type Live {
    id: ID,
    title: String,
    picture: String,
    date: String
  }
`);
module.exports = {
  schema
};