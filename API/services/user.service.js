const User = require("../models/User");

exports.getUserByUsername = (username) => {
    return User.findOne({ username })
}
exports.getUserByMail = (mail) => {
    return User.findOne({ mail })
}
exports.getUserById = (_id) => {
    return User.findById({ _id })
}

exports.getUsers = () => {
    return User.find()
}

exports.editUser = (user) => {
    return  User.findByIdAndUpdate({ _id: user.id } ,{ lastname: user.lastname, firstname: user.firstname, mail: user.mail, password: user.password, username: user.username}, { new: true })
}

exports.deleteUser = (user) => {
    return User.findByIdAndRemove({ _id: user.id })
}

exports.createUser = (user) => {
    return User.create(user)
}