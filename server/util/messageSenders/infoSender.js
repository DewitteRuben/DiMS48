const jsonMessageGenerator = require("../../util/jsonMessageGenerator");

const InfoSender = function InfoSender(infoMessages){
    this.infoMessages = infoMessages;

    const sendDocumentUpdated = function sendDocumentUpdated(req, res, detail){
        const responseCode = 200;
        res.status(responseCode);

        res.json(jsonMessageGenerator.generateGoogleInfoMessage(
            errorMessages.global,
            errorMessages.reasons.documentUpdated,
            detail,
            responseCode
          ));
    };

    return {
        sendDocumentUpdated,
    };
};

module.exports = InfoSender;