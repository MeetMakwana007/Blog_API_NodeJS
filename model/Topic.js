var mongoose = require('mongoose');

var topicSchema = new mongoose.Schema({
    name: {
        type: 'string',
        minLength: 2,
        required: true,
        unique: true
    },
    createdBy: {
        type: 'string',
        required: true,
    }
}, { timestamps: { updatedAt: false } })

module.exports = mongoose.model('Topic', topicSchema)