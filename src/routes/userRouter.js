const express = require('express')
const routerUser = express.Router()
const { getAllUserHandler, createUserHandler, loginHandler } = require('../controllers/userController')

routerUser.get('/', getAllUserHandler)
routerUser.post('/register', createUserHandler)
routerUser.post('/login', loginHandler)

module.exports = routerUser;
