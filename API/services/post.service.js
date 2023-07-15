const Post = require("../models/Post");

exports.getPostByAuthor = (author) => {
    return Post.findOne({ author })
}

exports.getPostByDate = (date) => {
    return Post.findOne({ date })
}

exports.getPosts = () => {
    return Post.find().sort({ date: -1 })
}

exports.createPost = (post) => {
    return Post.create(post)
}