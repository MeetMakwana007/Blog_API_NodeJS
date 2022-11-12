var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    comment: {
        type: 'string',
        minLength: 5,
        required: true
    },
    postId: {
        type: 'string',
        required: true
    },
    CommentBy: {
        type: 'string',
        required: true

    }
}, { timestamps: { updatedAt: false } })

module.exports = mongoose.model('Comment', commentSchema)