var mongoose = require('mongoose');

var likeSchema = new mongoose.Schema({
    postId: {
        type: 'string',
        required: true
    },
    likedBy: {
        type: 'string',
    },
    dislikedBy: {
        type: 'string',
    }
}, { timestamps: { updatedAt: false } })

module.exports = mongoose.model('Like', likeSchema)