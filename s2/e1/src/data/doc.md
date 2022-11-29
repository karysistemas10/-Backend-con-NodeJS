### Buscar curso por id
{
  Curso(id: 101) {
    id,
    title,
    rating,
    experto_id,
    Experto {
      id,
      name
    }
  }
}

### Buscar por todos los cursos
{
  allCursos(page: 0, perPage: 5, filter:{ rating_lte: 4.9 }) {
    id, title, rating, Experto {
      id,name
    }
  }
}

### Añadir curso
mutation{
  createCurso(
    title: "ReactJS",
    rating: 4.2,
    experto_id: 333
  ) {
    id
  }
}

### Eliminar curso
mutation{
  removeCurso(id: 104) {
    id
  }
}

### Actualizar curso
mutation{
  updateCurso(
    id: 103,
    title: "Reactjs",
    rating: 5,
    experto_id: 334
  ) {
    id
  }
}