var express = require('express');
var router = express.Router();

const UserController = require('../Controllers/UserController');
const TestController = require('../Controllers/TestController');

const DiMS48Router = require('./tests/DiMS48Router');

const DIMS48_NAME = 'dims48';

router.get('/categories', function(req,res){
  TestController.getTestCategories().then(tests=>res.json(tests)).catch(err=> {
    res.status(500);
    res.send("Could not get tests");
  })
})

router.get('/detail/:name', function(req,res){
  let testName = req.params.name.toLocaleLowerCase();
  TestController.getDetails(testName).then(details=> res.json(details)).catch(err => {
    if(err == 404){
      res.status(404);
      res.send(`Test ${testName} not found.`);
    }else{
      res.status(500);
      res.send('Could not get data');
    }
  })
});

router.get('/test/:name/initial', function(req,res){
  let testName = req.params.name.toLowerCase();
  switch (testName) {
    case DIMS48_NAME:
      DiMS48Router.initial(res);
      break;
    default:
      res.status(404);
      res.send(`Test ${testName} not found`);
  }
});

router.get('/test/:name/part2', function (req, res) {
  let testName = req.params.name.toLocaleLowerCase();
  switch (testName) {
    case DIMS48_NAME:
      DiMS48Router.part2(res);
      break;
    default:
    res.status(404);
    res.send(`Test ${testName} not found`);
  }
});

//TODO are all the given answers really needed here?
//How about just te scores, when you need all the answers just do a request on /result/:id
router.get('/results/:name', function (req, res) {
  let testName = req.params.name.toLocaleLowerCase();
  switch (testName) {
    case DIMS48_NAME:
      DiMS48Router.getResults(res);
      break;
    default:
      res.status(404);
      res.send(`Test ${testName} not found`);
  }

});

router.get('/results/:name/:id', function (req, res) {
  let testName = req.params.name.toLocaleLowerCase();
  let id = req.params.id;
  switch (testName) {
    case DIMS48_NAME:
      DiMS48Router.getResult(res,id);
      break;
    default:
    res.status(404);
    res.send(`Test ${testName} not found`);
  }
});

router.post('/results/:name/1', function (req, res) {
  let testName = req.params.name.toLocaleLowerCase();
  switch (testName) {
    case DIMS48_NAME:
      DiMS48Router.postResultPart1(req,res);
      break;
    default:
      res.status(404);
      res.send(`Test ${testName} not found`);
  }

});

router.post('/results/:name/2', function (req, res) {
  let testName = req.params.name.toLocaleLowerCase();
  switch (testName) {
    case DIMS48_NAME:
      DiMS48Router.postResultPart2(req,res);
      break;
    default:
      res.status(404);
      res.send(`Test ${testName} not found`);
  }
});

//TODO protect against DDOS!
router.get('/results/:name/pdf/:id', (req, res) => {
  let testName = req.params.name.toLocaleLowerCase();
  const id = req.params.id;
  switch (testName) {
    case DIMS48_NAME:
      DiMS48Router.getPdf(res,id);
      break;
    default:
      res.status(404);
      res.send(`Test ${testName} not found`);
  }

});

router.get('/results/:name/excel/:id', function(req,res){
  let testName = req.params.name.toLocaleLowerCase();
  const id = req.params.id;
  switch (testName) {
    case DIMS48_NAME:
      DiMS48Router.getExcel(res,id);
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

module.exports = router;
