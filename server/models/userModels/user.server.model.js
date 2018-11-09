const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {type: String, unique:true, required: true},
  username: {type: String, unique:true, required: true},
  password: {type: String, required: true},
  passwordConf: {type: String}
})

UserSchema.pre('save', function(next){
  let user = this;
  bcrypt.hash(user.password, 10, function(err, hash){
    if(err){
      return next(err);
    }
    user.password = hash;
    next();
  })
})

UserSchema.statics.authenticate = function(email, password){
  return new Promise((s,f)=>{
    User.findOne({email:email}).exec(function(err,user){
      if(err) f(err);
      if(!user) f("User not found");
      bcrypt.compare(password, user.password, function(err,succes){
        if(succes) s(user)
        f("Email or password incorrect");
      })
    })
  })
}

const User = mongoose.model('User', UserSchema);

module.exports= {
  model: User,
  schema: UserSchema
}
