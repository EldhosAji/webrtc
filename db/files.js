const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255
    },
    token: {
        type: String,
        required: true,
        min: 6,
    },
    cId: {
        type: String,
        required: true,
    },
    code: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Files', FileSchema);