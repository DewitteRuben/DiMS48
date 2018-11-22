const generateGoogleJsonError = function generateGoogleJsonError(domain, reason, message, code) {
    return {
        "error": {
            "errors": [{
                "domain": domain,
                "reason": reason,
                "message": message
            }],
            "code": code,
            "message": message
        }
    };
};

module.exports = {
    generateGoogleJsonError
}