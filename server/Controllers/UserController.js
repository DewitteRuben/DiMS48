const UserModels = require('../models/userModels');

function addUser(data){
  return new Promise((s,f)=>{
    if (data.email &&
    data.username &&
    data.password &&
    data.passwordConf) {
      let userData = {
        email: data.email,
        username: data.username,
        password: data.password,
        passwordConf: data.passwordConf,
      }
      const newUser = new UserModels.User(userData);
      newUser.save((err,data)=>{
        if(err) f(err);
        s(data);
      })
    }else f("Required fields were not filled in");
  })
}

module.exports = {
  addUser
}
