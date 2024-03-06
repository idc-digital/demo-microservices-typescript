require('dotenv').config('env')
const express = require('express')
const app = express()
app.use(express.json())

const middleware = require('./middleware/users.middleware')



const mongoose = require('mongoose');
bodyParser = require('body-parser');

const port =process.env.DATABASE_URL 


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true})
const db =mongoose.connection


db.on('error',(error)=>{
    console.error(error)
})

db.once('open',()=>{
    console.error('connected')
})

app.use(middleware.errorMiddleware)


const userRouters = require('./routes/users.routers')
app.use('/users',userRouters)




app.listen(3000,()=>{
    console.log('Server is running')
})  