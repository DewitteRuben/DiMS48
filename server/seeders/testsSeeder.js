const defaultModels = require("../models/defaultModels");
const PhaseTest = defaultModels.PhaseTest;
const Option = defaultModels.Option;
const Test = defaultModels.Test;

let amountOfTests = 1;

function getTests() {
  let DiMS48Part1 = new PhaseTest({
    title: "Verwerkingsfase en onmiddellijke herkenningsfase",
    description: "Testen van het kortetermijngeheugen",
    route: "dims48a"
  });

  let DiMS48Part2 = new PhaseTest({
    title: "Uitgestelde herkenningsfase",
    description: "Testen van het langetermijngeheugen",
    route: "dims48b"
  });

  let DiMS48InterferenceOption = new Option({
    name: "InterferenceDuration",
    value: 180
  });

  let DiMS48Phase1SecondsPerImage = new Option({
    name: "Phase1SecondsPerImage",
    value: 5
  });

  let DiMS48LeftBtnKeyCode = new Option({
    name: "LeftBtnKeyCode",
    value: 37
  });

  let DiMS48RightBtnKeyCode = new Option({
    name: "RightBtnKeyCode",
    value: 39
  });

  let DiMS48 = new Test({
    _id: 0,
    title: "DiMS48",
    description: `<h3>DiMS48</h3><p>De DiMS48 is een gedigitaliseerde test gebaseerd op de DMS48 test. De DMS48 test is een visuele geheugentest ontwerpen om een vroege vaststelling van de ziekte van Alzheimer te kunnen maken.</p><p> Een korte Engelse versie van de instructies en normen betreffende de DMS48: <a href="http://cerco.ups-tlse.fr/~DMS48/DMS48_English_version.pdf" >downloaden</a > <hr/></p><p><u>De DiMS 48 test bestaat uit 3 delen:</u></p><ul> <li> <strong>Deel 1</strong> bestaat uit 48 afbeeldingen. Sommige bestaan uit 2 of minder kleuren, andere uit &nbsp;3 of meer kleuren.&nbsp; De cliënt dient voor elke afbeelding telkens <u>zo snel mogelijk </u>te bepalen of de tekening uit <u>2 of minder kleuren </u>bestaat, of uit <u>3 of meer kleuren</u>.<br /> - Voor '2 of minder' kleuren dient de&nbsp;cliënt zo snel mogelijk op de corresponderende knop te klikken of de ingestelde <leftBtnKey> toets in te drukken.<br /> - Voor '3 of meer kleuren' dient de cliënt zo snel mogelijk op de corresponderende knop te klikken of de ingestelde <rightBtnKey> toets in te drukken. </li> <li> <strong>Interferentietaak:</strong> Vraag de cliënt gedurende <interferenceDuration> zo veel mogelijk woorden te benoemen die beginnen met de letter 'P'. Deze taak dient&nbsp;enkel als afleiding, een registratie ervan is dus niet vereist. </li> <li> <strong>Deel 2</strong> bestaat uit een reeks van 48 paren van afbeeldingen. Nu dient de cliënt aan te geven welke van de beide afbeeldingen hij in het eerste deel van de taak heeft gezien, de linkse of de rechtse. Hier is geen tijdslimiet. </li> <li> <strong>Deel 3</strong> is een herhaling van deel 2 na een ongedefinieerde tussentijd.</li></ul>`,
    phases: [DiMS48Part1, DiMS48Part2],
    config: [
      DiMS48InterferenceOption,
      DiMS48Phase1SecondsPerImage,
      DiMS48LeftBtnKeyCode,
      DiMS48RightBtnKeyCode
    ]
  });

  return [DiMS48];
}

module.exports = { getTests, amountOfTests };
