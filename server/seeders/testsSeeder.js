const mongoose = require('mongoose');
const defaultModels = require('../models/defaultModels');
const PhaseTest = defaultModels.PhaseTest;
const Option = defaultModels.Option;
const Test = defaultModels.Test;

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

  let DiMS48InterferenceOption = new Option({
    name: "InterferenceDuration",
    value: 180
  })

  let DiMS48Phase1SecondsPerImage = new Option({
    name: "Phase1SecondsPerImage",
    value: 5
  })

  let DiMS48 = new Test({
    _id: 0,
    title: "DiMS48",
    description: "Beschrijving hier",
    phases: [DiMS48Part1, DiMS48Part2],
    config: [DiMS48InterferenceOption, DiMS48Phase1SecondsPerImage]
  })
  return [DiMS48];
}

module.exports = { getTests, amountOfTests};
