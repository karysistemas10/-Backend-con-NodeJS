import 'dotenv/config'
import bcrypt from 'bcrypt'
import { logger } from './logger'
import jwt from 'jsonwebtoken'

// Ejemplo 01
const saltRounds = 10

const passTexto = "qwerty"
const otroPassTexto = "qwerty123"

const generaHash = async (pass, saltRounds) => {
  try {
    logger.debug(`bcrypt hash: ${await bcrypt.hash(pass, saltRounds)}`)
    console.log(`bcrypt hash: ${await bcrypt.hash(pass, saltRounds)}`)
  } catch (error) {
    console.log(error)
    logger.error(error)
  }
}

// generaHash(passTexto, saltRounds)
const hashDePassTexto = "$2b$10$ObhMwVe7qP/FxPgu3SQOJOeZJQyQBjtiqOkSg./4jWT/phopclEDa"

const comparaHash = async (llamada, pass, hash) => {
  try {
    logger.debug(`bcrypt compare: ${await bcrypt.compare(pass, hash)}`)
    console.log(`bcrypt compare: ${llamada} ${await bcrypt.compare(pass, hash)}`)
  } catch (error) {
    console.log(error)
    logger.error(error)
  }
}

// comparaHash(1, passTexto, hashDePassTexto) // -> true
// comparaHash(2, passTexto, "$2b$10$ObhMwVe7qP/FxPgu3SQOJOeZJQyQBjtiqOkSg./4jWT/phopclEDb") // -> false
// comparaHash(3, otroPassTexto, hashDePassTexto) // -> false

// Ejemplo 02
// Generar token básico
const tokenBasico = jwt.sign({ data: 'token simple' }, process.env.JWT_SECRET)
// logger.debug(`jwt.sign ${tokenBasico}`)
// console.log(`jwt.sign ${tokenBasico}`)

// Generar token con expiración
const tokenConExpiracion = jwt.sign(
  { data: 'token con expiración de una hora' }, 
  process.env.JWT_SECRET,
  // { expiresIn: 60 * 60 } // 1h
  { expiresIn: '1h' } // Otra manera de expiración: 1h
)
logger.debug(`jwt.sign ${tokenConExpiracion}`)
// console.log(`jwt.sign ${tokenConExpiracion}`)

// Decodificar tokens
const tokenBasicoDecodificado = jwt.decode(tokenBasico)
logger.debug(`jwt.decode ${JSON.stringify(tokenBasicoDecodificado)}`)
// console.log(`jwt.decode ${JSON.stringify(tokenBasicoDecodificado)}`)

const tokenConExpiracionDecodificado = jwt.decode(tokenConExpiracion)
logger.debug(`jwt.decode ${JSON.stringify(tokenConExpiracionDecodificado)}`)
// console.log(`jwt.decode ${JSON.stringify(tokenConExpiracionDecodificado)}`)

// Verificar o validar tokens
try {
  // Verificar token con palabra secreta valida
  const tokenBasicoVerificado = jwt.verify(tokenBasico, process.env.JWT_SECRET)
  logger.debug(`jwt.verify ${JSON.stringify(tokenBasicoVerificado)}`)
  console.log(`jwt.verify ${JSON.stringify(tokenBasicoVerificado)}`)
} catch (error) {
  console.log(error)
  logger.error(error)
}

try {
  // Verificar token con palabra secreta invalida
  const tokenBasicoVerificadoConError = jwt.verify(tokenBasico, "s3Cr3T_W0rDD")
  logger.debug(`jwt.verify ${JSON.stringify(tokenBasicoVerificadoConError)}`)
  console.log(`jwt.verify ${JSON.stringify(tokenBasicoVerificadoConError)}`)
} catch (error) {
  console.log(error)
  logger.error(error)
}