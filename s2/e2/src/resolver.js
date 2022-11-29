const resolver = {
  saludo: () => 'Hola Beto!',
  getExperto: ({ id }) => expertos.find(e => e.id == id),
  getAllExpertos: () => expertos,
  getBook: ({ asin }) => books.find(b => b.asin == asin),
  getAllBooks: () => books
}

const expertos = [
  {id: 333, nombre: "Andrés", apellido: "Ramirez"},
  {id: 334, nombre: "Carlos", apellido: "Cortes"},
  {id: 335, nombre: "Luis", apellido: "Ramos"}
]

const books = [
  { asin: 'B00DQ845EA', title: 'The Hard Thing About Hard Things', author: 'Ben Horowitz', pages: 308 },
  { asin: 'B015NTIXWE', title: 'Ego Is the Enemy', author: 'Ryan Holiday', pages: 247 },
  { asin: 'B00ICN066A', title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', pages: 469 },
]

module.exports = { resolver }