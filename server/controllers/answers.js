const { Answer, Question } = require('../models')

class AnswerController {
    static findAnswer(req, res) {
        Answer.findById(req.params.id)
            .populate('userId')
            .populate('questionId')
            .then(answer => {
                res.status(200).json(answer)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static addAnswer(req, res) {
        Answer.create({
            userId: req.user.id,
            answer: req.body.answer,
            questionId: req.params.questionId
        })
            .then(answer => {
                return Question.findByIdAndUpdate({
                    _id: answer.questionId
                }, {
                        $push: {
                            answers: answer._id
                        }
                    }, {
                        new: true
                    })
            })
            .then(question => {
                res.status(201).json(question)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static updateAnswer(req, res) {
        Answer.findByIdAndUpdate(req.params.id, {
            answer: req.body.answer
        }, {
                new: true
            })
            .then(answer => {
                res.status(200).json(answer)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static deleteAnswer(req, res) {
        Answer.findByIdAndDelete(req.params.id)
            .then(answer => {
                return Question.findByIdAndUpdate({
                    _id: answer.questionId
                }, {
                        $pull: {
                            answers: { _id: answer._id }
                        }
                    }, {
                        new: true
                    })
            })
            .then(question => {
                res.status(201).json(question)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static voteAnswer(req, res) {
        let status = req.body.status;

        let vote = null;
        status === 'upvote' ? vote = 1 : vote = -1;
        let answerId = req.params.answerId;
        let userId = req.user.id
        Answer.findById(answerId)
            .then(answer => {
                if (answer) {
                    let index = answer.votes.findIndex(v => {
                        return v.userId.toString() === userId.toString();
                    })

                    if (index < 0) {
                        answer.votes.push({
                            userId: userId,
                            status: vote
                        })
                    } else {
                        if (answer.votes[index].status == vote) {
                            answer.votes = answer.votes.filter(v => {
                                return v.userId.toString() != userId.toString();
                            })
                        } else {
                            answer.votes[index].status = vote;
                        }
                    }
                    answer.save();
                    res.status(200).json(answer)
                } else {
                    res.status(400).json({
                        message: 'Wrong answer Id'
                    })
                }
            })
            .catch(error => {
                res.status(500).json({
                    message: error.message
                })
            })
    }
}

module.exports = AnswerController