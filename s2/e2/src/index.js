const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { resolver } = require('./resolver')
const { schema } = require('./schema')

const app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolver,
  graphiql: true
}))
app.listen(4000)