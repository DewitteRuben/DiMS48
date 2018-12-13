var express = require('express');
var router = express.Router();

const DiMS48Models = require('../../models/DiMS48Models');
const DefaultModels = require('../../models/defaultModels');

const DiMS48Controller = require('../../Controllers/DiMS48Controller')(DiMS48Models, DefaultModels);
const TestController = require('../../Controllers/TestController');

const jsonErrorMessageGenerator = require("../../util/jsonErrorGenerator");

const errorMessages = require('../../locales/DiMS48/errorMessages/en-US.json');

function updateConfig(newConfig, res){
  TestController.updateConfig("DiMS48", newConfig)
    .then(data=>res.json(data))
    .catch(err=>{
      res.status(500);
      res.json(
        jsonErrorMessageGenerator.generateGoogleJsonError(
          errorMessages.global,
          errorMessages.reasons.internalServerError,
          errorMessages.phases.couldNotGetInitial + errorMessages.dues.internalServerError,
          500)
      );
    })
}

function initial(res) {
  getBeginObject('begin')
    .then(data => res.json(data))
    .catch(err => {
      res.status(500);
      res.json(
        jsonErrorMessageGenerator.generateGoogleJsonError(
          errorMessages.global,
          errorMessages.reasons.internalServerError,
          errorMessages.phases.couldNotGetInitial + errorMessages.dues.internalServerError,
          500)
      );
    });
}

function part2(res) {
  getBeginObject('part2')
    .then(data => res.json(data))
    .catch(err => {
      res.status(500);
      res.send(
        jsonErrorMessageGenerator.generateGoogleJsonError(
          errorMessages.global,
          errorMessages.reasons.internalServerError,
          errorMessages.phases.cloudNotGetPart2_InternalServerError + errorMessages.dues.internalServerError,
          500
        )
      );
    });
}

function getResults(res) {
  DiMS48Controller.getResults()
    .then(results => res.json(results))
    .catch(err => {
      res.status(500);
      res.send(
        jsonErrorMessageGenerator.generateGoogleJsonError(
          errorMessages.global,
          errorMessages.reasons.internalServerError,
          errorMessages.couldNotGetResults + errorMessages.dues.internalServerError,
          500
        )
      );
    });
}

function getResult(res, id) {
  DiMS48Controller.getResult(id)
    .then(result => res.json(result))
    .catch(err => {
      if (err.name === 'CastError') {
        const errorCode = 400;
        res.status(errorCode);
        res.json(
          jsonErrorMessageGenerator.generateGoogleJsonError(
            errorMessages.global,
            errorMessages.reasons.invalidIdSupplied,
            errorMessages.results.couldNotGetResult + errorMessages.dues.invalidIdSupplied,
            errorCode
          )
        );
      } else {
        const errorCode = 500;
        res.status(errorCode);
        res.json(
          jsonErrorMessageGenerator.generateGoogleJsonError(
            errorMessages.global,
            errorMessages.reasons.internalServerError,
            errorMessages.results.internalServerError + errorMessages.dues.internalServerError,
            errorCode
          )
        );
      }
    });
}

function postResultPart1(req, res) {
  DiMS48Controller.addResult(req.body)
    .then((data) => {
      res.status(201);
      res.json({
        testId: data._id
      });
    })
    .catch((err) => {
      const isEnumError = err.errors[Object.keys(err.errors)[0]].properties.type === 'enum';
      console.log(isEnumError);

      if(isEnumError){
        const message = err.errors[Object.keys(err.errors)[0]].properties.message;

        const errorCode = 400;
        res.status(errorCode);
        res.json(
          jsonErrorMessageGenerator.generateGoogleJsonError(
            errorMessages.global,
            errorMessages.reasons.invalidIdSupplied,
            message,
            errorCode
          )
        );
      }else{
        const errorCode = 500;
        res.status(errorCode);
        res.json(
          jsonErrorMessageGenerator.generateGoogleJsonError(
            errorMessages.global,
            errorMessages.reasons.internalServerError,
            errorMessages.results.couldNotSaveResult + errorMessages.dues.internalServerError,
            errorCode
          )
        );
      }
    });
}

function postResultPart2(req, res) {
  DiMS48Controller.appendResult(req.body)
    .then(() => {
      res.status(201);
      res.json({
        created: true
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const errorCode = 400;
        res.status(errorCode);
        res.json(
          jsonErrorMessageGenerator.generateGoogleJsonError(
            errorMessages.global,
            errorMessages.reasons.invalidIdSupplied,
            errorMessages.results.couldNotAppendResult + errorMessages.dues.invalidIdSupplied,
            errorCode
          )
        );
      } else {
        const errorCode = 500;
        res.status(errorCode);
        res.json(
          jsonErrorMessageGenerator.generateGoogleJsonError(
            errorMessages.global,
            errorMessages.reasons.internalServerError,
            errorMessages.results.couldNotAppendResult + errorMessages.dues.internalServerError,
            errorCode
          )
        );
      }
    })
}

function getPdf(res, id) {
  DiMS48Controller.getPDF(id)
    .then((fileBuffer) => {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=rapport-' + id + '.pdf');
      res.send(new Buffer(fileBuffer, 'binary'));
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'CastError') {
        const errorCode = 400;
        res.status(errorCode);
        res.json(
          jsonErrorMessageGenerator.generateGoogleJsonError(
            errorMessages.global,
            errorMessages.reasons.invalidIdSupplied,
            errorMessages.fileGenerators.couldNotGeneratePDF + errorMessages.dues.invalidIdSupplied,
            errorCode
          )
        );
      } else {
        const errorCode = 500;
        res.status(errorCode);
        res.json(
          jsonErrorMessageGenerator.generateGoogleJsonError(
            errorMessages.global,
            errorMessages.reasons.internalServerError,
            errorMessages.fileGenerators.couldNotGeneratePDF + errorMessages.dues.internalServerError,
            errorCode
          )
        );
      }
    });
}

function getExcelAllResults(res){
  DiMS48Controller.getExcelAllResults()
    .then(workbook=>{
      let fileName = 'results.xlsx';
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
      return workbook.write(fileName, res);
    }).catch((err)=>{
      console.log(err);
      ExcelError(err,res);
    })
}

function getExcel(req, res) {
  const id = req.params.id;

  DiMS48Controller.getExcel(id)
    .then(workbook => {
      let fileName = `results${id}.xlsx`;
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
      return workbook.write(fileName, res);
    })
    .catch((err) => {
      ExcelError(err,res);
    });
}

function ExcelError(err, res){
  if (err.name === 'CastError') {
    const errorCode = 400;
    res.status(errorCode);
    res.json(
      jsonErrorMessageGenerator.generateGoogleJsonError(
        errorMessages.global,
        errorMessages.reasons.invalidIdSupplied,
        errorMessages.fileGenerators.couldNotGenerateExcel + errorMessages.dues.invalidIdSupplied,
        errorCode
      )
    );
  } else {
    const errorCode = 500;
    res.status(errorCode);
    res.json(
      jsonErrorMessageGenerator.generateGoogleJsonError(
        errorMessages.global,
        errorMessages.reasons.internalServerError,
        errorMessages.fileGenerators.couldNotGenerateExcel + errorMessages.dues.internalServerError,
        errorCode
      )
    );
  }
}

function getBeginObject(part) {
  return new Promise(function (resolve, reject) {
    const beginObject = {
      images: null,
      instructions: null,
      options: null,
      config: null
    };

    const imagePromise = DiMS48Controller.getImages();
    const instructionPromise = DiMS48Controller.getInstructions();
    const optionsPromise = DiMS48Controller.getOptions();
    const configPromise = TestController.getTestConfig('dims48');

    const promiseArray = [imagePromise, instructionPromise, optionsPromise, configPromise];

    imagePromise.then((images) => {
      beginObject.images = images;
    });

    instructionPromise.then((instructions) => {
      beginObject.instructions = instructions;
    });

    optionsPromise.then((options) => {
      beginObject.options = options;
    });

    configPromise.then((config) => {
      beginObject.config = config;
    });

    Promise.all(promiseArray).then((data) => {
      resolve(beginObject);
    }).catch((err) => {
      reject(err);
    });
  });
}

const updateClientInfoOrNote = function updateClientInfoOrNote(req, res){
  const notes = req.body.notes;
  const testId = req.params.id;
  let donePromise;

  if (typeof notes !== "undefined"){
    donePromise = DiMS48Controller.updateNote(testId, notes);
  }else{
    donePromise = DiMS48Controller.updateClientInfo(testId, req.body);
  }

  donePromise
  .then((result) => {
    const responseCode = 200;

    res.status(responseCode);

    const response =  jsonErrorMessageGenerator.generateGoogleJsonError(
      errorMessages.global,
      errorMessages.reasons.documentUpdated,
      errorMessages.results.updatedDocument,
      responseCode,
      true
    );

    delete response.errors;

    res.json(response );
  })
  .catch((err) => {
    const errorCode = 400;
    res.status(400);
    res.json(
      jsonErrorMessageGenerator.generateGoogleJsonError(
        errorMessages.global,
        errorMessages.reasons.invalidIdSupplied,
        errorMessages.results.couldNotGetResult + errorMessages.dues.invalidIdSupplied,
        errorCode
      )
    );
  });
};

module.exports = {
  updateConfig,
  initial,
  part2,
  getResults,
  getResult,
  postResultPart1,
  postResultPart2,
  getPdf,
  getExcel,
  getExcelAllResults,
  updateClientInfoOrNote
}
