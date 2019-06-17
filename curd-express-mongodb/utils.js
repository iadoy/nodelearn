const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test')

let Schema = mongoose.Schema
let studentSchema = new Schema({
  "name": {
    type: String,
    required:true
  },
  "gender": {
    type: Number,
    enum: [0,1],
    default: 0,
    required: true
  },
  "age": {
    type: Number,
    required: true
  },
  "hobbies": {
    type: String
  }
})
let students = mongoose.model('Students', studentSchema)

module.exports = students