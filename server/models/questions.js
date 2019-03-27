const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema ({
    userId: {
        type: 'ObjectId',
        ref: 'User'
    },
    title: String,
    description: String,
    answers: [
        {
            type: 'ObjectId',
            ref: 'Answer'
        }
    ],
    votes: [
        {
            userId: {
                type: 'ObjectId',
                ref: 'Vote'
            },
            status: Number
        }
    ],
    tags: [
        {
            type: 'ObjectId',
            ref: 'Tag'
        }
    ],
}, {
    timestamps: {}
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question