const express = require('express')
const router = express.Router()
const answerRouter = require('./answers')
const questionRouter = require('./questions')
// const tagRouter = require('./tags')
const userRouter = require('./users')
const { isLogin } = require('../middlewares')

router.use('/', userRouter)
router.use('/questions', questionRouter)
router.use(isLogin)
router.use('/answers', answerRouter)
// router.use('/tags', tagRouter)

module.exports = router