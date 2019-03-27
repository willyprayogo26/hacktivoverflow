const express = require('express')
const router = express.Router()

const { AnswerController } = require('../controllers')

router.post('/:questionId', AnswerController.addAnswer)
router.get('/:id', AnswerController.findAnswer)
router.put('/:id', AnswerController.updateAnswer)
router.delete('/:id', AnswerController.deleteAnswer)
router.put('/:answerId/votes', AnswerController.voteAnswer)

module.exports = router