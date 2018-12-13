const mongoose = require('mongoose');
const sinon = require('sinon');
const should = require('chai').should();
const expect = require('chai').expect;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const DiMS48Controller = require('../../controllers/DiMS48Controller');

const makeMockModel = function makeMockModel(toReturn) {
    const object = {
        find: function () {
            return {
                lean: () => {
                    return {
                        exec: (testFunction) => {
                            object.amountCalled += 1;
                            let actualToReturn = typeof toReturn !== 'undefined' ? toReturn : {};
                            testFunction(null, actualToReturn);
                        }
                    }
                },
            };
        },
        amountCalled: 0
    };

    return object;
};

describe('DiMS48Controller', () => {
    it('should exist', () => {
        DiMS48Controller.should.not.be.undefined;
    });

    it('should be able to get a list of tests', (done) => {
        const mockModel = makeMockModel();

        const MockDefaultModels = {
            Test: mockModel
        };

        const diMS48Controller = DiMS48Controller({}, MockDefaultModels);

        diMS48Controller.getTests()
            .then(() => {
                const expected = 1;
                const actual = mockModel.amountCalled;

                expected.should.be.equal(actual);
                done();
            });
    });

    it('should be able to get a list of images', (done) => {
        const mockModel = makeMockModel();

        const MockDefaultModels = {
            Image: mockModel
        };

        const diMS48Controller = DiMS48Controller({}, MockDefaultModels);

        diMS48Controller.getImages()
            .then(() => {
                const expected = 1;
                const actual = mockModel.amountCalled;

                expected.should.be.equal(actual);
                done();
            });
    });

    it('should be able to get al list of instructions for begin', (done) => {
        const mockModel = makeMockModel();

        const MockDiMS48Model = {
            Instruction: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.getInstructions('begin')
            .then(() => {
                const expected = 1;
                const actual = mockModel.amountCalled;

                expected.should.be.equal(actual);
                done();
            });
    });

    it('should be able to get al list of instructions for not begin', (done) => {
        const mockModel = makeMockModel();

        const MockDiMS48Model = {
            Instruction: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.getInstructions()
            .then(() => {
                const expected = 1;
                const actual = mockModel.amountCalled;

                expected.should.be.equal(actual);
                done();
            });
    });

    it('should be able to get a list of options for begin', (done) => {
        const mockModel = makeMockModel();

        const MockDiMS48Model = {
            Option: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.getOptions('begin')
            .then(() => {
                const expected = 1;
                const actual = mockModel.amountCalled;

                expected.should.be.equal(actual);
                done();
            });
    });

    it('should be able to get a list of options for not begin', (done) => {
        const mockModel = makeMockModel();

        const MockDiMS48Model = {
            Option: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.getOptions()
            .then(() => {
                const expected = 1;
                const actual = mockModel.amountCalled;

                expected.should.be.equal(actual);
                done();
            });
    });

    it('should be able to get results', (done) => {
        const mockModel = makeMockModel([]);

        const MockDiMS48Model = {
            Result: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.getResults()
            .then(() => {
                const expected = 1;
                const actual = mockModel.amountCalled;

                expected.should.be.equal(actual);
                done();
            });
    });

    it('should be able to get a result by Id', (done) => {
        const mockModel = makeMockModel([{answersPhase3: {answers: [], _id: "A1"}}]);

        const MockDiMS48Model = {
            Result: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.getResult(1)
            .then(() => {
                const expected = 1;
                const actual = mockModel.amountCalled;

                expected.should.be.equal(actual);
                done();
            })
            .catch((err) => {
                throw err;
            });
    });

    it('should be able to get unfinished tests', (done) => {
        const mockModel = makeMockModel();

        const MockDiMS48Model = {
            Result: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.getUnfinishedTests()
            .then(() => {
                const expected = 1;
                const actual = mockModel.amountCalled;

                expected.should.be.equal(actual);
                done();
            });
    });
});
