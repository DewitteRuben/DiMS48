const tests = require('./tests');

const getRouter = function getRouter(testName){
    let testFound = false;
    let index = 0;

    while(!testFound && index < tests.length){
      const test = tests[index];
  
      if(test.name == testName){
        return test.router;
      }
  
      index++;
    }
};

module.exports = {
    getRouter
};