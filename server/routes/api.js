var express = require('express');
var router = express.Router();

const DiMS48Models = require('../models/DiMS48Models');
const defaultModels = require('../models/defaultModels');

const DiMS48Controller = require('../Controllers/DiMS48Controller')(DiMS48Models, defaultModels);
const UserController = require('../Controllers/UserController');
const TestController = require('../Controllers/TestController');

router.get('/categories', function(req,res){
  TestController.getTestCategories().then(tests=>res.json(tests)).catch(err=> {
    res.status(500);
    res.send("Could not get tests");
  })
})

router.get('/detail/:name', function(req,res){
  let testName = req.params.name;
  console.log(req.params);
  TestController.getDetails(testName).then(details=> res.json(details)).catch(err => {
    if(err == 404){
      res.status(404);
      res.send(`Test ${testName} not found.`);
    }else{
      res.status(500);
      res.send('Could not get data');
    }
  })
})

router.get('/test/:name/initial', function(req,res){
  let testName = req.params.name;
  switch (testName) {
    case 'DiMS48':
    getBeginObject('begin').then(data => res.json(data)).catch(err => {
        res.status(500);
        res.send("Could not get data for DiMS48 Part 1")
    });
      break;
    default:
      res.status(404);
      res.send(`Test ${testName} not found`);
  }
});

router.get('/test/:name/part2', function (req, res) {
  let testName = req.param.name;
  switch (testName) {
    case 'DiMS48':
      getBeginObject('part2').then(data => res.json(data)).catch(err => {
          res.status(500);
          res.send("Could not get data for DiMS48 Part 2")
      });
      break;
    default:
    res.status(404);
    res.send(`Test ${testName} not found`);
  }
});

//TODO are all the given answers really needed here?
//How about just te scores, when you need all the answers just do a request on /result/:id
router.get('/results/:name', function (req, res) {
  let testName = req.params.name;
  switch (testName) {
    case 'DiMS48':
      DiMS48Controller.getResults()
          .then(results => res.json(results)).catch(err => {
          res.status(500);
          res.send("Could not get results")
      });
      break;
    default:
      res.status(404);
      res.send(`Test ${testName} not found`);
  }

});

//TODO maybe drop the s here?
router.get('/results/:name/:id', function (req, res) {
  let testName = req.params.name;
  let id = req.params.id;
  switch (testName) {
    case 'DiMS48':
      DiMS48Controller.getResult(id)
          .then(result => res.json(result)).catch(err => {
          res.status(500);
          res.send("Could not get result")
      });
      break;
    default:
    res.status(404);
    res.send(`Test ${testName} not found`);
  }
});

router.post('/results/:name/1', function (req, res) {
  let testName = req.params.name;
  switch (testName) {
    case 'DiMS48':
      DiMS48Controller.addResult(req.body)
        .then((data) => {
            res.status(201);
            res.json({testId: data._id});
        })
        .catch((error) => {
            res.status(500);
            res.send("Could not add result");
        });
      break;
    default:
      res.status(404);
      res.send(`Test ${testName} not found`);
  }

});

router.post('/results/:name/2', function (req, res) {
  let testName = req.params.name;
  switch (testName) {
    case 'DiMS48':
      DiMS48Controller.appendResult(req.body)
        .then(() => {
            res.status(201);
            res.json({created: true});
        })
        .catch((error) => {
            //TODO specific error messages?
            console.log(error);
            res.status(500);
            res.send("Could not append result");
        })
      break;
    default:
      res.status(404);
      res.send(`Test ${testName} not found`);
  }
});

router.post('/register', function(req,res){
  UserController.addUser(req.body).then(newUser=>{
    req.session.userId = newUser._id;
    res.status(201);
    res.json({newUser: newUser});
  }).catch(err=>{
    console.log(err);
    res.status(500);
    res.send("Could not register user");
  })
});

router.post('/login',function(req,res){
  let loginData = {
    email: req.body.email,
    password: req.body.password
  };
  UserController.authUser(loginData).then(userData=>{
    req.session.userId = userData._id;
    console.log(userData);
    res.status(200);
    res.send("User logged in");
  }).catch(err=>{
    console.log(err);
    res.send(err);
  })
});

function getBeginObject(part){
  let beginObject = {
    images: null,
    instructions: null,
    options: null,
    config: null
  };
  return new Promise(function(s,f){
    DiMS48Controller.getImages()
      .then(images=>{
        beginObject.images = images;
        DiMS48Controller.getInstructions(part)
          .then(instructions=>{
            beginObject.instructions = instructions;
            DiMS48Controller.getOptions(part)
              .then(options =>{
                beginObject.options = options;
                TestController.getTestConfig('DiMS48')
                  .then(config=>{
                    beginObject.config = config;
                    s(beginObject);
                  })
              })
          })
      }).catch(err=>f(err));
  });
}
//TODO protect against DDOS!
router.get('/results/:name/pdf/:id', (req, res) => {
  let testName = req.params.name;
  const id = req.params.id;
  switch (testName) {
    case 'DiMS48':
      DiMS48Controller.getPDF(id)
        .then((fileBuffer) => {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=rapport-'+id+'.pdf');
            res.send(new Buffer(fileBuffer, 'binary'));
        })
        .catch((error) => {
            res.send(error);
        });
      break;
    default:
      res.status(404);
      res.send(`Test ${testName} not found`);
  }

});

router.get('/results/:name/excel/:id', function(req,res){
  let testName = req.params.name;
  const id = req.params.id;
  switch (testName) {
    case 'DiMS48':
      DiMS48Controller.getExcel(id)
        .then(workbook=>{
          let fileName = `results${id}.xlsx`;
          res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
          return workbook.write(fileName, res);
        })
      break;
    default:
      res.status(404);
      res.send(`Test ${testName} not found`);
  }
});
module.exports = router;
