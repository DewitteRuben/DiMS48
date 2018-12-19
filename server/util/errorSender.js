const jsonErrorMessageGenerator = require("../util/jsonErrorGenerator");
const errorMessages = require('../locales/general/errorMessages/en-US.json');

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

const sendInvalidEndpointRequested = function sendInvalidEndpointRequested(req, res) {
    const errorCode = 400;
    res.status(errorCode);
    res.json(
        jsonErrorMessageGenerator.generateGoogleJsonError(
            errorMessages.global,
            errorMessages.reasons.requestedEndpointNotValid,
            errorMessages.details.requestedEndpointNotValid,
            errorCode)
    );
};

const sendInternalServerError = function sendInternalServerError(req, res) {
    const errorCode = 500;
    res.status(errorCode);
    res.json(
      jsonErrorMessageGenerator.generateGoogleJsonError(
        errorMessages.global,
        errorMessages.reasons.internalServerError,
        errorMessages.categories.couldNotGetCategories + errorMessages.dues.internalServerError,
        errorCode)
    );
};

module.exports = {
    sendTestNotFound,
    sendInvalidEndpointRequested,
    sendInternalServerError,
};