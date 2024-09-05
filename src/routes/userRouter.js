const express = require('express')
const routerUser = express.Router()
const { getAllUserHandler, createUserHandler, updateUserHandler, deleteUserHandler, loginHandler } = require('../controllers/userController')

routerUser.get('/', getAllUserHandler)
routerUser.post('/register', createUserHandler)
routerUser.post('/login', loginHandler)
routerUser.put('/update', updateUserHandler)
routerUser.delete('/delete/:userName', deleteUserHandler)

module.exports = routerUser
