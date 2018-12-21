let locales;

const genderKey2Name = function genderKey2Name(genderKey) {
    return locales.clientInfo.genders[genderKey];
};

const convertGenderKeyToName = function convertGenderKeyToName(result) {
    result.clientInfo.gender = genderKey2Name(result.clientInfo.gender);
    return result;
};

module.exports = (injectedLocales) =>{
    locales = injectedLocales;
    return {
        genderKey2Name,
        convertGenderKeyToName
    };
};