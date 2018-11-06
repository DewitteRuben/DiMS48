var express = require('express');
var router = express.Router();
const DiMS48Controller = require('../Controllers/DiMS48Controller');

router.get('/listTests', function(req,res){
  res.json(''); // TODO: Send actual data
})

router.get('/dims48Begin', function(req,res){
  let beginObject = {
    images: null,
    instructions: null,
    options: null
  }
  DiMS48Controller.getImages()
    .then(images=>{
      beginObject.images = images;
      DiMS48Models.getInstructions()
        .then(instructions=>{
          beginObject.instructions = instructions;
        }) // TODO: get options for buttons
    }).catch(err=>console.error(err));

})

router.get('/dims48Part2', function(req,res){
  res.json(); // TODO: Send all related instructions + images
})

router.get('/results', function(req,res){
  res.json(); // TODO: send all results from both parts
})

router.get('/results/:id', function(req,res){
  let id = req.params.id;
  res.json(); // TODO: send results for test with id X
})

router.post('/resultsPart1', function(req,res){
  res.json(); // TODO: Submit results to db and return testId
})

router.post('/resultsPart2', function(req,res){
  // TODO: submit results to db
})

module.exports = router;
