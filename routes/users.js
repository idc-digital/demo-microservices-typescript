const express = require('express')
const router = express.Router()
const usersModel = require('../model/usersModel')


// Getting all
function GetUser(){
  router.get('/', async (req, res) => {
    try {
      const Users = await usersModel.find()
      res.json(Users)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  
}

module.exports = GetUser;