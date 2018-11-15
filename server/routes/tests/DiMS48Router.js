var express = require('express');
var router = express.Router();

const DiMS48Models = require('../../models/DiMS48Models');
const DefaultModels = require('../../models/defaultModels');

const DiMS48Controller = require('../../Controllers/DiMS48Controller')(DiMS48Models, DefaultModels);
const TestController = require('../../Controllers/TestController');

function initial(res){
  getBeginObject('begin').then(data => res.json(data)).catch(err => {
      res.status(500);
      res.send("Could not get data for DiMS48 Part 1")
  });
}

function part2(res){
  getBeginObject('part2').then(data => res.json(data)).catch(err => {
      res.status(500);
      res.send("Could not get data for DiMS48 Part 2")
  });
}

function getResults(res){
  DiMS48Controller.getResults()
      .then(results => res.json(results)).catch(err => {
      res.status(500);
      res.send("Could not get results")
  });
}

function getResult(res, id){
  DiMS48Controller.getResult(id)
      .then(result => res.json(result)).catch(err => {
      res.status(500);
      res.send("Could not get result")
  });
}

function postResultPart1(req,res){
  DiMS48Controller.addResult(req.body)
    .then((data) => {
        res.status(201);
        res.json({testId: data._id});
    })
    .catch((error) => {
        res.status(500);
        res.send("Could not add result");
    });
}

function postResultPart2(req,res){
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
}

function getPdf(res,id){
  DiMS48Controller.getPDF(id)
    .then((fileBuffer) => {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=rapport-'+id+'.pdf');
        res.send(new Buffer(fileBuffer, 'binary'));
    })
    .catch((error) => {
        res.send(error);
    });
}

function getExcel(res,id){
  DiMS48Controller.getExcel(id)
    .then(workbook=>{
      let fileName = `results${id}.xlsx`;
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
      return workbook.write(fileName, res);
    })
}

function getBeginObject(part){
  let beginObject = {
    images: null,
    instructions: null,
    options: null,
    config: null
  };
  return new Promise(function(s,f){
    console.log('1');
    DiMS48Controller.getImages()
      .then(images=>{
        console.log('2');
        beginObject.images = images;
        DiMS48Controller.getInstructions(part)
          .then(instructions=>{
            console.log('3');
            beginObject.instructions = instructions;
            DiMS48Controller.getOptions(part)
              .then(options =>{
                console.log('4');
                beginObject.options = options;
                TestController.getTestConfig('DiMS48')
                  .then(config=>{
                    console.log('5');
                    beginObject.config = config;
                    s(beginObject);
                  })
              })
          })
      }).catch(err=>f(err));
  });
}

module.exports = {
  initial,
  part2,
  getResults,
  getResult,
  postResultPart1,
  postResultPart2,
  getPdf,
  getExcel
}
