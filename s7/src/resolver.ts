import { BookController } from "./controller/BookController"
import { UserController } from "./controller/UserController"
import { AuthController } from "./controller/AuthAPI"

const bookController = new BookController()
const userController = new UserController()
const authController = new AuthController()

export const resolvers = {
    Query: {
        getAllBooks: (_, __, { token }) => authController.verifyToken(token) && bookController.getBooks(),
        getBook: (_, { asin }, { token }) => authController.verifyToken(token) && bookController.getBook(asin)
    },
    Mutation: {
        insertBook: (_, { asin, title, author, pages }, { token }) => authController.verifyToken(token) && bookController.saveBook(asin, title, author, pages),
        updateBook: (_, { asin, title, author, pages }, { token }) => authController.verifyToken(token) && bookController.updateBook(asin, title, author, pages),
        signUp: (_, { input: user }) => userController.saveUser(user),
        signIn: (_, { email, password }) => userController.getUserToken(email, password)
    }
}