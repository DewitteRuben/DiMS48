const Option = require('../models/DiMS48Models').Option;

const optionsPhase1 = new Option({
    _id: "phase1Options",
    options: [
        {btnText: '2 of minder', btnValue: '<=2'},
        {btnText: '3 of meer', btnValue: '>=3'},
    ],
});

const optionsPhase2 = new Option({
    _id: "phase2Options",
    options: [
        {btnText: 'Links', btnValue: 'L'},
        {btnText: 'Rechts', btnValue: 'R'},
    ],
});

const getOptions = function getOptions() {
  return [
      optionsPhase1,
      optionsPhase2,
  ];
};

module.exports = {
    getOptions
};
