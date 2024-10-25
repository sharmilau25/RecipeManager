const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
     firstName: {
         type: String,
         required: true,
     },
     lastName: {
         type: String,
         required: true,
       },
     email: {
        type: String,
        required: true,
     },
     password: {
        type: String,
        required: true
     },
}, { collection: 'users' })

module.exports = mongoose.model('userModel', userSchema)