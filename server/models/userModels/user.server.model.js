const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  email: {type: String, unique:true, required: true},
  username: {type: String, unique:true, required: true},
  password: {type: String, unique:true},
  passwordConf: {type: String, unique:true}
})

module.exports= {
  User: mongoose.model('User', userSchema)
}
