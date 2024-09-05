const db = require('../models/index')

async function createCourse(data) {
    //ORM
    const { name, price, description } = data
    await db.Course.create({
        name: name,
        price: price,
        description: description
    })

    // const columns = ['id', 'name', 'price', 'description']
    // const { idCourse, nameCourse, priceCourse, descriptionCourse } = data
    // connectionPool
    //     .then(pool => {
    //         return pool.request()
    //             .input('id', sql.TYPES.VarChar, idCourse)
    //             .input('name', sql.TYPES.NVarChar, nameCourse)
    //             .input('price', sql.TYPES.Float, priceCourse)
    //             .input('description', sql.TYPES.NVarChar, descriptionCourse)
    //             .query(`INSERT INTO COURSES (${columns}) VALUES (@id, @name, @price, @description)`)
    //     })
}

async function getCourse(id) {
    //ORM
    return await db.Course.findByPk(id)

    // return connectionPool
    //     .then(pool => {
    //         return pool.request()
    //         .input('idCourse', sql.TYPES.VarChar, idCourse)
    //         .query(`SELECT * FROM COURSES WHERE ID = @idCourse`) 
    //     })
    //     .then(course => {
    //         return course.recordset[0]
    //     })
}

async function getAllCourses() {
    //ORM
    return await db.Course.findAll();

    // return connectionPool
    //     .then(pool => {
    //         return pool.request().query(`SELECT * FROM COURSES`)
    //     })
    //     .then(courses => {
    //         return courses.recordset
    //     })
}

function updateCourse(data) {
    //ORM
    const { id, name, price, description } = data
    db.Course.update(
        {
            name: name,
            price: price,
            description: description
        },
        {
            where: {
                id: id
            }
        }
    )

    // const columns = ['id', 'name', 'price', 'description']
    // const { idCourse, nameCourse, priceCourse, descriptionCourse } = data
    // return connectionPool
    //     .then(pool => {
    //         return pool.request()
    //             .input('id', sql.TYPES.VarChar, idCourse)
    //             .input('name', sql.TYPES.NVarChar, nameCourse)
    //             .input('price', sql.TYPES.Float, priceCourse)
    //             .input('description', sql.TYPES.NVarChar, descriptionCourse)
    //             .query(`UPDATE COURSES SET ${columns[1]} = @name, ${columns[2]} = @price, ${columns[3]} = @description WHERE ${columns[0]} = @id`)
    //     })
}

function deleteCourse(id) {
    //ORM
    db.Course.destroy({
        where: {
            id: id
        }
    })
    // return connectionPool
    //     .then(pool => {
    //         return pool.request()
    //             .input('idCourse', sql.TYPES.VarChar, idCourse)
    //             .query(`DELETE Courses WHERE id = @idCourse`)
    //     })
}

module.exports = {
    createCourse,
    getCourse,
    getAllCourses,
    updateCourse,
    deleteCourse
}