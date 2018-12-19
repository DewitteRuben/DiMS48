const generateGoogleJsonError = function generateGoogleJsonError(domain, reason, message, code, isError) {
    let toReturn;
    
    if(!isError){
        toReturn =  {
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
    }else{
        toReturn = {
            "code": code,
            "message": message
        };
    }

    return toReturn;
};

module.exports = {
    generateGoogleJsonError
}