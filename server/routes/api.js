var express = require("express");
let fs = require("fs");
let path = require("path");
var router = express.Router();

const UserController = require("../controllers/UserController");
const TestController = require("../controllers/TestController");

const routerGetter = require("./routerGetter");
const errorMessages = require("../locales/general/errorMessages/nl-BE.json");
const ErrorSender = require("../util/messageSenders/errorSender");
const errorSender = new ErrorSender(errorMessages);

const log4js = require("log4js");
const errorLogger = log4js.getLogger("error");

router.use(function(err, req, res, next) {
  errorLogger.error("Main API router threw", err);
  next();
});

router.get("/categories", function(req, res) {
  TestController.getTestCategories()
    .then(tests => res.json(tests))
    .catch(err => {
      errorLogger.error("Testcontroller getCategories endpoint threw", err);
      errorSender.sendInternalServerError(
        req,
        res,
        errorMessages.categories.couldNotGetCategories
      );
    });
});

router.get("/detail/:name", function(req, res) {
  let testName = req.params.name.toLocaleLowerCase();
  TestController.getDetails(testName)
    .then(details => res.json(details))
    .catch(err => {
      if (err.name && err.name === "notFound") {
        errorSender.sendTestNotFound(req, res);
      } else {
        errorLogger.error("Testcontroller getDetails endpoint threw", err);
        errorSender.sendInternalServerError(
          req,
          res,
          errorMessages.details.couldNotGetDetails
        );
      }
    });
});

router.post("/test/:name/updateConfig", function(req, res) {
  adminOnlyTestSpecificAction(req, res, "updateConfig");
});

router.get("/test/:name/initial", function(req, res) {
  testSpecificAction(req, res, "getInitial");
});

router.get("/test/:name/part2", function(req, res) {
  testSpecificAction(req, res, "getPart2");
});

router.get("/results/:name", function(req, res) {
  testSpecificAction(req, res, "getResults");
});

router.get("/results/:name/:id", function(req, res) {
  testSpecificAction(req, res, "getResult");
});

router.patch("/results/:name/:id", function(req, res) {
  testSpecificAction(req, res, "patchClientInfoOrNote");
});

router.delete("/results/:name/:id", function(req, res) {
  adminOnlyTestSpecificAction(req, res, "deleteResult");
});

router.post("/results/:name/1", function(req, res) {
  testSpecificAction(req, res, "postResultPart1");
});

router.post("/results/:name/2", function(req, res) {
  testSpecificAction(req, res, "postResultPart2");
});

//TODO protect against DDOS!
router.get("/results/:name/pdf/:id", (req, res) => {
  testSpecificAction(req, res, "getPdf");
});

router.get("/results/:name/excel/:id", function(req, res) {
  testSpecificAction(req, res, "getExcel");
});

router.get("/test/:name/normValuesExist", function(req, res) {
  testSpecificAction(req, res, "getNormValuesExist");
});

router.get("/test/:name/normValues", function(req, res) {
  testSpecificAction(req, res, "getNormValues");
});

router.post("/register", function(req, res) {
  UserController.addUser(req.body)
    .then(newUser => {
      req.session.userId = newUser._id;
      res.status(201);
      res.json({
        user: {
          email: newUser.email,
          username: newUser.username
        }
      });
    })
    .catch(err => {
      res.status(500);
      res.send({
        msg: "Could not register user"
      });
    });
});

router.post("/login", function(req, res) {
  let loginData = {
    email: req.body.email,
    password: req.body.password
  };

  UserController.authUser(loginData)
    .then(userData => {
      req.session.userId = userData._id;
      res.status(200);
      res.json({
        user: {
          email: userData.email,
          username: userData.username
        }
      });
    })
    .catch(err => {
      res.send({
        msg: "Email and password did not match"
      });
    });
});

router.get("/isAdmin", function(req, res) {
  if (req.session.userId) {
    UserController.isAdmin(req.session.userId)
      .then(isAdmin =>
        res.json({
          isAdmin
        })
      )
      .catch(err =>
        res.send({
          msg: err
        })
      );
  } else
    res.send({
      msg: "not logged in"
    });
});

router.post("/upload/:name", function(req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send({
      msg: "Er werd geen file meegestuurd.",
      code: 400
    });
  }
  let fileName = req.params.name.toLocaleLowerCase() + ".pdf";
  let uploadFile = req.files.uploadedFile;
  uploadFile.mv(__dirname + "/../uploads/" + fileName, function(err) {
    if (err)
      return res.status(500).json({
        msg: "De file kon niet werden geüpload.",
        code: 500
      });
    res.json({
      msg: `De file werd successvol geüpload.`,
      code: 200,
      status: "ok"
    });
  });
});

router.delete("/remove/:name", function(req, res) {
  let fileName = req.params.name;
  let filePath = path.join(__dirname, `../uploads/${fileName}`);
  fs.access(filePath, err => {
    if (!err) {
      fs.unlink(filePath, function(err) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            msg: "De file kon niet worden verwijderd",
            code: 500
          });
        } else {
          res.json({
            msg: "De file werd succesvol verwijderd",
            code: 200,
            status: "ok"
          });
        }
      });
    } else {
      console.log(err);
      return res.status(500).json({
        msg: "De file kon niet worden verwijderd",
        code: 500
      });
    }
  });
});

const adminOnlyTestSpecificAction = function(req, res, functionName) {
  if (req.session.userId) {
    UserController.isAdmin(req.session.userId)
      .then(isAdmin => {
        if (isAdmin) {
          testSpecificAction(req, res, functionName);
        } else {
          errorSender.sendInvalidEndpointRequested(req, res);
        }
      })
      .catch(err => {
        errorLogger.error("adminOnlyTestSpecificAction threw", err);
        errorSender.sendInternalServerError(req, res, err);
      });
  } else {
    errorSender.sendInvalidEndpointRequested(req, res);
  }
};

const testSpecificAction = function(req, res, functionName) {
  const requestedTestName = req.params.name.toLocaleLowerCase();
  const router = routerGetter.getRouter(requestedTestName);
  if (router) {
    if (routerHasFunction(router, functionName)) {
      router[functionName](req, res);
    } else {
      errorSender.sendInvalidEndpointRequested(req, res);
    }
  } else {
    errorSender.sendTestNotFound(req, res);
  }
};

const routerHasFunction = function routerHasFunction(router, functionToCheck) {
  return typeof router[functionToCheck] !== "undefined";
};

module.exports = router;
