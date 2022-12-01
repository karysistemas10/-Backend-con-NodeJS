require('dotenv').config()

console.log(process.env.MY_OWN_KEY)
console.log(process.env.NODE_ENV)
console.log(process.env.JWT_SECRET)

import { suma, resta, mult, div } from './calc'

console.log(suma(5,5))
console.log(resta(5,5))
console.log(mult(5,5))
console.log(div(5,5))