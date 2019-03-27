const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema ({
    userId: {
        type: 'ObjectId',
        ref: 'User'
    },
    answer: String,
    questionId: {
        type: 'ObjectId',
        ref: 'Question'
    },
    votes: [
        {
            userId: {
                type: 'ObjectId',
                ref: 'User'
            },
            status: Number
        }
    ]
}, {
    timestamps: {}
})

answerSchema.post('remove', function() {
    Question.findByIdAndUpdate({
        _id: this.questionId
    }, {
        $pull: {
            answers: this._id
        }
    }, {
        new: true
    })
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer