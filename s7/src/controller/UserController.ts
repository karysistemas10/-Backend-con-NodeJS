import { AuthenticationError } from "apollo-server-errors"
import User from "../db/model/User"
import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { logger } from "../logger"

export class UserController {

  private SALT_ROUNDS = 10

  async saveUser(user: User){
    user.password = await hash(user.password, this.SALT_ROUNDS)
    return await User.create({ ...user })
  }

  async getUserToken(email: string, password: string){
    const user = await User.findOne({ where: { email } })
    if (user && await compare(password, user.password)){
      const tokenData = {
        fullName: user.name + ' ' + user.lastname,
        email,
        isAdmin: user.isAdmin
      }
      logger.info(`signIn: Usuario ${user.id} accedio al sistema`)
      return sign(tokenData, process.env.JWT_SECRET, { expiresIn: '8h' })
    } else {
      logger.error(`signIn: Credenciales inválidas para ${email}`)
      throw new AuthenticationError('Invalid credentials')
    }
  }

}