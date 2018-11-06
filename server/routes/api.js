var express = require('express');
var router = express.Router();
const DiMS48Controller = require('../Controllers/DiMS48Controller');

router.get('/listTests', function(req,res){
  DiMS48Controller.getTests().then(tests=>res.json(tests));
})

router.get('/dims48Begin', function(req,res){
  getBeginObject('begin').then(data=>res.json(data));
})

router.get('/dims48Part2', function(req,res){
  getBeginObject('part2').then(data=>res.json(data));
})

router.get('/unfinishedTests', function(req,res){
  DiMS48Controller.getUnfinishedTests().then(data=>res.json(data));
})

router.get('/results', function(req,res){
  DiMS48Controller.getResults()
    .then(results=>res.json(results));
})

router.get('/results/:id', function(req,res){
  let id = req.params.id;
  DiMS48Controller.getResult(id)
    .then(result=>res.json(result));
})

router.post('/resultsPart1', function(req,res){
  res.json(); // TODO: Submit results to db and return testId
})

router.post('/resultsPart2', function(req,res){
  // TODO: submit results to db
})

function getBeginObject(part){
  let beginObject = {
    images: null,
    instructions: null,
    options: null
  }
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
          }) // TODO: get options for buttons
      }).catch(err=>f(err));
  })
}

module.exports = router;
