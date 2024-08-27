require('dotenv').config()
const jwt = require('jsonwebtoken')


function auth(req, res, next) {
    const whiteLists = ['/user/login', '/user/register']
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
                    messagee: 'Bạn chưa có Access Token hoặc Access Token của bạn hết hạn'
                })
            }
        }
        else {
            res.status(401).json({
                messagee: 'Bạn chưa có Access Token hoặc Access Token của bạn hết hạn'
            })
        }
    }
    
}

module.exports = auth