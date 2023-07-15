const express = require("express")
const connectDB = require('./mongo/mongoose')
const userCtrl = require('./controllers/userCtrl')
const postCtrl = require('./controllers/postCtrl')
const bodyParser = require('body-parser')
const cors = require('cors')
const m = require('./middleware/middleware')

const corsOptions = {
    origin: 'http://127.0.0.1:5173',
}
const port = 3000;
const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOptions))

connectDB()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/signin', userCtrl.signIn)
app.post('/signup', userCtrl.signUp)
app.post('/getUsers', m.isUserLogged, userCtrl.getUsers)
app.get('/getUser', m.isUserLogged, userCtrl.getUser)
app.patch('/editUser', m.isUserLogged, userCtrl.editUser)
app.delete('/deleteUser', m.isUserLogged, userCtrl.deleteUser)

app.get('/getPosts', m.isUserLogged, postCtrl.getPosts)
app.post('/createPost', m.isUserLogged, postCtrl.postIt)


app.listen(port, () => {
    console.log(`app listening port : ${port}`)
})
  
