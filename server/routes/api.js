var express = require('express');
var router = express.Router();

const UserController = require('../Controllers/UserController');
const TestController = require('../Controllers/TestController');

const DiMS48Router = require('./tests/DiMS48Router');

const DIMS48_NAME = 'dims48';

const jsonErrorMessageGenerator = require("../util/jsonErrorGenerator");
const errorMessages = require('../locales/general/errorMessages/en-US.json');

router.get('/categories', function (req, res) {
  TestController.getTestCategories()
    .then(tests => res.json(tests))
    .catch(err => {
      const errorCode = 500;
      res.status(errorCode);
      res.json(
        jsonErrorMessageGenerator.generateGoogleJsonError(
          errorMessages.global,
          errorMessages.reasons.internalServerError,
          errorMessages.categories.couldNotGetCategories + errorMessages.dues.internalServerError,
          errorCode)
      );
    });
});

router.get('/detail/:name', function (req, res) {
  let testName = req.params.name.toLocaleLowerCase();
  TestController.getDetails(testName)
    .then(details => res.json(details))
    .catch(err => {
      if (err.name && err.name === 'notFound') {
        sendTestNotFound(req, res);
      } else {
        const errorCode = 500;
        res.status(errorCode);
        res.json(
          jsonErrorMessageGenerator.generateGoogleJsonError(
            errorMessages.global,
            errorMessages.reasons.internalServerError,
            errorMessages.details.couldNotGetDetails + errorMessages.dues.internalServerError,
            errorCode)
        );
      }
    });
});

router.post('/test/:name/updateConfig', function(req,res){
  let testName = req.params.name.toLowerCase();
  switch (testName) {
    case DIMS48_NAME:
      DiMS48Router.updateConfig(req.body.newConfig, res);
      break;
    default:
      sendTestNotFound(req,res);
  }
});

router.get('/test/:name/initial', function (req, res) {
  let testName = req.params.name.toLowerCase();
  switch (testName) {
    case DIMS48_NAME:
      DiMS48Router.initial(res);
      break;
    default:
      sendTestNotFound(req, res);
  }
});

router.get('/test/:name/part2', function (req, res) {
  let testName = req.params.name.toLocaleLowerCase();
  switch (testName) {
    case DIMS48_NAME:
      DiMS48Router.part2(res);
      break;
    default:
      sendTestNotFound(req, res);
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
      sendTestNotFound(req, res);
  }

});

router.get('/results/:name/:id', function (req, res) {
  const testName = req.params.name.toLocaleLowerCase();
  const id = req.params.id;
  if(id == 'excel'){
    switch (testName) {
      case DIMS48_NAME:
        DiMS48Router.getExcelAllResults(res);
        break;
      default:
        sendTestNotFound(req, res);
    }
  }else{
    switch (testName) {
      case DIMS48_NAME:
        DiMS48Router.getResult(res, id);
        break;
      default:
        sendTestNotFound(req, res);
    }
  }
});

router.patch('/results/:name/:id', function (req, res) {
  const testName = req.params.name.toLocaleLowerCase();
  const id = req.params.id;

  switch (testName) {
    case DIMS48_NAME:
      DiMS48Router.updateClientInfoOrNote(req, res);
      break;
    default:
      sendTestNotFound(req, res);
  }
});

router.post('/results/:name/1', function (req, res) {
  let testName = req.params.name.toLocaleLowerCase();
  switch (testName) {
    case DIMS48_NAME:
      DiMS48Router.postResultPart1(req, res);
      break;
    default:
      sendTestNotFound(req, res);
  }

});

router.post('/results/:name/2', function (req, res) {
  let testName = req.params.name.toLocaleLowerCase();
  switch (testName) {
    case DIMS48_NAME:
      DiMS48Router.postResultPart2(req, res);
      break;
    default:
      sendTestNotFound(req, res);
  }
});

//TODO protect against DDOS!
router.get('/results/:name/pdf/:id', (req, res) => {
  let testName = req.params.name.toLocaleLowerCase();
  const id = req.params.id;
  switch (testName) {
    case DIMS48_NAME:
      DiMS48Router.getPdf(res, id);
      break;
    default:
      sendTestNotFound(req, res);
  }

});

router.get('/results/:name/excel/:id', function (req, res) {
  let testName = req.params.name.toLocaleLowerCase();
  switch (testName) {
    case DIMS48_NAME:
      DiMS48Router.getExcel(req, res);
      break;
    default:
      sendTestNotFound(req, res);
  }
});

router.post('/register', function (req, res) {
  UserController.addUser(req.body).then(newUser => {
    req.session.userId = newUser._id;
    res.status(201);
    res.json({
      user: {email: newUser.email, username: newUser.username}
    });
  }).catch(err => {
    console.log(err);
    res.status(500);
    res.send({msg: "Could not register user"});
  })
});

router.post('/login', function (req, res) {
  let loginData = {
    email: req.body.email,
    password: req.body.password
  };
  UserController.authUser(loginData).then(userData => {
    req.session.userId = userData._id;
    res.status(200);
    res.json({
      user: {email: userData.email, username: userData.username}
    })
  }).catch(err => {
    console.log(err);
    res.send({msg: "Email and password did not match"});
  });
});

const sendTestNotFound = function sendTestNotFound(req, res) {
  const errorCode = 404;
  res.status(errorCode);
  res.json(
    jsonErrorMessageGenerator.generateGoogleJsonError(
      errorMessages.global,
      errorMessages.reasons.requestedResourceNotFound,
      errorMessages.details.testNotFound,
      errorCode)
  );
};

module.exports = router;
