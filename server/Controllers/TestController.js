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

function getDetails(testTitle){
  return new Promise((resolve, reject) => {
    makeGetter({title: testTitle}, {__v:0, config:0, _id:0})
    .then((results) => {
      if(results.length <= 0){
        reject({
          name: 'notFound'
        });
      }else{
        resolve(results);
      }
    })
    .catch((err) => {
      reject(err);
    });
  })
}

function updateConfig(testTitle, newConfig){
  return new Promise((s,f)=>{
    console.log(testTitle.toLowerCase());
    console.log(newConfig);
    let newConfigArr = [];
    Object.keys(newConfig).forEach(key=>{
        newConfigArr.push({name: key, value: newConfig[key]});
    });
    console.log(newConfigArr);
    Test.update({title: testTitle.toLowerCase()}, {
      config: newConfigArr
    }, function(err, numberAffected, rawResponse){
        if(err) f(err);
        console.log(numberAffected);
        console.log(rawResponse);
        s({msg: `${numberAffected.n} rows affacted`});
    })
  })
}

module.exports = {
  getTestCategories,
  getTestConfig,
  getDetails,
  updateConfig
};
