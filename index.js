require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const app = express()

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true})
const db =mongoose.connection
db.on('error',(error)=>{
    console.error(error)
})

db.once('open',()=>{
    console.error('connected')
})

app.use(express.json())

const UserRouters = require('./routes/users')

app.use('/users',UserRouters)


app.listen(3000,()=>{
    console.log('Server is running')
})