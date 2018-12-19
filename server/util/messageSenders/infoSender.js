const jsonMessageGenerator = require("../../util/jsonMessageGenerator");

const InfoSender = function InfoSender(infoMessages){
    this.infoMessages = infoMessages;

    const sendDocumentUpdated = function sendDocumentUpdated(req, res, detail){
        const responseCode = 200;
        res.status(responseCode);

        res.json(jsonMessageGenerator.generateGoogleInfoMessage(
            responseCode,
            detail
   
          ));
    };

    return {
        sendDocumentUpdated,
    };
};

module.exports = InfoSender;