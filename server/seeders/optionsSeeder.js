const Option = require('../models/DiMS48Models').Option;

const optionsPhase1 = new Option({
    _id: "phase1Options",
    options: [
        {btnText: '2 or less', btnValue: '<=2'},
        {btnText: '3 or more', btnValue: '>=3'},
    ],
});

const optionsPhase2 = new Option({
    _id: "phase2Options",
    options: [
        {btnText: 'Left', btnValue: 'L'},
        {btnText: 'Right', btnValue: 'R'},
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
