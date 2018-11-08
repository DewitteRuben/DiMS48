const mongoose = require('mongoose');
const sinon = require('sinon');
const should = require('chai').should();
const expect = require('chai').expect;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const DiMS48Controller = require('../../Controllers/DiMS48Controller');


describe('DiMS48Controller', () => {
    it('should exist', () => {
        DiMS48Controller.should.not.be.undefined;
    });

    it('should be able to get a list of tests', (done) => {
        let amountCalled = 0;

        const MockDefaultModels = {
            Test: {
                find: function () {
                    return {
                        exec: (testFunction) => {
                            amountCalled += 1;
                            testFunction(null, {});
                        }
                    };
                }
            }
        };

        const diMS48Controller = DiMS48Controller({}, MockDefaultModels);

        diMS48Controller.getTests()
            .then(() => {
                const expected = 1;
                const actual = amountCalled;

                expected.should.be.equal(actual);
                done();
            });
    });

    it('should be able to get a list of images', (done) => {
        let amountCalled = 0;

        const MockDefaultModels = {
            Image: {
                find: function () {
                    return {
                        exec: (testFunction) => {
                            amountCalled += 1;
                            testFunction(null, {});
                        }
                    };
                }
            }
        };

        const diMS48Controller = DiMS48Controller({}, MockDefaultModels);

        diMS48Controller.getImages()
            .then(() => {
                const expected = 1;
                const actual = amountCalled;

                expected.should.be.equal(actual);
                done();
            });
    });

    it('should be able to get al list of instructions for begin', (done) => {
        let amountCalled = 0;

        const MockDiMS48Model = {
            Instruction: {
                find: function () {
                    return {
                        exec: (testFunction) => {
                            amountCalled += 1;
                            testFunction(null, {});
                        }
                    };
                }
            }
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.getInstructions('begin')
            .then(() => {
                const expected = 1;
                const actual = amountCalled;

                expected.should.be.equal(actual);
                done();
            });
    });

    it('should be able to get al list of instructions for not begin', (done) => {
        let amountCalled = 0;

        const MockDiMS48Model = {
            Instruction: {
                find: function () {
                    return {
                        exec: (testFunction) => {
                            amountCalled += 1;
                            testFunction(null, {});
                        }
                    };
                }
            }
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.getInstructions()
            .then(() => {
                const expected = 1;
                const actual = amountCalled;

                expected.should.be.equal(actual);
                done();
            });
    });

    it('should be able to get a list of options for begin', (done) => {
        let amountCalled = 0;

        const MockDiMS48Model = {
            Option: {
                find: function () {
                    return {
                        exec: (testFunction) => {
                            amountCalled += 1;
                            testFunction(null, {});
                        }
                    };
                }
            }
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.getOptions('begin')
            .then(() => {
                const expected = 1;
                const actual = amountCalled;

                expected.should.be.equal(actual);
                done();
            });
    });

    it('should be able to get a list of options for not begin', (done) => {
        let amountCalled = 0;

        const MockDiMS48Model = {
            Option: {
                find: function () {
                    return {
                        exec: (testFunction) => {
                            amountCalled += 1;
                            testFunction(null, {});
                        }
                    };
                }
            }
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.getOptions()
            .then(() => {
                const expected = 1;
                const actual = amountCalled;

                expected.should.be.equal(actual);
                done();
            });
    });

    it('should be able to get results', (done) => {
        let amountCalled = 0;

        const MockDiMS48Model = {
            Result: {
                find: function () {
                    return {
                        exec: (testFunction) => {
                            amountCalled += 1;
                            testFunction(null, [
                                {
                                    answersPhase3: {
                                        answers: []
                                    }
                                }]);
                        }
                    };
                }
            }
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.getResults()
            .then(() => {
                const expected = 1;
                const actual = amountCalled;

                expected.should.be.equal(actual);
                done();
            });
    });

    it('should be able to get a result by Id', (done) => {
        let amountCalled = 0;

        const MockDiMS48Model = {
            Result: {
                find: function () {
                    return {
                        exec: (testFunction) => {
                            amountCalled += 1;
                            testFunction(null, [
                                {
                                    answersPhase3: {
                                        answers: []
                                    }
                                }]);
                        }
                    };
                }
            }
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.getResult(1)
            .then(() => {
                const expected = 1;
                const actual = amountCalled;

                expected.should.be.equal(actual);
                done();
            });
    });

    it('should be able to get unfinished tests', (done) => {
        let amountCalled = 0;

        const MockDiMS48Model = {
            Result: {
                find: function () {
                    return {
                        exec: (testFunction) => {
                            amountCalled += 1;
                            testFunction(null, [
                                {
                                    answersPhase3: {
                                        answers: []
                                    }
                                }]);
                        }
                    };
                }
            }
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.getUnfinishedTests()
            .then(() => {
                const expected = 1;
                const actual = amountCalled;

                expected.should.be.equal(actual);
                done();
            });
    });

    it('should be able to appand a result', () => {

    })
});
