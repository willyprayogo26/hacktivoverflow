const { jwt } = require('../helpers')
const { User } = require('../models')

module.exports = {
    isLogin: (req, res, next) => {
        let payload = jwt.jwtVerify(req.headers.token)
        
        if(payload) {
            User.findById(payload.id)
            .populate('tags')
            .then(user => {
                if(user) {
                    req.user = {
                        id: user._id,
                        fullname: user.fullname,
                        email: user.email,
                        token: req.headers.token,
                        tags: user.tags
                    }
                    next()
                } else {
                    res.status(401).json({
                        message: 'User not found'
                    })
                }
            })
            .catch(err => {
                res.send(500).json({
                    message: err.message
                })
            })
        } else {
            res.send(401).json({
                message: 'Please provide a valid token'
            })
        }
    }
}