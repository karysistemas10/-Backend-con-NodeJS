### Consultas multiples
{
  getBook(asin: "B015NTIXWE") {
    asin
    title
    author
    pages
  },
  getExperto(id: 335) {
    id, nombre, apellido
  },
  getAllBooks{
    asin,
    title
  },
  getAllExpertos{
    nombre
  }
}