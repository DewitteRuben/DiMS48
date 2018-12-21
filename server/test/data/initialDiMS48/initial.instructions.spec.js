const expect = require('chai').expect;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const initialInstructionsRepository = require('../../../data/initialDiMS48/instructions/initialInstructions.repository');