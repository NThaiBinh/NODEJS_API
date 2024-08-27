const sql = require('mssql')
const connectionPool = require('../config/database')

function createCourse(data) {
    const columns = ['id', 'name', 'price', 'description']
    const { idCourse, nameCourse, priceCourse, descriptionCourse } = data
    connectionPool
        .then(pool => {
            return pool.request()
                .input('id', sql.TYPES.VarChar, idCourse)
                .input('name', sql.TYPES.NVarChar, nameCourse)
                .input('price', sql.TYPES.Float, priceCourse)
                .input('description', sql.TYPES.NVarChar, descriptionCourse)
                .query(`INSERT INTO COURSES (${columns}) VALUES (@id, @name, @price, @description)`)
        })
        .catch(err => {
            console.log('>>>ERROR--------->', err)
        })
}

function getCourse(idCourse) {
    return connectionPool
        .then(pool => {
            return pool.request()
            .input('idCourse', sql.TYPES.VarChar, idCourse)
            .query(`SELECT * FROM COURSES WHERE ID = @idCourse`) 
        })
        .then(user => {
            return user.recordset[0]
        })
        .catch(err => {
            console.log('>>>ERROR--------->', err)
        })
}

function getAllCourses() {
    return connectionPool
        .then(pool => {
            return pool.request().query(`SELECT * FROM COURSES`)
        })
        .then(persons => {
            return persons.recordset[0]
        })
        .catch(err => {
            console.log('>>>ERROR--------->', err)
        })
}

module.exports = {
    createCourse,
    getCourse,
    getAllCourses
}