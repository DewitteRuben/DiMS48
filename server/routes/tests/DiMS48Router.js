const path = require("path");
const fs = require("fs");

const DiMS48Models = require("../../models/DiMS48Models");
const DefaultModels = require("../../models/defaultModels");

const DiMS48Controller = require("../../controllers/DiMS48Controller")(
  DiMS48Models,
  DefaultModels
);
const TestController = require("../../controllers/TestController");

const errorMessages = require("../../locales/DiMS48/errorMessages/nl-BE.json");

const ErrorSender = require("../../util/messageSenders/errorSender");
const errorSender = new ErrorSender(errorMessages);

const InfoSender = require("../../util/messageSenders/infoSender");
const infoSender = new InfoSender(errorMessages);

const log4js = require('log4js');
const logger = log4js.getLogger();

const updateConfig = function updateConfig(req, res) {
  const newConfig = req.body.newConfig;

  TestController.updateConfig("DiMS48", newConfig)
    .then(data => {
      infoSender.sendDocumentUpdated(
        req,
        res,
        errorMessages.results.updatedDocument
      );
    })
    .catch(err => {
      errorSender.sendInternalServerError(
        req,
        res,
        errorMessages.phases.couldNotGetInitial
      );
    });
};

const getInitial = function getInitial(req, res) {
  getBeginObject("begin")
    .then(data => res.json(data))
    .catch(err => {
      logger.error("getInitial threw", err);
      errorSender.sendInternalServerError(
        req,
        res,
        errorMessages.phases.couldNotGetInitial
      );
    });
};

const getPart2 = function getPart2(req, res) {
  getBeginObject("part2")
    .then(data => res.json(data))
    .catch(err => {
      logger.error("getPart2 threw", err);
      errorSender.sendInternalServerError(
        req,
        res,
        errorMessages.phases.cloudNotGetPart2_InternalServerError
      );
    });
};

const getResults = function getResults(req, res) {
  DiMS48Controller.getResults()
    .then(results => res.json(results))
    .catch(err => {
      logger.error("getResults threw", err);
      errorSender.sendInternalServerError(
        req,
        res,
        errorMessages.couldNotGetResults
      );
    });
};

const getResult = function getResult(req, res) {
  const id = req.params.id;

  DiMS48Controller.getResult(id)
    .then(result => res.json(result))
    .catch(err => {
      if (err.name === "CastError") {
        errorSender.sendInvalidIdSupplied(
          req,
          res,
          errorMessages.results.couldNotGetResult
        );
      } else {
        logger.error("getResult threw", err);
        errorSender.sendInternalServerError(
          req,
          res,
          errorMessages.results.internalServerError
        );
      }
    });
};

const postResultPart1 = function postResultPart1(req, res) {
  DiMS48Controller.addResult(req.body)
    .then(data => {
      res.status(201);
      res.json({
        _id: data._id
      });
    })
    .catch(err => {
      const isEnumError =
        err.errors[Object.keys(err.errors)[0]].properties.type === "enum";

      if (isEnumError) {
        const message =
          err.errors[Object.keys(err.errors)[0]].properties.message;

        errorSender.sendInvalidIdSuppliedWithoutDueDetail(req, res, message);
      } else {
        logger.error("postResultPart1 threw", err);
        errorSender.sendInternalServerError(
          req,
          res,
          errorMessages.results.couldNotSaveResult
        );
      }
    });
};

const postResultPart2 = function postResultPart2(req, res) {
  DiMS48Controller.appendResult(req.body)
    .then(() => {
      res.status(201);
      res.json({
        _id: req.body._id
      });
    })
    .catch(err => {
      if (err.name === "CastError") {
        errorSender.sendInvalidIdSupplied(
          req,
          res,
          errorMessages.results.couldNotAppendResult
        );
      } else if (err.name === "ValidationError") {
        const invalidFieldValue =
          err.errors[Object.keys(err.errors)[0]].properties.path;

        errorSender.sendInvalidValueSuppliedWithoutDueDetail(
          req,
          res,
          errorMessages.results.cloudNotUpdate +
          errorMessages.dues.invalidValueSuppliedFor +
          invalidFieldValue
        );
      } else if (err.name === "AppendError") {
        errorSender.sendInvalidValueSuppliedWithoutDueDetail(
          req,
          res,
          errorMessages.results.couldNotAppend + errorMessages.dues.answersPhase3AlreadyPresent
        );
      } else {
        logger.error("postResultPart2 threw", err);
        errorSender.sendInternalServerError(
          req,
          res,
          errorMessages.results.couldNotAppendResult
        );
      }
    });
};

//TODO proper error sending
const deleteResult = function deleteResult(req, res) {
  const idToRemove = req.params.id;

  DiMS48Controller.removeResult(idToRemove)
    .then(() => {
      res.json({
        deleted: true,
        msg: "Resultaat verwijderd"
      });
    })
    .catch(err => {
      logger.error("deleteResult threw", err);
      res.json({
        deleted: false,
        msg: "Kon resultaat niet verwijderen, probeer later opnieuw"
      });
    });
};

const getPdf = function getPdf(req, res) {
  const id = req.params.id;

  DiMS48Controller.getPDF(id)
    .then(fileBuffer => {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=rapport-" + id + ".pdf"
      );
      res.send(new Buffer(fileBuffer, "binary"));
    })
    .catch(err => {
      if (err.name === "CastError") {
        errorSender.sendInvalidIdSupplied(
          req,
          res,
          errorMessages.fileGenerators.couldNotGeneratePDF
        );
      } else {
        logger.error("getPdf threw",err);
        errorSender.sendInternalServerError(
          req,
          res,
          errorMessages.fileGenerators.couldNotGeneratePDF
        );
      }
    });
};

const getExcelAll = function getExcelAll(req, res) {
  DiMS48Controller.getExcelAllResults()
    .then(workbook => {
      let fileName = "DiMS48_all_results.xlsx";
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
      return workbook.write(fileName, res);
    })
    .catch(err => {
      if (err.name === "CastError") {
        errorSender.sendInvalidIdSupplied(
          req,
          res,
          errorMessages.fileGenerators.couldNotGenerateExcel
        );
      } else {
        logger.error("getExcelAll threw", err);
        errorSender.sendInternalServerError(
          req,
          res,
          errorMessages.fileGenerators.couldNotGenerateExcel
        );
      }
    });
};

const getExcel = function getExcel(req, res) {
  const id = req.params.id;

  if (id === "all") {
    getExcelAll(req, res);
  } else {
    DiMS48Controller.getExcel(id)
      .then(workbook => {
        let fileName = `results-${id}.xlsx`;
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=" + fileName
        );
        return workbook.write(fileName, res);
      })
      .catch(err => {
        if (err.name === "CastError") {
          errorSender.sendInvalidIdSupplied(
            req,
            res,
            errorMessages.fileGenerators.couldNotGenerateExcel
          );
        } else {
          logger.error("getExcel threw", err);
          errorSender.sendInternalServerError(
            req,
            res,
            errorMessages.fileGenerators.couldNotGenerateExcel
          );
        }
      });
  }
};

const getNormValuesExist = function getNormValuesExist(req, res) {
  res.json({
    exists: fs.existsSync(path.join(__dirname + "/../../uploads/dims48.pdf"))
  });
};

function getNormValues(req, res) {
  res.sendFile(path.join(__dirname + "/../../uploads/dims48.pdf"));
}

const patchClientInfoOrNote = function patchClientInfoOrNote(req, res) {
  const notes = req.body.notes;
  const testId = req.params.id;
  let donePromise;

  if (typeof notes !== "undefined") {
    donePromise = DiMS48Controller.updateNote(testId, notes);
  } else {
    donePromise = DiMS48Controller.updateClientInfo(testId, req.body);
  }

  donePromise
    .then(result => {
      infoSender.sendDocumentUpdated(
        req,
        res,
        errorMessages.results.updatedDocument
      );
    })
    .catch(err => {
      if (err.name === "CastError") {
        errorSender.sendInvalidIdSupplied(
          req,
          res,
          errorMessages.results.cloudNotUpdate
        );
      } else if (err.name === "ValidationError") {
        const invalidFieldValue =
          err.errors[Object.keys(err.errors)[0]].properties.path;

        errorSender.sendInvalidValueSuppliedWithoutDueDetail(
          req,
          res,
          errorMessages.results.cloudNotUpdate +
          errorMessages.dues.invalidValueSuppliedFor +
          invalidFieldValue
        );
      } else {
        logger.error("patchClientInfoOrNote threw", err);
        errorSender.sendInternalServerError(
          req,
          res,
          errorMessages.results.cloudNotUpdate
        );
      }
    });
};

//Util Functions
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
    const configPromise = TestController.getTestConfig("DiMS48");

    const promiseArray = [
      imagePromise,
      instructionPromise,
      optionsPromise,
      configPromise
    ];

    imagePromise.then(images => {
      beginObject.images = images;
    });

    instructionPromise.then(instructions => {
      beginObject.instructions = instructions;
    });

    optionsPromise.then(options => {
      beginObject.options = options;
    });

    configPromise.then(config => {
      beginObject.config = config;
    });

    Promise.all(promiseArray)
      .then(data => {
        resolve(beginObject);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = {
  updateConfig,
  getInitial,
  getPart2,
  getResults,
  getResult,
  postResultPart1,
  postResultPart2,
  deleteResult,
  getPdf,
  getExcel,
  patchClientInfoOrNote,
  getNormValues,
  getNormValuesExist
};