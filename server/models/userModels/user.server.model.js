const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const TestsDatabase = require('../../util/databaseGetter').TestDatabase;

const UserSchema = new Schema({
  email: {type: String, unique:true, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true}
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
      if(user == null) {f("User not found");}
      else{
        bcrypt.compare(password, user.password, function(err,succes){
          if(succes) s(user)
          f("Email or password incorrect");
        })
      }
    })
  })
}

const User = TestsDatabase.model('User', UserSchema);

module.exports= {
  model: User,
  schema: UserSchema
}
