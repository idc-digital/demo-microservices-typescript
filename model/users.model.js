const mongoose = require('mongoose')

const usersModelSchema = new mongoose.Schema([{
  id: {
    type:String,
    required:false
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}])

module.exports = mongoose.model('usersModel', usersModelSchema)


