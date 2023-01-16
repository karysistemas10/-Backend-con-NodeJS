export const resolvers = {
  Query: {
    helloWorld: () => `Hola mundo!!!`,
    hello: (_,{nombre}) => `Hola ${nombre}`,
    getAllLives: () => lives,
    getLive:(_,{id}) => lives.find(b => b.id == id)
    
  }
}

const lives = [
  { id: 1, title: 'Transformación Digital: ¿En qué etapa va tu empresa?', picture:"https://assets-bedu.org/images/Panel_26_ENE.png", date: "2022-01-27" },
  { id: 2, title: 'The Matrix: ¿Sería posible con Inteligencia Artificial?', picture:"https://assets-bedu.org/images/Live_YT_12E.png", date: "2022-01-13"  },
  { id: 3, title: 'Capacita a tu personal y genera lealtad con tus empleados', picture: "https://assets-bedu.org/images/Live_Youtube.png", date: "2022-01-02"  }
]