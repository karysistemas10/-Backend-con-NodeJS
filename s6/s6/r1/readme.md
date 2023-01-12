### Queries
```
query {
  getAllBooks {
    asin, author, pages, title
  },
  getBook(asin: "B0001244HBN") {
    asin, author, pages, title
  }
}
mutation {
  signIn(email: "beto@bedu.org", password: "b3T0P4$$w0rD"),
  signUp(
    input: {
      name: "Beto"
      lastname: "Bedu"
      email: "beto@bedu.org"
      password: "b3T0P4$$w0rD"
      isAdmin: true
    }
  ) {
    id
    name
    email
  }
}
```