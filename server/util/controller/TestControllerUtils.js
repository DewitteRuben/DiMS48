const Test = require('../../models/defaultModels').Test;

const makeGetter = function makeGetter(whereClause, fields) {
    return new Promise((s, f) => {
        let query = Test.find(whereClause, fields);
        query.exec(function (err, data) {
            if (err) f(err);
            s(data);
        });
    });
};

module.exports = {
    makeGetter
};