const Option = require('../models/DiMS48Models').Option;

const optionsPhase1 = new Option({
    _id: "phase1",
    options: [
        {btnText: '2 of minder', btnValue: '<=2'},
        {btnText: '3 of meer', btnValue: '>=3'},
    ],
});

const optionsPhase2 = new Option({
    _id: "phase2",
    options: [
        {btnText: 'Links', btnValue: 'L'},
        {btnText: 'Rechts', btnValue: 'R'},
    ],
});

const optionsPhase3 = new Option({
    _id: "phase3",
    options: [
        {btnText: 'Links', btnValue: 'L'},
        {btnText: 'Rechts', btnValue: 'R'},
    ],
});

const getOptions = function getOptions() {
  return [
      optionsPhase1,
      optionsPhase2,
      optionsPhase3,
  ];
};

module.exports = {
    getOptions
};
