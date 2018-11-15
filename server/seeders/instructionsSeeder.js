const DiMS48Instruction = require('../models/DiMS48Models').Instruction;

const instructionPhase1 = new DiMS48Instruction({
    _id: 'phase1',
    instructions: [
        {
            "title": "Testleider",
            "message": "Fase 1 instructies voor de testleider",
        },
        {
            "title": "Testnemer",
            "message": "Fase 1 instructies voor de testnemer",
        }
    ]
});

const instructionInterference = new DiMS48Instruction({
    _id: 'interference',
    instructions: [
        {
            "title": "Testnemer",
            "message": "Interferentie instructies voor de testnemer",
        }
    ]

});

const instructionPhase2 = new DiMS48Instruction({
    _id: 'phase2',
    instructions: [
        {
            "title": "Testleider",
            "message": "Fase 2 instructies voor de testleider",
        },
        {
            "title": "Testnemer",
            "message": "Fase 2 instructies voor de testnemer",
        }
    ]
});

const instructionPhase3 = new DiMS48Instruction({
    _id: 'phase3',
    instructions: [
        {
            "title": "Testleider",
            "message": "Fase 2 instructies voor de testleider",
        },
        {
            "title": "Testnemer",
            "message": "Fase 2 instructies voor de testnemer",
        }
    ]
});

const instructionEnd = new DiMS48Instruction({
    _id: 'end',
    instructions: [
        {
            "title": "Testnemer",
            "message": "Einde van de test, geef het toestel aan de testleider.",
        }
    ]
});

const getInstructions = function getInstructions() {
    return [
        instructionPhase1,
        instructionInterference,
        instructionPhase2,
        instructionPhase3,
        instructionEnd
    ];
};

module.exports = {
    getInstructions
};
