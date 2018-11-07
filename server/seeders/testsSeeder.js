const mongoose = require('mongoose');
let Test = require('../models/defaultModels.js').Test;

let amountOfTests = 2;

function getTests(){
  let DiMS48Part1 = new Test({
    _id: 0,
    title: "Verwerkingsfase en onmiddellijke herkenningsfase",
    description: "Testen van het kortetermijngeheugen",
    route: "dims48a"
  });

  let DiMS48Part2 = new Test({
    _id: 1,
    title: "Uitgese herkenningsfase",
    description: "Testen van het langetermijngeheugen",
    route: "dims48b"
  });

  return [DiMS48Part1, DiMS48Part2];
}

module.exports = { getTests, amountOfTests};
