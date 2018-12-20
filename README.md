# DiMS48


De DIMS48 test bestaat uit drie delen. Deel 1 bestaat uit 48 afbeeldingen. Sommige bestaan uit 3 of minder kleuren, andere uit meer dan 3 kleuren. De proefpersoon dient voor elke afbeelding telkens zo snel mogelijk te bepalen of de tekening uit 3 of minder kleuren bestaat, of uit meer dan 3 kleuren.

Na het eerste deel komt een interferentietaak. Tijdens die taak wordt de proefpersoon gevraagd om gedurende drie minuten zo veel mogelijk woorden op te noemen die beginnen met de letter ‘P’. Deze taak dient enkel als afleiding, een registratie ervan is dus niet vereist.

Het tweede deel bestaat uit een reeks van 48 paren van afbeeldingen. Nu dient de proefpersoon aan te geven welke van de beide afbeeldingen hij in het eerste deel van de taak heeft gezien, de linkse of de rechtse. Hier is geen tijdslimiet.

Deel 3 is een herhaling van deel 2 na een ongedefinieerde tussentijd. Dit deel van de test dient om het lange termijngeheugen te testen van de proefpersoon.

# Documentatie-Code
De website is een 1 page application geschreven met Vue.js. De inhoud word opgehaald via API calls naar een Node.js server. 

## Front-End

## Backend
### Database
De Node.js server verbind met verschillende mongodb databanken. Eén databank per test die afgelegd kan worden en één algemene databank. De algemene databank houd bij welke testen er beschikbaar zijn, de beschrijving en hun configuratie. De database per test bevat specifieke data voor die test. Voor de verbinding met de databanken, maken we gebruik van [mongoose](https://github.com/Automattic/mongoose).

#### Models
Per test zijn er specifieke models, deze gebruikt mongoose voor de CRUD acties. Deze models bevinden zich in de map [/models](server/models) en verder verdeeld volgens hun functie. Bij toevoeging van een test, worden de test specifieke models hier toegevoegd.

### Controllers
De controllers zijn de verbinding tussen de database en de routers. Deze staan in de map [/controllers](server/controllers) De routers gebruiken methodes in de controllers om de data te manipuleren. Bij toevoeging van een test, word er een Controller toegevoegd.

## Routers
Er is 1 algemene router: [api.js](server/routes/api.js). Hier komen alle api requests binnen en worden eventueel doorgestuurd naar de juiste router voor een bepaalde test. De routers die deze requests kunnen afhandelen bevinden zich in de map [/routes/tests](server/routes/tests). Bij toevoeging van een test, word er in die map een Router toegevoegd.

## Seeders
De testen hebben bepaalde data nodig om te kunnen starten. De seeders zorgen dat deze data in de databanken zit. De seeders bevinden zich in de map [/seeders](server/seeders). De eigenlijke data die geseed wordt, bevint zich in de map [/data/initial](server/data/initial) Bij toevoeging van een test, indien nodig, worden er seeders toegevoegd met hun bijhorende data. 

# Toevoegen van een test
Demonstratie over hoe er een nieuwe test kan toegevoegd worden. Voor deze demo gebruiken we de DiMS48 als in te voegen test.

## Models
Maak in de map [models](server/models) een nieuwe map: DiMS48Models. Maak de nodige models aan die specifiek zijn voor de test. Duid per model aan welke database connectie dit model moet gebruiken. Gebruik de naming convention: X.server.model.js: [*results.server.model.js*](server/models/DiMS48Models/results.server.model.js). Maak een Javascript file waar je de Schema's en models exporteert: [*DiMS48Models.js*](server/models/DiMS48Models.js).

## Controller
Maak een nieuwe Javascript file in de map [controllers](server/controllers) en noem deze naar de nieuwe test: [*DiMS48Controller*](server/controllers/DiMS48Controller.js). Maak hier alle functies die data opvragen en/of veranderen in de database. Exporteer alle nodige functies.

## Router
Maak een nieuwe Javascript file in de map [routes/test](server/routes/test) en noem deze naar de nieuwe test: [*DiMS48Router*](server/routes/test/DiMS48Router.js). Maak hier alle functies die te maken hebben met de API calls die met de nieuwe test te maken hebben. De volgende functies moeten ten minste aangemaakt worden: 
<dl>
  <dt>getDetails()</dt>
  <dd>Geeft de beschrijving terug van die test</dd>
  
  <dt>getInitial()</dt>
  <dd>Geeft de initiele data terug die de Vue.js applicatie nodig heeft om de test te starten</dd>
  
  <dt>getResults()</dt>
  <dd>Geeft de resultaten van alle testen die tot nu toe afgenomen zijn terug, kan eventueel ook een Excel document met alle resultaten teruggeven</dd>
  
  <dt>getResult()</dt>
  <dd>Geeft de resultaten van één specieke test terug</dd>
  
  <dt>postResult()</dt>
  <dd>Voegt een nieuw resultaat toe in de database</dd>
  
  <dt>patchClientInfoOrNote()</dt>
  <dd>Voegt de nieuwe waarden in voor de ingevulde velden</dd>
  
  <dt>deleteREsult()</dt>
  <dd>Verwijderd een resultaat (enkel voor admins)</dd>
</dl>
De volgende functies kunnen aangemaakt worden indien gewenst:
<dl>
  <dt>getNormValuesExist()</dt>
  <dd>Zegt of er normscores voor de test bestaan</dd>
  
  <dt>getNormValues()</dt>
  <dd>Geeft de normscores terug</dd>
  
  <dt>getPDF(id)</dt>
  <dd>Geeft een pdf terug met de resultaten van één test</dd>
  
  <dt>getExcel(id)</dt>
  <dd>Geeft een Excel terug met de resultaten van één test</dd>
  
  <dt>updateConfig</dt>
  <dd>Indien er configuratie nodig is voor de test, kan deze via deze methode veranderd worden (enkel voor admins)</dd>
</dl>

## Seeders
Deze zijn enkel nodig indien er specifieke data nodig is om de test te kunnen starten. Maak ik in map [/data/initial](server/data/initial) een nieuwe map en noem deze naar de test: [initialDiMS48](server/data/initialDiMS48). Zet in deze map alle data die geseed moet worden. Maak in de map [*seeders*](server/seeders) een nieuwe Javascript file aan en noem deze naar de data die geseed moet worden: De DiMS48 test heeft bijvoorbeeld afbeeldingen nodig. de Seeder [*imagesSeeder*](server/seeders/imagesSeeder.js) voegt dan de locaties van de afbeeldingen in. Voeg de nieuwe seeder toe in de hoofd seeder [*seeder.js*](server/seeders/seeder.js).
