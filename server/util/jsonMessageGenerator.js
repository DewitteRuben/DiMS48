const generateGoogleJsonError = function generateGoogleJsonError(domain, reason, message, code, isError) {
    return {
        "error": {
            "errors": [{
                "domain": domain,
                "reason": reason,
                "message": message
            }]
        },
        "code": code,
        "message": message
    };
};

const generateGoogleInfoMessage = function generateGoogleInfoMessage(message, code) {
    return {
        "code": code,
        "message": message
    };
};

module.exports = {
    generateGoogleJsonError,
    generateGoogleInfoMessage
}