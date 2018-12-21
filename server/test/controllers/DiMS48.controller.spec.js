const expect = require('chai').expect;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const DiMS48Controller = require('../../controllers/DiMS48Controller');

const makeMockModel = function makeMockModel(toReturn, err) {
    const object = {
        find: function () {
            return {
                lean: () => {
                    return {
                        exec: (testFunction) => {
                            object.amountCalled += 1;
                            let actualToReturn = typeof toReturn !== 'undefined' ? toReturn : {};
                            testFunction(err ? err : null, actualToReturn);
                        }
                    };
                },
            };
        },
        findByIdAndUpdate: function(id, toReturn, toCall){
            toCall(err ? err : null, toReturn);
        },
        findById : function(id, toCall){
            toCall(err ? err : null, toReturn);
        },
        amountCalled: 0
    };

    return object;
};

const makeMockCreate = function makeMockCreate(data, err) {
    return function (data) {
        return {
            "save": function save(toCall) {
                toCall(err ? err : null, data);
            }
        }
    };
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

    it('should delete answers when getting all results', (done) => {
        const mockModel = makeMockModel([{
            "clientInfo": {
                "gender": "m"
            },
            "phase1": {
                "scores": {},
                "answers": ["some", "data"]
            },
            "phase3": {
                "scores": {},
                "answers": ["some", "data"]
            }
        }]);

        const MockDiMS48Model = {
            Result: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.getResults()
            .then((result) => {
                const expected = 1;
                const actual = mockModel.amountCalled;

                expected.should.be.equal(actual);

                const gottenResults = result[0].phase3;

                expect(gottenResults.answers).to.be.undefined;

                done();
            });
    });

    it("should make phase 3 null if part 3 is not done", (done) => {
        const mockModel = makeMockModel([{
            "clientInfo": {
                "gender": "m"
            },
            "phase3": null
        }]);

        const MockDiMS48Model = {
            Result: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.getResults()
            .then((result) => {
                const expected = 1;
                const actual = mockModel.amountCalled;

                expected.should.be.equal(actual);

                const gottenScore = result[0].phase3;

                expect(gottenScore).to.be.null;

                done();
            });
    });

    it('should pass errors via promise', (done) => {
        const mockModel = makeMockModel(undefined, "SomeError");

        const MockDiMS48Model = {
            Result: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.getResults()
            .then((result) => {

            }).catch((error) => {
                const gottenError = error;
                const expectedError = "SomeError";

                gottenError.should.be.equal(expectedError);
                done();
            });
    });

    it('should be able to get a result by Id', (done) => {
        const mockModel = makeMockModel([{
            answersPhase3: {
                answers: [],
                _id: "A1"
            }
        }]);

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

    it('should convert gender to a key on getResult', (done) => {
        const mockModel = makeMockModel([{
            clientInfo: {
                "gender": "m"
            },
            answersPhase3: {
                answers: [],
                _id: "A1"
            }
        }]);

        const MockDiMS48Model = {
            Result: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.getResult(1)
            .then((result) => {
                const expected = 1;
                const actual = mockModel.amountCalled;

                expected.should.be.equal(actual);

                const gottenGender = result.clientInfo.gender;

                //TODO convert this with a function
                const expectedGender = "Man";

                expectedGender.should.be.equal(gottenGender);
                done();
            })
            .catch((err) => {
                throw err;
            });
    });

    it('should be able to add a result', (done) => {
        const mockModel = makeMockCreate();

        const MockDiMS48Model = {
            Result: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.addResult({
                "phase1": [{
                    "_id": "A1",
                    "answer": ">=3"
                }],
                "phase2": [{
                    "_id": "A1",
                    "answer": ">=3"
                }]
            })
            .then((data) => {
                const scoresPhase1 = data.phase1.score;
                const scoresPhase2 = data.phase2.scores;

                expect(scoresPhase1).to.be.a("number");
                expect(scoresPhase2).to.be.an("object");

                done();
            });
    });

    it('should always lowercase a gender', (done) => {
        const mockModel = makeMockCreate();

        const MockDiMS48Model = {
            Result: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.addResult({
                "clientInfo": {
                    "gender": "M"
                },
                "phase1": [{
                    "_id": "A1",
                    "answer": ">=3"
                }],
                "phase2": [{
                    "_id": "A1",
                    "answer": ">=3"
                }]
            })
            .then((data) => {
                const gottenGender = data.clientInfo.gender;
                const expectedGender = "m";

                expectedGender.should.equal(gottenGender);

                done();
            });
    });

    it('should throw an error via promise (addResult)', (done) => {
        const mockModel = makeMockCreate({}, "SomeError");

        const MockDiMS48Model = {
            Result: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.addResult({
                "phase1": [{
                    "_id": "A1",
                    "answer": ">=3"
                }],
                "phase2": [{
                    "_id": "A1",
                    "answer": ">=3"
                }]
            })
            .then((data) => {
                throw "Not Supposed to pass";
            })
            .catch((err) => {
                err.should.equal("SomeError");
                done();
            });
    });

    it('should calculate scores for phase 3 (appendResult)', (done) => {
        const mockModel = makeMockModel({
            "phase3": null
        });

        const MockDiMS48Model = {
            Result: mockModel,
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.appendResult({
                "phase3": [{
                    "_id": "A1",
                    "answer": ">=3"
                }]
            })
            .then((data) => {
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    it('should throw an error via promise (appendResult)', (done) => {
        const mockModel = makeMockModel({}, "SomeError");

        const MockDiMS48Model = {
            Result: mockModel,
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.appendResult({
                "phase3": [{
                    "_id": "A1",
                    "answer": ">=3"
                }]
            })
            .then((data) => {
                throw "Not Supposed to pass";
            })
            .catch((err) => {
                err.should.equal("SomeError");
                done();
            });
    });

    it('getPDF should return a promise', (done) => {
        const mockModel = makeMockModel([{
            "clientInfo": {
                "gender": "m"
            },
            "phase3": null
        }]);

        const MockDiMS48Model = {
            Result: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.getPDF(1)
        .catch((err) => {
            //Should throw error, correct parameters were not passed
            done();
        });
    });

    it('getExcel should return a promise',(done) => {
        const mockModel = makeMockModel([{
            "_id":1,
            "clientInfo": {
                "age": 10,
                "gender": "m"
            },
            "phase3": null
        }]);

        const MockDiMS48Model = {
            Result: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.getExcel(1)
        .catch((err) => {
            //Should throw error, correct parameters were not passed
            done();
        });
    });

    it('getExcelAllResults should return a promise',(done) => {
        const mockModel = makeMockModel([{
            "_id":1,
            "clientInfo": {
                "age": 10,
                "gender": "m"
            },
            "phase3": null
        }]);

        const MockDiMS48Model = {
            Result: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.getExcelAllResults()
        .catch((err) => {
            //Should throw error, correct parameters were not passed
            done();
        });
    });

    it('should be able to update the note of a given test', (done) => {
        const mockModel = makeMockModel({
            "_id":1,
            "clientInfo": {
                "age": 10,
                "gender": "m",
                "notes": "testNote"
            },
            "phase3": null,
            save: function(toCall){
                toCall(null);
            },
        });

        const MockDiMS48Model = {
            Result: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        const updatedNoteText = "updated note";
        diMS48Controller.updateNote(1, updatedNoteText);

        diMS48Controller.getResult(1).then((result) => {
            const gottenNote = result.clientInfo.notes;

            gottenNote.should.be.equal(updatedNoteText);
            done();
        });
    });

    it("should throw error for invalid id via promise", (done) => {
        const errorMessage = "someError";

        const mockModel = makeMockModel({}, errorMessage);

        const MockDiMS48Model = {
            Result: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.updateNote(1).then((data) => {
            throw "invalid note updated passed";
        }).catch((err) => {
            done();
        });
    });

    it("should throw saving error via promise", (done) => {
        const mockModel = makeMockModel({
            "clientInfo": {
                "notes": "someNote"
            },
            save: function(toCall){
                toCall("errorMessage");
            }
        });

        const MockDiMS48Model = {
            Result: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.updateNote(1).then((data) => {
            throw "invalid note updated passed";
        }).catch((err) => {
            const receivedError = err;

            receivedError.should.equal("errorMessage");
            done();
        });
    });

    it("should throw an error if updateNote returns null", (done) => {
        const mockModel = makeMockModel(null, null);

        const MockDiMS48Model = {
            Result: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, null);

        diMS48Controller.updateNote(1).then((data) => {
            throw "invalid note updated passed";
        }).catch((err) => {
            done();
        });
    });

    it("should be able to update the age of a client", (done) => {
        const testId = 1;
        const updatedAge = 50;
        const origionalAge = 9;

        const mockModel = makeMockModel({
            "_id":testId,
            "clientInfo": {
                "age": origionalAge
            },
            save: function(toCall) {
                toCall();
            }
        });

        const MockDiMS48Model = {
            Result: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, null);

        diMS48Controller.updateClientInfo(testId, {
            "age": updatedAge
        }).then(() => {
            diMS48Controller.getResult(testId).then((result) => {
                const gottenAge = result.clientInfo.age;
                
                gottenAge.should.equal(updatedAge);
                gottenAge.should.not.equal(origionalAge);
                done();
            });
        });
    });

    it("should be able to update the gender of a client", (done) => {
        const testId = 1;
        const originalGender = "v";
        const updatedGender = "m";
        
        const mockModel = makeMockModel({
            "_id": testId,
            "clientInfo": {
                "gender": originalGender
            },
            save: function(toCall) {
                toCall();
            }
        });

        const MockDiMS48Model = {
            "Result": mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.updateClientInfo(testId, {
            "gender": updatedGender
        }).then(() => {
            diMS48Controller.getResult(testId).then((result) => {
                const gottenGender = result.clientInfo.gender;

                gottenGender.should.equal("Man");
                gottenGender.should.not.equal(originalGender);
                done();
            });
        });
    });

    it("should be able to update the schooledTill of a client", (done) => {
        const testId = 1;
        const originalSchooledTill = 10;
        const updatedSchooledTill = 20;

        const mockModel = makeMockModel({
            "_id": testId,
            "clientInfo": {
                "schooledTill": originalSchooledTill
            },
            save: function(toCall) {
                toCall();
            }
        });

        const MockDiMS48Model = {
            "Result": mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model);

        diMS48Controller.updateClientInfo(testId, {
            "schooledTill": updatedSchooledTill
        }).then(() => {
            diMS48Controller.getResult(testId).then((result) => {
                const gottenSchooledTill = result.clientInfo.schooledTill;

                gottenSchooledTill.should.equal(updatedSchooledTill);
                gottenSchooledTill.should.not.equal(originalSchooledTill);
                done();
            });
        });
    });

    it("should be able to update the schooledFor of a client", (done) => {
        const testId = 1;
        const originalSchooledFor = 10;
        const updatedSchooledFor = 20;

        const mockModel = makeMockModel({
            "_id": testId,
            "clientInfo": {
                "schooledFor": originalSchooledFor
            },
            "save": function(toCall) {
                toCall();
            }
        });

        const MockDiMS48Model = {
            "Result": mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model);

        diMS48Controller.updateClientInfo(testId, {
            "schooledFor": updatedSchooledFor
        }).then(() => {
            diMS48Controller.getResult(testId).then((result) => {
                const gottenSchooledFor = result.clientInfo.schooledFor;
                
                gottenSchooledFor.should.equal(updatedSchooledFor);
                gottenSchooledFor.should.not.equal(originalSchooledFor);
                done();
            });
        });
    });

    it("should not be able to update the notes via updateClientInfo", (done) => {
        const testId = 1;
        const originalNotes = "someNote";
        const updatedNote = "updatedNote";

        const mockModel = makeMockModel({
            "_id": testId,
            "clientInfo": {
                "notes": originalNotes
            },
            "save": function(toCall){
                toCall();
            }
        });

        const MockDiMS48Model = {
            "Result": mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model);

        diMS48Controller.updateClientInfo(testId, {
            "notes": updatedNote
        }).then(() => {
            diMS48Controller.getResult(testId).then((result) => {
                const gottenNotes = result.clientInfo.notes;
                
                gottenNotes.should.equal(originalNotes);
                gottenNotes.should.not.equal(updatedNote);
                done();
            });
        });
    });

    it('updateClientInfo should throw error via promise if an invalid id is passed', (done) => {
        const errorMessage = "someError";

        const mockModel = makeMockModel({}, errorMessage);

        const MockDiMS48Model = {
            Result: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.updateClientInfo(1, {}).then((data) => {
            throw "invalid note updated passed";
        }).catch((err) => {
            done();
        });
    });
    it("updateClientInfo should throw saving error via promise", (done) => {
        const mockModel = makeMockModel({
            "clientInfo": {
                "notes": "someNote"
            },
            save: function(toCall){
                toCall("errorMessage");
            }
        });

        const MockDiMS48Model = {
            Result: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, {});

        diMS48Controller.updateClientInfo(1, {}).then((data) => {
            throw "invalid note updated passed";
        }).catch((err) => {
            const receivedError = err;

            receivedError.should.equal("errorMessage");
            done();
        });
    });

    it("should throw an error if updateClientInfo find returns null", (done) => {
        const mockModel = makeMockModel(null, null);

        const MockDiMS48Model = {
            Result: mockModel
        };

        const diMS48Controller = DiMS48Controller(MockDiMS48Model, null);

        diMS48Controller.updateClientInfo(1, {}).then((data) => {
            throw "invalid note updated passed";
        }).catch((err) => {
            done();
        });
    });
});