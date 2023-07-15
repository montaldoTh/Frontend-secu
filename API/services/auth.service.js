const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userService = require('./user.service')
const SALT_ROUNDS = 10;
const JWT_SECRET = "fNoxA4hoEaF5HIJ";
exports.SALT_ROUNDS = 10;
exports.JWT_SECRET = "fNoxA4hoEaF5HIJ";

function hashPassword(plainTextPassword){
    return bcrypt.hash(plainTextPassword, SALT_ROUNDS);
}

function comparePassword(plainTextPassword, hash){
    return bcrypt.compare(plainTextPassword, hash)
}

function createToken(data){
    return jwt.sign({ data }, JWT_SECRET, {
        expiresIn: "1d"
    })
}

exports.signUp = async (username, password, firstname, lastname, mail) => {
    const hashdPassword = await hashPassword(password)
    if(hashdPassword){
        userService.createUser({ username, hashdPassword, mail, lastname, firstname })
        return createToken(username, mail, lastname, firstname)
    }
}

exports.signIn = async (username, password) => {
    const user = await userService.getUserByUsername(username)
    if(!user){ throw new Error('SIGNUP : Invalids or missing parameters 1') }
    const compareResult = comparePassword(password, user.password )
    if(!compareResult){ throw new Error('SIGNUP : Invalids or missing parameters 2') }
    const jwt = createToken({ username: user.username, id: user._id })
    return jwt
}

exports.getUser = async (username, password) => {
    const user = await userService.getUserByUsername( username )
    if(!user){ throw new Error('SIGNUP : Invalids or missing parameters') }
    const compareResult = comparePassword(password, user.password )
    if(!compareResult){ throw new Error('SIGNUP : Invalids or missing parameters') }
    const jwt = createToken({ username: user.username, firstname: user.firstname, lastname: user.lastname, mail: user.mail, id: user._id, password: user.password })
    return jwt
}

exports.checking = async (username, password) => {
    const user = await userService.getUserByUsername(username)
    if(!user){ throw new Error('CHECKING : Invalids or missing parameters') }
    const compareResult = comparePassword(password, user.password)
    if(!compareResult){ throw new Error('CHECKING : Invalids or missing parameters') }
    return true
} 