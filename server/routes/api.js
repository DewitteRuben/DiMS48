var express = require('express');
var router = express.Router();

const DiMS48Models = require('../models/DiMS48Models');
const defaultModels = require('../models/defaultModels');

const DiMS48Controller = require('../Controllers/DiMS48Controller')(DiMS48Models, defaultModels);
const UserController = require('../Controllers/UserController');

router.get('/listTests', function (req, res) {
    DiMS48Controller.getTests().then(tests => res.json(tests)).catch(err => {
        res.status(500);
        res.send("Could not get tests")
    });
});

router.get('/dims48Begin', function (req, res) {
    getBeginObject('begin').then(data => res.json(data)).catch(err => {
        res.status(500);
        res.send("Could not get data for DiMS48 Part 1")
    });
});

router.get('/dims48Part2', function (req, res) {
    getBeginObject('part2').then(data => res.json(data)).catch(err => {
        res.status(500);
        res.send("Could not get data for DiMS48 Part 2")
    });
});

router.get('/unfinishedTests', function (req, res) {
    DiMS48Controller.getUnfinishedTests().then(data => res.json(data)).catch(err => {
        res.status(500);
        res.send("Could not get unfinished tests")
    });
});

router.get('/results', function (req, res) {
    DiMS48Controller.getResults()
        .then(results => res.json(results)).catch(err => {
        res.status(500);
        res.send("Could not get results")
    });
});

router.get('/results/:id', function (req, res) {
    let id = req.params.id;
    DiMS48Controller.getResult(id)
        .then(result => res.json(result)).catch(err => {
        res.status(500);
        res.send("Could not get result")
    });
});

router.post('/resultsPart1', function (req, res) {
    DiMS48Controller.addResult(req.body)
        .then((data) => {
            res.status(201);
            res.json({testId: data._id});
        })
        .catch((error) => {
            //TODO specific error messages?
            res.status(500);
            res.send("Could not add result");
        });
});

router.post('/resultsPart2', function (req, res) {
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
})

router.post('/login',function(req,res){
  let loginData = {
    email: req.body.email,
    password: req.body.password
  }
  UserController.authUser(loginData).then(userData=>{
    req.session.userId = userData._id;
    console.log(userData);
    res.status(200);
    res.send("User logged in");
  }).catch(err=>{
    console.log(err);
    res.send(err);
  })
})

function getBeginObject(part){
  let beginObject = {
    images: null,
    instructions: null,
    options: null
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
                s(beginObject);
              })
          })
      }).catch(err=>f(err));
  });
}
//TODO protect against DDOS!
router.get('/pdf/:id', (req, res) => {
    const id = req.params.id;

    DiMS48Controller.getPDF(id)
        .then((fileBuffer) => {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=rapport-'+id+'.pdf');
            res.send(new Buffer(fileBuffer, 'binary'));
        })
        .catch((error) => {
            res.send(error);
        });
});

router.get('/excel/:id', function(req,res){
  const id = req.params.id;
  //console.log(res);
  DiMS48Controller.getExcel(id)
    .then(workbook=>{
      let fileName = `results${id}.xlsx`
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
      return workbook.write(fileName, res);
    })
})
module.exports = router;
