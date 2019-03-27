const { User } = require('../models')
const { bcrypt, jwt } = require('../helpers')
// const kue = require('kue')
// const queue = kue.createQueue()

class UserController {
    static register(req, res) {
        User.create({
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password,
        })
            .then(user => {
                // const emailJob = queue.create('sendEmail', {
                //     title: 'Welcome to HacktivOverflow',
                //     email: user.email,
                //     message: `<h1> Welcome ${user.fullname}, Thanks for joining!`
                // }).save()
                // emailJob.on('failed', (err) => {
                //     console.log(JSON.parse(err))
                // })
                res.status(201).json(user)
            })
            .catch(err => {
                if (err.errors.fullname) {
                    res.status(400).json({
                        message: err.errors.fullname.message
                    })
                } else if (err.errors.email) {
                    res.status(400).json({
                        message: err.errors.email.message
                    })
                } else if (err.errors.password) {
                    res.status(400).json({
                        message: err.errors.password.message
                    })
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static login(req, res) {
        User.findOne({
            email: req.body.email
        })
            .populate('tags')
            .then(user => {
                if (user && bcrypt.comparePassword(req.body.password, user.password)) {
                    let token = jwt.jwtSign({
                        id: user._id
                    })
                    res.status(200).json({
                        id: user._id,
                        fullname: user.fullname,
                        email: user.email,
                        tags: user.tags,
                        token: token
                    })
                } else {
                    res.status(400).json({
                        message: 'Wrong username / password'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
}

module.exports = UserController