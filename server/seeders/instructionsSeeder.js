const DiMS48Instruction = require('../models/DiMS48Models').Instruction;

const instructionPhase1 = new DiMS48Instruction({
    _id: 'phase1',
    instructions: {
        client: 'Je krijgt een aantal afbeeldingen te zien met 2 knoppen erbij. Je moet zo snel mogelijk bepalen of een afbeelding 2 of minder kleuren of 3 of meer kleuren bevat. Je kan klikken op de knoppen of “??” toetsen gebruiken.',
        leader: 'Deze test bestaat uit 48 afbeeldingen. Sommige bestaan uit 2 of minder kleuren, andere uit 3 of meer kleuren. De cliënt dient voor elke afbeelding telkens zo snel mogelijk te bepalen of de tekening uit 2 of minder kleuren bestaat, of uit 3 or meer kleuren bestaat. De cliënt krijgt maximaal 5 seconden per foto.'
    }
});

const instructionInterference = new DiMS48Instruction({
  _id: 'interference',
  instructions: {
    client: '',
    leader: 'Vraag de cliënt gedurende 3 minuten zo veel mogelijk woorden te benoemen die beginnen met de letter \'P\'. Deze taak dient enkel als afleiding, indien gewenst kan tijdens deze tijd ook met de cliënt over een ander onderwerp gepraat worden.'
  }
});

const instructionPhase2 = new DiMS48Instruction({
    _id: 'phase2',
    instructions: {
        client: 'Duid aan welke van de twee afbeeldingen je in de eerste reeks hebt gezien.',
        leader: 'Deel 2 van deze test bestaat uit een reeks van 48 paren van afbeeldingen. Nu dient de cliënt aan te geven welke van de beide afbeeldingen hij in het eerste deel van de taak heeft gezien, de linkse of de rechtse. Hier is geen tijdslimiet.'
    }
});

const instructionPhase3 = new DiMS48Instruction({
    _id: 'phase3',
    instructions: {
        client: 'Duid aan welke van de twee afbeeldingen je in de eerste reeks hebt gezien.',
        leader: 'Dit is een herhaling van deel 2 na een ongedefinieerde tussentijd! \n Deel 3 van deze test bestaat uit een reeks van 48 paren van afbeeldingen. Nu dient de cliënt aan te geven welke van de beide afbeeldingen hij in het eerste deel van de taak heeft gezien, de linkse of de rechtse. Hier is geen tijdslimiet.'
    }
});

const getInstructions = function getInstructions() {
    return [
        instructionPhase1,
        instructionInterference,
        instructionPhase2,
        instructionPhase3
    ];
};

module.exports = {
    getInstructions
};
