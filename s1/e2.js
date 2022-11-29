// -------- Ejemplo 01 --------
// Modulo interno de node
const os = require('os')
let misCpus = os.cpus()
// console.log(misCpus)

// Modulo instalado desde npmjs
const moment = require('moment')
let now = moment()
console.log(`Son las: ${now}`)

// Modulo creado
const sumar = require('./operaciones')
sumar(5, 7)