const DiMS48Instruction = require('../models/DiMS48Models').Instruction;

const instructionPhase1 = new DiMS48Instruction({
    _id: 'phase1',
    instructions: [
        {
            "title": "Testleider",
            "message": "Deze test bestaat uit 48 afbeeldingen. Sommige bestaan uit 2 of minder kleuren, andere uit meer dan 3 kleuren. De cliënt dient voor elke afbeelding telkens zo snel mogelijk te bepalen of de tekening uit 2 of minder kleuren bestaat, of uit 3 of meer kleuren bestaat. De tijd tussen de foto’s is maximaal 5 seconden. ",
        },
        {
            "title": "Testnemer",
            "message": "Je krijgt een aantal afbeeldingen te zien met 2 knoppen erbij. Je moet zo snel mogelijk bepalen of een afbeelding 2 of minder kleuren of 3 of meer kleuren bevat. Je kan klikken op de knoppen",
        }
    ]
});

const instructionInterference = new DiMS48Instruction({
    _id: 'interference',
    instructions: [
        {
            "title": "Testleider",
            "message": "Vraag de cliënt gedurende 3 minuten zo veel mogelijk woorden te benoemen die beginnen met de letter 'P'. Deze taak dient enkel als afleiding, een registratie ervan is dus niet vereist.",
        }
    ]

});

const instructionPhase2 = new DiMS48Instruction({
    _id: 'phase2',
    instructions: [
        {
            "title": "Testleider",
            "message": "Deel 2 van deze test bestaat uit een reeks van 48 paren van afbeeldingen. Nu dient de cliënt aan te geven welke van de beide afbeeldingen hij in het eerste deel van de taak heeft gezien, de linkse of de rechtse. Hier is geen tijdslimiet.",
        },
        {
            "title": "Testnemer",
            "message": "Duid aan welke van de twee afbeeldingen je in de eerste reeks hebt gezien.",
        }
    ]
});

const instructionPhase3 = new DiMS48Instruction({
    _id: 'phase3',
    instructions: [
        {
            "title": "Testleider",
            "message": "Dit is een herhaling van deel 2 na een ongedefinieerde tussentijd! Deel 3 van deze test bestaat uit een reeks van 48 paren van afbeeldingen. Nu dient de cliënt aan te geven welke van de beide afbeeldingen hij in het eerste deel van de taak heeft gezien, de linkse of de rechtse. Hier is geen tijdslimiet.",
        },
        {
            "title": "Testnemer",
            "message": "Duid aan welke van de twee afbeeldingen je in de eerste reeks hebt gezien."
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
