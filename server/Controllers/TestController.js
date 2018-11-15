let defaultModels = require('../models/defaultModels');

let Test = defaultModels.Test;
function getTestCategories(){
  return new Promise((s,f)=>{
    let query = Test.find({}, {title:1});
    query.exec(function(err,data){
      if(err)f(err);
      s(data);
    })
  })
}

module.exports = {
  getTestCategories
}
