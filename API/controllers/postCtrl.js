const postService = require('../services/post.service')
const authService = require('../services/auth.service')
const userService = require('../services/user.service')


exports.postIt = async (req, res) => {
    try{
        const { author, content, date, authId } = req.body

        if(!author || !content || !date || !authId){
            throw new Error('CREATE POST : Invalids or missing parameters')
        }
        const user = await userService.getUserById(authId)

        if(!user) { throw new Error('CREATE POST : Unvalid User') }
        const verify = await authService.checking(user.username, user.password)
        console.log(verify);

        if(verify != true) { throw new Error('CREATE POST : An error occured, something is missing') }
        const newPost = await postService.createPost({ author: author, content: content, date: date })
        
        res.status(200).send(JSON.stringify(newPost))
    } catch (err) {
        console.log(err);

        res.status(500).json({ err })
    }
}

exports.getPosts = async (req, res) => {
    try{
        const posts = await postService.getPosts()
        if(!posts){ throw new Error('GET POSTS: An error occured, something is missing') }
        res.status(200).send(JSON.stringify(posts))
    } catch (err) {
        console.log(err);

        res.status(500).json({ err })
    }
}