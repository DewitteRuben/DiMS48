var express = require('express');
var router = express.Router();

const UserController = require('../controllers/UserController');
const TestController = require('../controllers/TestController');

const routerGetter = require('./routerGetter');
const errorMessages = require('../locales/general/errorMessages/nl-BE.json');
const ErrorSender = require('../util/messageSenders/errorSender');
const errorSender = new ErrorSender(errorMessages);

const log4js = require('log4js');
const logger = log4js.getLogger();

router.use(function(err, req, res, next) {
  logger.error('Main API router threw', err);
  next();
});

router.get('/categories', function (req, res) {
  TestController.getTestCategories()
    .then(tests => res.json(tests))
    .catch(err => {
      sendInternalServerError(req, res, errorMessages.categories.couldNotGetCategories);
    });
});

router.get('/detail/:name', function (req, res) {
  let testName = req.params.name.toLocaleLowerCase();
  TestController.getDetails(testName)
    .then(details => res.json(details))
    .catch(err => {
      if (err.name && err.name === 'notFound') {
        errorSender.sendTestNotFound(req, res);
      } else {
        sendInternalServerError(req, res, errorMessages.details.couldNotGetDetails);
      }
    });
});

router.post('/test/:name/updateConfig', function (req, res) {
  if(req.session.userId){
    UserController.isAdmin(req.session.userId).then(isAdmin=>{
      if(isAdmin){
        const requestedTestName = req.params.name.toLowerCase();
        const router = routerGetter.getRouter(requestedTestName);

        if (router) {
          if (routerHasFunction(router, "updateConfig")) {
            router.updateConfig(req, res);
          } else {
            errorSender.sendInvalidEndpointRequested(req, res);
          }

        } else {
          sendTestNotFound(req, res);
        }
      }else{
        errorSender.sendInvalidEndpointRequested(req,res);
      }
    }).catch(err=>{
      errorSender.sendInternalServerError(req,res, err);
    })
  }else{
    errorSender.sendInvalidEndpointRequested(req,res);
  }
});

router.get('/test/:name/initial', function (req, res) {
  const requestedTestName = req.params.name.toLowerCase();
  const router = routerGetter.getRouter(requestedTestName);

  if (router) {
    if (routerHasFunction(router, "getInitial")) {
      router.getInitial(req, res);
    } else {
      errorSender.sendInvalidEndpointRequested(req, res);
    }
  } else {
    errorSender.sendTestNotFound(req, res);
  }
});

router.get('/test/:name/part2', function (req, res) {
  const requestedTestName = req.params.name.toLowerCase();
  const router = routerGetter.getRouter(requestedTestName);

  if (router) {
    if(routerHasFunction(router, "getPart2")){
      router.getPart2(req, res);
    }else{
      sendInvalidEndpointRequested();
    }
  } else {
    errorSender.sendTestNotFound(req, res);
  }
});

router.get('/results/:name', function (req, res) {
  const requestedTestName = req.params.name.toLocaleLowerCase();
  const router = routerGetter.getRouter(requestedTestName);

  if (router) {
    if(routerHasFunction(router, "getResults")){
      router.getResults(req, res);
    }else{
      errorSender.sendInvalidEndpointRequested(req, res);
    }
  } else {
    errorSender.sendTestNotFound(req, res);
  }
});

router.get('/results/:name/:id', function (req, res) {
  const requestedTestName = req.params.name.toLocaleLowerCase();
  const router = routerGetter.getRouter(requestedTestName);

  if (router) {
    if(routerHasFunction(router, "getResult")){
      router.getResult(req, res);
    }else{
      errorSender.sendInvalidEndpointRequested(req, res);
    }
  } else {
    errorSender.sendTestNotFound(req, res);
  }
});

router.patch('/results/:name/:id', function (req, res) {
  const requestedTestName = req.params.name.toLocaleLowerCase();
  const router = routerGetter.getRouter(requestedTestName);

  if (router) {
    if(routerHasFunction(router, "patchClientInfoOrNote")){
      router.patchClientInfoOrNote(req, res);
    }else{
      errorSender.sendInvalidEndpointRequested(req, res);
    }
  } else {
    errorSender.sendTestNotFound();
  }
});

router.delete('/results/:name/:id', function(req,res){
  if(req.session.userId){
    UserController.isAdmin(req.session.userId).then(isAdmin=>{
      if(isAdmin){
        const requestedTestName = req.params.name.toLocaleLowerCase();
        const router = routerGetter.getRouter(requestedTestName);

        if(router){
          if(routerHasFunction(router, "deleteResult")){
            router.deleteResult(req, res);
          }else{
            errorSender.sendInvalidEndpointRequested(req,res);
          }
        }else{
          errorSender.sendTestNotFound();
        }
      }else{
        errorSender.sendInvalidEndpointRequested(req,res)
      }
    }).catch(err=>{
      errorSender.sendInternalServerError(req,res,err);
    })
  }else{
    errorSender.sendInvalidEndpointRequested(req,res);
  }
})

router.post('/results/:name/1', function (req, res) {
  const requestedTestName = req.params.name.toLocaleLowerCase();
  const router = routerGetter.getRouter(requestedTestName);

  if (router) {
    if(routerHasFunction(router, "postResultPart1")){
      router.postResultPart1(req, res);
    }else{
      errorSender.sendInvalidEndpointRequested();
    }

  } else {
    errorSender.sendTestNotFound();
  }
});

router.post('/results/:name/2', function (req, res) {
  const requestedTestName = req.params.name.toLocaleLowerCase();
  const router = routerGetter.getRouter(requestedTestName);

  if (router) {
    if(routerHasFunction(router, "postResultPart2")){
      router.postResultPart2(req, res);
    }else{
      errorSender.sendInvalidEndpointRequested(req, res);
    }
  } else {
    errorSender.sendTestNotFound(req, res);
  }
});

//TODO protect against DDOS!
router.get('/results/:name/pdf/:id', (req, res) => {
  const requestedTestName = req.params.name.toLocaleLowerCase();
  const router = routerGetter.getRouter(requestedTestName);

  if (router) {
    if(routerHasFunction(router, "getPdf")){
      router.getPdf(req, res);
    }else{
      errorSender.sendInvalidEndpointRequested();
    }
  } else {
    errorSender.sendTestNotFound(req, res);
  }
});

router.get('/results/:name/excel/:id', function (req, res) {
  const requestedTestName = req.params.name.toLocaleLowerCase();
  const router = routerGetter.getRouter(requestedTestName);

  if (router) {
    if(routerHasFunction(router, "getExcel")){
      router.getExcel(req, res);
    }else{
      errorSender.sendInvalidEndpointRequested(req, res);
    }
  } else {
    errorSender.sendTestNotFound();
  }
});

router.get('/test/:name/normValuesExist', function (req, res) {
  const requestedTestName = req.params.name.toLocaleLowerCase();
  const router = routerGetter.getRouter(requestedTestName);

  if (router) {
    if(routerHasFunction(router, "getNormValuesExist")){
      router.getNormValuesExist(req, res);
    }else{
      sendInvalidEndpointRequested(req, res);
    }
  } else {
    errorSender.sendTestNotFound(req, res);
  }
});

router.get('/test/:name/normValues', function (req, res) {
  const requestedTestName = req.params.name.toLocaleLowerCase();
  const router = routerGetter.getRouter(requestedTestName);

  if (router) {
    if(routerHasFunction(router, "getNormValues")){
      router.getNormValues(req, res);
    }else{
      errorSender.sendInvalidEndpointRequested(req, res);
    }
  } else {
    errorSender.sendTestNotFound(req, res);
  }
});

router.post('/register', function (req, res) {
  UserController.addUser(req.body).then(newUser => {
    req.session.userId = newUser._id;
    res.status(201);
    res.json({
      user: {
        email: newUser.email,
        username: newUser.username
      }
    });
  }).catch(err => {
    res.status(500);
    res.send({
      msg: "Could not register user"
    });
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
      user: {
        email: userData.email,
        username: userData.username
      }
    })
  }).catch(err => {
    res.send({
      msg: "Email and password did not match"
    });
  });
});

router.get('/isAdmin', function (req, res) {
  if (req.session.userId) {
    UserController.isAdmin(req.session.userId)
      .then(isAdmin => res.json({
        isAdmin
      }))
      .catch(err => res.send({
        msg: err
      }))
  } else res.send({
    msg: "not logged in"
  });
});

router.post('/upload/:name', function (req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send({
      msg: "Geen file geupload"
    });
  }
  let fileName = req.params.name.toLocaleLowerCase() + '.pdf';
  let uploadFile = req.files.toUpload;
  uploadFile.mv(__dirname + '/../uploads/' + fileName, function (err) {
    if (err) return res.status(500).json({
      msg: "Kon file niet uploaden"
    });
    res.redirect('/');
  });
});

const routerHasFunction = function routerHasFunction(router, functionToCheck){
  return typeof router[functionToCheck] !== "undefined";
};

module.exports = router;
