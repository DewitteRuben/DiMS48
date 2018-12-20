const initialTestRepository = require('../data/initial/tests/initialTests.repository');
const Test = initialTestRepository.getDatabaseModel();

const seed = function seed() {
  const tests = initialTestRepository.getTests();

  tests.forEach((test) => test.save());
};

const isDatabaseSeeded = function isDatabaseSeeded() {
  return new Promise((resolve, reject) => {
    const testQuery = Test.find();

    testQuery.exec((err, data) => {
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