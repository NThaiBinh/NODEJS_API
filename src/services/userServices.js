require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10
const db = require('../models/index')

async function createUser(data) {
    //ORM
    const { userName, password, role } = data
    const hashPassword = await bcrypt.hash(password, saltRounds)
    await db.User.create({
        userName: userName,
        password: hashPassword,
        role: role
    })
}

async function getUser(userName) {
    //ORM
    const user = await db.User.findByPk(userName)
    if(user) {
        return user.get({plain: true})
    }
    else {
        return undefined
    }
    // return connectionPool
    //     .then(pool => {
    //         return pool.request()
    //         .input('userName', sql.TYPES.VarChar, userName)
    //         .query(`SELECT * FROM Users WHERE userName = @userName`) 
    //     })
    //     .then(user => {
    //         return user.recordset[0]
    //     })
}

async function getAllUsers() {
    //ORM
    return await db.User.findAll()

    // return connectionPool
    //     .then(pool => {
    //         return pool.request().query(`SELECT * FROM USERS`)
    //     })
    //     .then(persons => {
    //         return persons.recordset[0]
    //     })
}

async function  updateUser(data) {
    const { userName, password, role } = data
    db.User.update(
        {
            userName,
            password,
            role
        },
        {
            where: 
            {
                userName
            }
        }
    )
}

async function deleteUser(userName) {
    await db.User.destroy({
        where: {
            userName
        }
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
    updateUser,
    deleteUser,
    login
}