const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/Blog-demo', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, () => {
    console.log("Connect to db!!!")
})

