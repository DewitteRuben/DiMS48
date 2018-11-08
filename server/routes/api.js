var express = require('express');
var router = express.Router();

const DiMS48Models = require('../models/DiMS48Models');
const defaultModels = require('../models/defaultModels');

const DiMS48Controller = require('../Controllers/DiMS48Controller')(DiMS48Models, defaultModels);

router.get('/listTests', function(req,res){
  DiMS48Controller.getTests().then(tests=>res.json(tests)).catch(err=>{res.status(500); res.send("Could not get tests")});
});

router.get('/dims48Begin', function(req,res){
  getBeginObject('begin').then(data=>res.json(data)).catch(err=>{res.status(500); res.send("Could not get data for DiMS48 Part 1")});
});

router.get('/dims48Part2', function(req,res){
  getBeginObject('part2').then(data=>res.json(data)).catch(err=>{res.status(500); res.send("Could not get data for DiMS48 Part 2")});
});

router.get('/unfinishedTests', function(req,res){
  DiMS48Controller.getUnfinishedTests().then(data=>res.json(data)).catch(err=>{res.status(500); res.send("Could not get unfinished tests")});
});

router.get('/results', function(req,res){
  DiMS48Controller.getResults()
    .then(results=>res.json(results)).catch(err=>{res.status(500); res.send("Could not get results")});
});

router.get('/results/:id', function(req,res){
  let id = req.params.id;
  DiMS48Controller.getResult(id)
    .then(result=>res.json(result)).catch(err=>{res.status(500); res.send("Could not get result")});
});

router.post('/resultsPart1', function(req,res){
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

router.post('/resultsPart2', function(req,res){
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
  })
}

module.exports = router;
