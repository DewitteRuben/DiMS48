const initialOptionsRepository = require('../data/initialDiMS48/options/initialOptions.repository');
const Option = initialOptionsRepository.getDatabaseModel();

const seed = function seed() {
    const options = initialOptionsRepository.getOptions();
    options.forEach((option) => option.save());
};

const isDatabaseSeeded = function isDatabaseSeeded() {
    return new Promise((resolve, reject) => {
        const optionQuery = Option.find();

        optionQuery.exec((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.length !== 0);
            }
        });
    });
};

module.exports = {
    seed,
    isDatabaseSeeded
};
