var mongoose = require('mongoose')

var postSchema = new mongoose.Schema({
    title: {
        type: 'string',
        minLength: 5,
        required: true
    },
    topic: {
        type: 'string',
        required: true
    },
    content: {
        type: 'string',
        minLength: 10,
        required: true
    },
    like: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: 'string',
        required: true

    }
}, { timestamps: true });

module.exports = mongoose.model("post", postSchema);