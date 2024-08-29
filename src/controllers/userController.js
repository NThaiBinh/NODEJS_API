const { createUser, getUser, getAllUsers, login } = require('../services/userServices')

async function createUserHandler(req, res) {
    const { userName, password, role } = req.body
    const userExits = await getUser(userName)
    console.log(userName)
    if(userExits) {
        return res.status(200).json({
            message: 'User is exits'
        })
    }
    if(userName && password && role) {
        await createUser(req.body)
        return res.status(200).json({
            message: 'ok',
            data: req.body
        })
    }
    else {
        return res.status(200).json({
        message: 'missing data'
        })
    }
}

async function getAllUserHandler(req, res) {
    const users = await getAllUsers();
    return res.status(200).json({
        message: 'ok',
        data: users
    })
}

async function loginHandler(req, res) {
    const { userName, password } = req.body;
    const data =  await login(userName, password)
    res.status(200).json(data)
    
}

module.exports = {
    createUserHandler,
    getAllUserHandler,
    loginHandler
}