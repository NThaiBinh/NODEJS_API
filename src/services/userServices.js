require('dotenv').config()
const sql = require('mssql')
const connectionPool = require('../config/database.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function createUser(data) {
    const columns = ['userName', 'password', 'role']
    const { userName, password, role } = data
    const hashPassword = await bcrypt.hash(password, saltRounds)
        .catch(err => {
            console.log('ERROR----------->', err)
        })
    connectionPool
        .then(pool => {
            return pool.request()
                .input('userName', sql.TYPES.VarChar, userName)
                .input('password', sql.TYPES.VarChar, hashPassword)
                .input('role', sql.TYPES.VarChar, role)
                .query(`INSERT INTO USERS (${columns}) VALUES (@userName, @password, @role)`)
        })
        .catch(err => {
            console.log('>>>ERROR--------->', err)
        })
}

function getUser(userName) {
    return connectionPool
        .then(pool => {
            return pool.request()
            .input('userName', sql.TYPES.VarChar, userName)
            .query(`SELECT * FROM Users WHERE userName = @userName`) 
        })
        .then(user => {
            return user.recordset[0]
        })
        .catch(err => {
            console.log('>>>ERROR--------->', err)
        })
}

function getAllUsers() {
    return connectionPool
        .then(pool => {
            return pool.request().query(`SELECT * FROM USERS`)
        })
        .then(persons => {
            return persons.recordset[0]
        })
        .catch(err => {
            console.log('>>>ERROR--------->', err)
        })
}

async function login(userName, password) {
    const user = await getUser(userName)
    if(user) {
        return bcrypt.compare(password, user.password)
        .then(result => {
            if(result) {
                const payload = {
                    userName: user.userName,
                    role: user.role
                }
                const token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRE
                    }
                )
                return {
                    token,
                    user: payload
                }
            }
            else {
                return {
                    message: 'Login failed'
                }
            }
        })
        .catch(err => {
            console.log('>>>ERROR--------->', err)
            return {
                message: 'Error'
            }
        })
    }
    else {
        return {
            message: 'Login failed'
        }
    }
}

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    login
}