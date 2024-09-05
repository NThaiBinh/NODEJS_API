require('dotenv').config()
const jwt = require('jsonwebtoken')


function authentication(req, res, next) {
    const whiteLists = ['/users/login', '/users/register']
    if(whiteLists.find(item => '/api/v1' + item === req.originalUrl)) {
        next()
    }
    else {
        if(req?.headers?.authorization?.split(' ')[1]) {
            try {
                const token = req.headers.authorization.split(' ')[1]
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                next();
            }
            catch(err) {
                res.status(401).json({
                    messagee: 'Unauthorized'
                })
            }
        }
        else {
            res.status(401).json({
                messagee: 'Unauthorized'
            })
        }
    }
    
}

module.exports = authentication