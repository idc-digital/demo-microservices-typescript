require('dotenv').config('env')
const express = require('express')
const mongoose = require('mongoose');
const app = express()
bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost:27017/demo-microservice', {useNewUrlParser:true})
const db =mongoose.connection
db.on('error',(error)=>{
    console.error(error)
})

db.once('open',()=>{
    console.error('connected')
})

app.use(express.json())


const userRouters = require('./routes/users')
app.use('/users',userRouters)


app.listen(3000,()=>{
    console.log('Server is running')
})