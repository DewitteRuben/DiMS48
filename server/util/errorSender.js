const jsonErrorMessageGenerator = require("../util/jsonErrorGenerator");

const ErrorSender = function ErrorSender(errorMessages) {
    this.errorMessages = errorMessages;

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

    const sendInternalServerErrorWithoutDueDetail = function sendInternalServerErrorWithoutDueDetail(req, res, fullDetail) {
        const errorCode = 500;
        res.status(errorCode);
        res.json(
            jsonErrorMessageGenerator.generateGoogleJsonError(
                errorMessages.global,
                errorMessages.reasons.internalServerError,
                fullDetail,
                errorCode)
        );
    };

    const sendInternalServerError = function sendInternalServerError(req, res, detail) {
        sendInternalServerErrorWithoutDueDetail(req, res, detail + errorMessages.dues.internalServerError);
    };

    const sendInvalidIdSuppliedWithoutDueDetail = function sendInternalServerErrorWithoutDueDetail(req, res, fullDetail){
        const errorCode = 400;
        res.status(errorCode);
        res.json(
            jsonErrorMessageGenerator.generateGoogleJsonError(
                errorMessages.global,
                errorMessages.reasons.invalidIdSupplied,
                fullDetail,
                errorCode
            )
        );
    };

    const sendInvalidIdSupplied = function sendInvalidIdSupplied(req, res, detail) {
        sendInvalidIdSuppliedWithoutDueDetail(req, res, detail + errorMessages.dues.invalidIdSupplied);
    };

    return {
        sendTestNotFound,
        sendInvalidEndpointRequested,
        sendInternalServerError,
        sendInvalidIdSupplied,
        sendInvalidIdSuppliedWithoutDueDetail
    };
};

module.exports = ErrorSender;