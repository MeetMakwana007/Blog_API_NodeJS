const express = require('express')
const app = express()
const port = 3000

require('./dataBase/mongoose')

app.use(express.json())

app.use(require('./routers/auth'));
app.use(require('./routers/topic'));
app.use(require('./routers/post'));
app.use(require('./routers/like'));
app.use(require('./routers/comment'));


const authRouter = {
    register: "/register",
    login: "/login",
}
const openRouter = {
    getAllTopic: "/topic",
    getAllPost: "/post",
    getPostByTopic: "/post/:topicId",
    getMostRecentPost: "/post/recent?limit={}",
    getMostLikePost: "/mostlike?limit={}"
}
const privateRouter = {
    createTopic: "/topic",
    createPost: "/post/:topicId",
    editPost: "/post/:postId",
    deletePost: "/post/:postId",
    likePost: "/post/like/:postId",
    dislikePost: "/post/dislike/:postId",
    commentOnPost: "/post/:postId/comment"

}
app.get('*', (req, res) => {
    res.send({ Authintication: authRouter, withoutAuth: openRouter, withAuth: privateRouter })
})

app.listen(port, () => {
    console.log('Server is on !!!', port)
})

