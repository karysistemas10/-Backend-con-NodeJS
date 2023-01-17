"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;
var _db = require("./db");
var _logger = require("./logger");
var _apolloServerErrors = require("apollo-server-errors");
var _bcrypt = require("bcrypt");
var _jsonwebtoken = require("jsonwebtoken");
var _auth = require("./auth");
const SALT_ROUNDS = 10;
const resolvers = {
  Query: {
    getAllLives: async (_, __, {
      token
    }) => (0, _auth.verifyToken)(token) && (await _db.sequelize.models.Live.findAll()),
    getLive: async (_, {
      id
    }, {
      token
    }) => {
      console.log(token);
      return await _db.sequelize.models.Live.findOne({
        where: {
          id
        }
      });
    }
  },
  Mutation: {
    insertLive: async (_, {
      id,
      title,
      picture,
      date
    }) => {
      return await _db.sequelize.models.Live.create({
        id,
        title,
        picture,
        date
      });
    },
    updateLive: async (_, {
      id,
      title,
      picture,
      date
    }) => {
      // buscamos el libro con base al asin proporcionado
      let liveFound = await _db.sequelize.models.Live.findOne({
        where: {
          id
        }
      });
      // Sino lo encontramos lanzamos un error
      if (!liveFound) {
        _logger.logger.error(`Live not found with asin: ${id}`);
        throw new _apolloServerErrors.ApolloError('Live not found', 'ERR003');
      }
      // En caso de encontrarlo actualizamos las propiedades que no vengan nulas
      title && (liveFound.title = title);
      picture && (liveFound.picture = picture);
      date && (liveFound.date = date);
      // Actualizamos el libro
      liveFound.save();
      return liveFound;
    },
    signUp: async (_, {
      input: user
    }) => {
      user.password = await (0, _bcrypt.hash)(user.password, SALT_ROUNDS);
      return await _db.sequelize.models.User.create({
        ...user
      });
    },
    signIn: async (_, {
      email,
      password
    }) => {
      const user = await _db.sequelize.models.User.findOne({
        where: {
          email
        }
      });
      if (user && (await (0, _bcrypt.compare)(password, user.password))) {
        const tokenData = {
          fullName: user.name + ' ' + user.lastname,
          email,
          isAdmin: user.isAdmin
        };
        _logger.logger.info(`signIn: Usuario ${user.id} accedio`);
        return (0, _jsonwebtoken.sign)(tokenData, process.env.JWT_SECRET, {
          expiresIn: '8h'
        });
      } else {
        _logger.logger.error(`signIn: Credenciales invalidas para ${email}`);
        throw new _apolloServerErrors.AuthenticationError('Invalid credentials');
      }
    }
  }
};
exports.resolvers = resolvers;