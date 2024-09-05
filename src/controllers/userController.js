const { createUser, getUser, getAllUsers, updateUser, deleteUser, login } = require('../services/userServices')

async function createUserHandler(req, res) {
    try {
        const { userName, password, role } = req.body
        if(userName && password && role) {
            const userExits = await getUser(userName)
            console.log(userExits)
            if(userExits) {
                return res.status(200).json({
                    message: 'User already exits'
                })
            }
            else {
                await createUser(req.body)
                return res.status(201).json({
                    message: 'ok',
                    data: req.body
                })
            }
        }
        else {
            return res.status(412).json({
            message: 'missing data'
            })
        }
    }
    catch(err) {
        return res.status(500).json({
            message: 'ERROR',
            Error: err
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

async function updateUserHandler(req, res) {
    const {userName, password, role } = req.body
    if(userName && password && role) {
        try {
            await updateUser(req.body)
            return res.status(200).json({
                message: 'Update success'
            })
        }
        catch(err) {
            return res.status(500).json({
                message: 'ERROR'
            })
        }
    }
}

async function deleteUserHandler(req, res) {
    const userName = req.params.userName
    if(userName) {
        try {
            await deleteUser(userName);
            res.status(200).json({
                message: 'Delete success'
            })
        }
        catch(err) {
            res.status(500).json({
                message: 'ERROR'
            })
        }
    }
}

async function loginHandler(req, res) {
    const { userName, password } = req.body;
    const data =  await login(userName, password)
    res.status(200).json(data)
    
}

module.exports = {
    createUserHandler,
    getAllUserHandler,
    updateUserHandler,
    deleteUserHandler,
    loginHandler
}