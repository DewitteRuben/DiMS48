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

function getTestConfig(testTitle){
  return new Promise((s,f)=>{
    let query = Test.find({title: testTitle}, {config: 1, _id:0});
    query.exec(function(err,data){
      if(err)f(err);
      s(data[0].config);
    })
  })
}

function getDetails(testTile){
  return new Promise((s,f)=>{
    let query = Test.find({title: testTile}, {__v:0, config:0, _id:0});
    query.exec(function(err,data){
      if(err)f(err);
      if(data.length < 1) f(404);
      s(data);
    })
  })
}

module.exports = {
  getTestCategories,
  getTestConfig,
  getDetails
};
