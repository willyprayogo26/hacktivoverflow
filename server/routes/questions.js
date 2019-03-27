const express = require('express')
const router = express.Router()
const { isLogin } = require('../middlewares')

const { QuestionController } = require('../controllers')

router.get('/', QuestionController.getQuestions)
router.get('/:id', QuestionController.getQuestionDetail)

router.use(isLogin)
router.post('/', QuestionController.addQuestion)
router.put('/:id', QuestionController.updateQuestion)
router.delete('/:id', QuestionController.deleteQuestion)
router.put('/:questionId/votes', QuestionController.voteQuestion)

module.exports = router