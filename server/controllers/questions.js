const { Question } = require('../models')

class QuestionController {
    static getQuestions(req, res) {
        Question.find({})
            .populate('userId')
            .populate('tags')
            .sort({ _id: 'descending' })
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static getQuestionDetail(req, res) {
        Question.findById(req.params.id)
            .populate('userId')
            .populate('tags')
            .populate({
                path: 'answers',
                populate: {
                    path: 'userId'
                }
            })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static addQuestion(req, res) {
        Question.create({
            userId: req.user.id,
            title: req.body.title,
            description: req.body.description
        })
            .then(question => {
                res.status(201).json(question)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static updateQuestion(req, res) {
        Question.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description
        }, {
                new: true
            })
            .then(question => {
                if (question) {
                    res.status(200).json(question)
                } else {
                    res.status(400).json({
                        message: 'Question not found'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static deleteQuestion(req, res) {
        Question.findByIdAndDelete(req.params.id)
            .then(question => {
                if (question) {
                    res.status(200).json(question)
                } else {
                    res.status(400).json({
                        message: 'Question not found'
                    })
                }
            })
            .catch(err => {
                res.send(500).json(err.message)
            })
    }

    static voteQuestion(req, res) {
        let status = req.body.status;
        let vote = null;
        status === 'upvote' ? vote = 1 : vote = -1;
        let questionId = req.params.questionId;
        let userId = req.user.id
        Question.findById(questionId)
            .then(question => {
                if (question) {
                    let index = question.votes.findIndex(v => {
                        return v.userId.toString() === userId.toString();
                    })
                    if (index < 0) {
                        question.votes.push({
                            userId: userId,
                            status: vote
                        })
                    } else {
                        if (question.votes[index].status == vote) {
                            question.votes = question.votes.filter(v => {
                                return v.userId.toString() != userId.toString();
                            })
                        } else {
                            question.votes[index].status = vote;
                        }
                    }
                    question.save();
                    res.status(200).json(question)
                } else {
                    res.status(400).json({
                        message: 'Wrong question Id'
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: error.message
                })
            })
    }
}

module.exports = QuestionController