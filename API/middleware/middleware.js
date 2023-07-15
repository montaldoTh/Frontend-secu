const jwt = require('jsonwebtoken')
const userService = require("../services/user.service")
const authService = require("../services/auth.service")

exports.isUserLogged = async(req, res, next) => {
    if (req.headers?.authorization) {
        const [scheme, token] = req.headers.authorization.split(' ')
        if(token){
            jwt.verify(token, authService.JWT_SECRET, async (err, decode) => {
                if(err) { res.status(401).json('NOT AUTHORIZED 1: ' + err) }
                else {
                    req.user = await userService.getUserById(decode.data.id)
                    next();
                }
            })
        } 
    } else {
        return res.status(401).json("NOT AUTHORIZED 2");
    }
};