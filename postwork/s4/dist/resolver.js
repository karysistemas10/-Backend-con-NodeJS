"use strict";

const resolver = {
  saludo: () => 'Hola Kary!',
  getLive: ({
    id
  }) => lives.find(b => b.id == id),
  getAllLives: () => lives
};
const lives = [{
  id: 1,
  title: 'Transformación Digital: ¿En qué etapa va tu empresa?',
  picture: "https://assets-bedu.org/images/Panel_26_ENE.png",
  date: "2022-01-27"
}, {
  id: 2,
  title: 'The Matrix: ¿Sería posible con Inteligencia Artificial?',
  picture: "https://assets-bedu.org/images/Live_YT_12E.png",
  date: "2022-01-13"
}, {
  id: 3,
  title: 'Capacita a tu personal y genera lealtad con tus empleados',
  picture: "https://assets-bedu.org/images/Live_Youtube.png",
  date: "2022-01-02"
}];
module.exports = {
  resolver
};