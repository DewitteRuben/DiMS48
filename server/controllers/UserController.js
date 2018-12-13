const UserModels = require('../models/userModels');

function addUser(data){
  return new Promise((s,f)=>{
    if (data.email &&
    data.username &&
    data.password) {
      let userData = {
        email: data.email,
        username: data.username,
        password: data.password
      }
      const newUser = new UserModels.User(userData);
      newUser.save((err,data)=>{
        if(err) f(err);
        s(data);
      })
    }else f("Required fields were not filled in");
  })
}

function authUser(data){
  return new Promise((s,f)=>{
    UserModels.User.authenticate(data.email, data.password).then(user=>s(user)).catch(err=>f(err));
  })
}

function isAdmin(id){
  return new Promise((s,f)=>{
    let query = UserModels.User.findOne({_id: id}, {admin: 1, _id:0});
    query.exec((err,data)=>{
      if(err) f(err);
      if(data == null) f({msg: "User not found"});
      s(data.admin);
    })
  })
}

function getRequestedAccounts(){
  return new Promise((s,f)=>{
    let query = UserModels.User.find({active: false}, {email:1, _id:0});
    query.exec((err,data)=>{
      if(err) f(err);
      s(data);
    })
  })
}

module.exports = {
  addUser,
  authUser,
  isAdmin,
  getRequestedAccounts
}
