const mongoose = require('mongoose');
const PhaseTest = require('../models/defaultModels').PhaseTest;
const Test = require('../models/defaultModels.js').Test;

let amountOfTests = 1;

function getTests(){
  let DiMS48Part1 = new PhaseTest({
    title: "Verwerkingsfase en onmiddellijke herkenningsfase",
    description: "Testen van het kortetermijngeheugen",
    route: "dims48a"
  });

  let DiMS48Part2 = new PhaseTest({
    title: "Uitgese herkenningsfase",
    description: "Testen van het langetermijngeheugen",
    route: "dims48b"
  });

  let DiMS48 = new Test({
    _id: 0,
    title: "DiMS48",
    description: "Beschrijving hier",
    route: "dims48",
    phases: [DiMS48Part1, DiMS48Part2]
  })
  return [DiMS48];
}

module.exports = { getTests, amountOfTests};
