const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = new Schema({
    author: {
        type: String,
        required: true,
        index: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
        index: true
    }
})

module.exports = mongoose.model("Post", postSchema)