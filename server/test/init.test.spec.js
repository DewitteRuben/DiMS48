const should = require('chai').should();
const expect = require('chai').expect;
const chai = require('chai');

chai.should();

describe('Basic Mocha Test to see if testing works', () => {
    it('should not trow errors on basis true = true', () => {
        const iAmTrue = true;

        iAmTrue.should.be.true;
        should.exist(iAmTrue);
        expect(iAmTrue).to.be.true;
    });
});
