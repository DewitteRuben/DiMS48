let defaultModels = require('../models/defaultModels');

function makeGetter(whereClause, fields){
  return new Promise((s,f)=>{
    let query = Test.find(whereClause, fields);
    query.exec(function(err,data){
      if(err)f(err);
      s(data);
    })
  })
}

let Test = defaultModels.Test;
function getTestCategories(){
  return makeGetter({}, {title:1});
}

function getTestConfig(testTitle){
  return makeGetter({title: testTitle}, {config: 1, _id:0});
}

function getDetails(testTile){
  return makeGetter({title: testTile}, {__v:0, config:0, _id:0})
}

module.exports = {
  getTestCategories,
  getTestConfig,
  getDetails
};
