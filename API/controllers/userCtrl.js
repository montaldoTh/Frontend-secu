const userService = require('../services/user.service')
const authService = require('../services/auth.service')
const jwt = require('jsonwebtoken')


exports.signUp = async (req, res) => {
    try {
        const { username, password, firstname, lasname, mail } = req.body
        
        if(!username || !password ){
            throw new Error('SIGN UP : Invalids or missing parameters')
        }

        const user = await userService.getUserByUsername(username)

        if(user) { throw Error('SIGN UP : User already exist')}

        await authService.signUp(username, password, firstname, lasname, mail)

        res.status(200).send('Signed up')

    } catch (error) {
        console.error(error);

        res.status(500).json({error})
    }
}

exports.signIn = async (req, res) => {
    try {
        const { username, password, mail } = req.body
        console.log(username);
        console.log(password);
        console.log(mail);
        if(!username || !password ){
            throw new Error('SIGN IN : Invalids or missing parameters')
        }
        const user = await authService.signIn(username, password, mail)
        res.status(200).send(JSON.stringify(user))
    } catch (error) {
        console.error(error);

        res.status(500).json({error})
    }
}

exports.getUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const userUncheck = jwt.verify(token, authService.JWT_SECRET).data
        const user = await userService.getUserById(userUncheck.id)
        res.status(200).send(user)
    } catch (error) {
        console.error(error);
        res.status(500).json({error})
    }
}

exports.getUsers = async (req, res) => {
    try {
        const { username, password } = req.body
        const verify = await authService.checking(username, password)
        if(!verify && verify != true){ throw new Error('USERS : Invalids or missing parameters') }
        const result = await userService.getUsers()
        if(!result){ throw new Error('USERS : Oops something went wrong') }
        const users = []
        result.forEach((res)=>{
            users.push({ firstname: res.firstname, lastname: res.lastname })
        })
        console.log(users);
        
        res.status(200).send(user)
    } catch (error) {
        console.error(error);
        res.status(500).json({error})
    }
}

exports.editUser = async (req, res) => {
    try {
        const { username, password, firstname, lastname, mail, id } = req.body
        if(!username || !password ){
            throw new Error('EDIT : Invalids or missing parameters')
        }
        const verify = await authService.checking(username, password)
        if(!verify && verify != true){ throw new Error('EDIT : Invalids or missing parameters') }

        const editdUser = await userService.editUser({ id, username, password, firstname, lastname, mail })
        res.status(200).send('user updated!')
    } catch (error) {
        console.error(error);
        res.status(500).json({error})
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.body
        if(!id){ throw new Error('DELETE : Invalids or missing parameters') }
        const deletedUser = await userService.deleteUser(id)
        if(!deletedUser){ throw new Error('EDIT : Invalids or missing parameters') }
        res.status(200).send('Deleted user :', deletedUser)
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
}