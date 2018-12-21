#Inhoud
[DiMS48](#dims48)
[Documentatie Code](#documentatie-code)
-[Front-End](#front-end)
-[Backend](#backend)
[Documentatie Gebruik](#documentatie-gebruik)
-[Testleiders](#documentatie-testleiders)
-[Admins](#documentatie-admins)

# DiMS48

De DiMS48 is een gedigitaliseerde test van de DMS48 test (Barbeau et al., 2004). Het is een visuele geheugentest 
en bedoeld om impliciet leren te meten.

Een korte Engelse versie van de instructies en normen van de oorspronkelijke DMS48 vind je hier: downloaden

De DiMS 48 test bestaat uit 3 delen en een interferentietaak:

## Deel 1: verwerkingsfase. 
Hierin worden 48 afbeeldingen één voor één aangeboden. Sommige bestaan uit 2 of minder kleuren, andere uit 3 of meer kleuren. De cliënt dient voor elke afbeelding telkens zo snel mogelijk te bepalen of ze uit 2 of minder kleuren bestaat, of uit 3 of meer kleuren.

- Voor '2 of minder' kleuren dient de cliënt zo snel mogelijk op de corresponderende linkerknop te klikken of via het toetsenbord de op de ingestelde Linker pijl toets te drukken.

- Voor '3 of meer kleuren' dient de cliënt zo snel mogelijk op de corresponderende rechterknop te klikken of via het toetsenbord op de ingestelde Rechter pijl toets te drukken.

- In de test is het grijze instructiescherm bedoeld voor de testleider en het witte instructiescherm voor de cliënt.
Interferentietaak: Hier dient de cliënt gedurende 3 minuten zo veel mogelijk woorden te benoemen die beginnen met de letter 'P'. Deze taak dient enkel als afleiding; een registratie ervan is dus niet vereist.

## Deel 2: herkenningsfase 
Tijdens de herkenningsfase worden 48 paren van afbeeldingen aangeboden. Voor elk paar dient de cliënt aan te duiden welke afbeelding uit de verwerkingsfase hij herkent. Hier is geen tijdslimiet.
## Deel 3 is uitgestelde herkenningsfase (optioneel). 
Dit is een herhaling van deel 2 na een ongedefinieerde tussentijd. Het is niet noodzakelijk om deel 3 af te nemen, 
daarom kan ze ook overgeslagen worden. Om deel 3 te starten dient u het 'ID-nummer van de testnemer' te kopiëren. 
Daarvoor gaat u naar TESTRESULTATEN (links bovenaan) en dan klikt u TOON TESTRESULTATEN bij de DiMS48. 
Daar vindt u alle testen, kies de test van de client en klik op die test. 
Selecteer dan het ID-nummer, klik er rechts op en klik op 'kopiëren'. Dan gaat u terug naar HOME (links bovenaan), START van DiMS48 en gaat u naar 'Uitgestelde herkennings fase' en drukt u op start. Dan rechtsklikken op het veldje 'ID-nummer' en kies 'plakken' vervolgens drukt u op START. 
 
Op dit moment zijn er nog geen normen voor de DiMS48 beschikbaar. Op het einde van de test zal gevraagd worden of de data waarheidsgetrouw (dus van levensechte cliënten) zijn en dus kunnen gebruikt worden voor normenirgsonderzoek. Als u dat aanklikt zullen die opgenomen worden in de databank, aan de hand waarvan howtotest op termijn normen zal kunnen genereren. Voor het opvragen van de testresultaten dient u op het einde van de test linksboven op 'testresultaten' te klikken.

# Documentatie Code
De website is een 1 page application geschreven met Vue.js. De inhoud word opgehaald via API calls naar een Node.js server.

## Front-End
### HTML
Vue.js gebruikt Views en components om de website op te bouwen. Een view bestaat uit verschillende componenten. Deze zijn terug te vinden in de map [/components](client/src/components) en [/views](client/src/views). In deze mappen bevinden zich dus alle HTML in de vorm van templates.
### Javascript
Javascript voor elke pagina is te vinden in de bijhorende component of view. De scope is dus telkens beperkt tot die component of view. Data kan meegegeven worden aan de hand van properties op een child-component of via events.
### Vuex
Vue.js heeft haar eigen data store. Hier bevindt zich alle data van die sessie. Hier wordt bijvoorbeeld de configuratie voor de DiMS48 test opgeslagen. De vuex store is te vinden in de map [/store](client/src/store). In deze map is de data verdeeld in modules. Deze modules zijn te vinden in de map [/modules](client/src/store/modules) en worden in één vuex store gevormd door het bestand [store.js](client/src/store/store.js). De webapplicatie mag niet rechtsreek contact hebben met de data in de vuex store. De data in de vuex store kan opgevraagd worden aan de hand van getters (this.$store.getters["moduleNaam/getterNaam"]). Vanuit de webapplicatie kunnen er actions opgeroepen worden om de data in de vuex store aan te passen (this.$store.dispatch("moduleNaam/actionNaam")). Deze acties zullen dan in de module mutations gebruiken om de data effectief aan te passen.
### API
Om de data op te halen die de web applicatie nodig heeft om de testen te tonen, uit te voeren,... Maakt de webapplicatie gebruik van [howtotestapi.js](client/src/services/api/howtotestapi.js). Dit bestand exporteert verschillende functies die de requests versturen en hun resultaat ontvangen.
## Backend
### Database
De Node.js server verbind met verschillende mongodb databanken. Eén databank per test die afgelegd kan worden en één algemene databank. De algemene databank houdt bij welke testen er beschikbaar zijn, de beschrijving en hun configuratie. De database per test bevat specifieke data voor die test. Voor de verbinding met de databanken, maken we gebruik van [mongoose](https://github.com/Automattic/mongoose).

#### Models
Per test zijn er specifieke models, deze gebruiken mongoose voor de CRUD acties. Deze models bevinden zich in de map [/models](server/models) en verder verdeeld volgens hun functie. Bij toevoeging van een test, worden de test specifieke models hier toegevoegd.

### Controllers
De controllers zijn de verbinding tussen de database en de routers. Deze staan in de map [/controllers](server/controllers). De routers gebruiken methodes in de controllers om de data te manipuleren. Bij toevoeging van een test, wordt er een Controller toegevoegd.

## Routers
Er is 1 algemene router: [api.js](server/routes/api.js). Hier komen alle api requests binnen en worden eventueel doorgestuurd naar de juiste router voor een bepaalde test. De routers die deze requests kunnen afhandelen bevinden zich in de map [/routes/tests](server/routes/tests). Bij toevoeging van een test, wordt er in die map een Router toegevoegd.

## Seeders
De testen hebben bepaalde data nodig om te kunnen starten. De seeders zorgen dat deze data in de databanken zit. De seeders bevinden zich in de map [/seeders](server/seeders). De eigenlijke data die geseed wordt, bevindt zich in de map [/data/initial](server/data/initial) Bij toevoeging van een test, indien nodig, worden er seeders toegevoegd met hun bijhorende data.

# Toevoegen van een test
Demonstratie over hoe er een nieuwe test kan toegevoegd worden. Voor deze demo gebruiken we de DiMS48 als in te voegen test.
## Backend
### Models
Maak in de map [models](server/models) een nieuwe map: DiMS48Models. Maak de nodige models aan die specifiek zijn voor de test. Duid per model aan welke database connectie dit model moet gebruiken. Gebruik de naming convention: X.server.model.js: [*results.server.model.js*](server/models/DiMS48Models/results.server.model.js). Maak een Javascript file waar je de Schema's en models exporteert: [*DiMS48Models.js*](server/models/DiMS48Models.js).

### Controller
Maak een nieuwe Javascript file in de map [controllers](server/controllers) en hernoem deze naar de nieuwe test: [*DiMS48Controller*](server/controllers/DiMS48Controller.js). Maak hier alle functies die data opvragen en/of veranderen in de database. Exporteer alle nodige functies.

### Router
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
  <dd>Verwijdert een resultaat (enkel voor admins)</dd>
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

Voeg nu deze nieuwe router toe in de file [tests.js](server/routes/tests.js) en volg de naming convention. De api zal nu automatisch de juiste requests doorsturen naar de juiste router en in de router, de juiste functie.

Indien er test specifieke error boodschappen moeten worden terug gestuurd, kunnen deze in de map [/locales](server/locales) aangemaakt worden. In de map [/DiMS48](server/locales/DiMS48) bevinden zich bijvoorbeeld de error berichten specifiek voor de DiMS48 test. Deze locales kunnen dan in de test specifieke router gebruikt worden. (zie [/DiMS48Router.js](server/routes/tests/DiMS48Router.js))

### Seeders
Deze zijn enkel nodig indien er specifieke data nodig is om de test te kunnen starten. Maak ik in map [/data/initial](server/data/initial) een nieuwe map en noem deze naar de test: [initialDiMS48](server/data/initialDiMS48). Zet in deze map alle data die geseed moet worden. Maak in de map [*seeders*](server/seeders) een nieuwe Javascript file aan en noem deze naar de data die geseed moet worden: De DiMS48 test heeft bijvoorbeeld afbeeldingen nodig. de Seeder [*imagesSeeder*](server/seeders/imagesSeeder.js) voegt dan de locaties van de afbeeldingen in. Voeg de nieuwe seeder toe in de hoofd seeder [*seeder.js*](server/seeders/seeder.js).

## Front-End
### HTML
Maak de benodigde views aan in de map [/views](client/src/views) en de benodigde componenten in de map [/components](client/src/components). De DiMS48 test heeft zijn eigen specifieke vragenstelling dus maken we [DiMS48View.vue](client/src/views/DiMS48View.vue) om de test te tonen. De naam van een view bestaan altijd uit 2 delen: DiMS48 + View. De DiMS48View.vue gebruikt op zich de componenten: [Dims48aTest](client/src/components/Dims48aTest.vue) om Fase 1 te tonen of [Dims48bTest](client/src/components/Dims48bTest.vue) om Fase 2 van de test te tonen.
### Javascript
Schrijf bij elke view en component de benodigde functies om de specifieke view of component zijn functie uit te laten voeren. Probeer hier altijd zo modulair mogelijk te werken en elke component zijn eigen en enige functie toe te wijzen.

### Vuex
Maak ik de map [/store/modules/test](client/src/store/modules/test) een nieuwe map en deze nieuwe test de naam: [dims48](client/src/store/modules/test/dims48). Maak hier de nodige modules aan. Importeer daarna de aangemaakte modules in de [store.js](client/src/store/store.js) en exporteer de nieuwe modules in de Vuex store. Nu zijn de getters en de actions beschikbaar in de hele web applicatie.

### API
Indien er verbinding moet gemaakt worden met de Node.js server, wordt er een nieuwe functie geëxporteerd in de file [howtotestapi.js](client/src/services/api/howtotestapi.js). Om een nieuwe GET request toe te voegen, exporteer een functie ```javascript export const newGETrequest = (someParameter) => processReq(`/url/to/somewhere/${someParameter}`) ```
Om een nieuwe POST request toe te voegen, exporteer een function ```javascript export const newPOSTrequest = (someParameter, bodyToSend) => processReq(`url/to/somewhere/${someParameter}`, bodyToSend, "POST") ```
Om een file te ontvangen, exporteer een nieuwe functie ```javascript export const getFile = (url) => processBlob(url) ```
# Documentatie Gebruik
## Documentatie Testleiders
### Home
De test DiMS48 staat hier, in de toekomst kunnen er hier dus meerdere testen staan.
Onder ‘Start’ vind je <br/>
-De pdf waarop de test is gebaseerd (die de testleiders zelf ook kunnen downloaden) <br/>
-De startknop voor de eerste fase (deel 1, interferentietaak en deel 2) van de test<br/>
-De startknop voor de tweede fase (deel 3) van de test<br/>
#### Fase 1 Verwerkingsfase en onmiddellijke herkenningsfase
##### Deel 1 van Fase 1
-Klikken op ‘start’<br/>
-Rechtsboven staat er een knop ‘Volledig scherm’, daarop kan je klikken om de test in volledig scherm te tonen. Dat zorgt voor minder afleiding. <br/>
-De gegevens van de testnemer invoeren: <br/>
--De leeftijd (kan niet groter zijn dan 125)<br/>
--Het geslacht: Man, Vrouw, Andere<br/>
--De leeftijd waarop de testnemer met school is gestopt (niet groter dan de leeftijd)<br/>
--Hoe lang de testnemer naar school is geweest (kan niet groter zijn dan de leeftijd waarop de testnemer gestopt is met school)<br/>
-Daarna sla je de gegevens op door op ‘ Gegevens opslaan’ te klikken (indien er foutieve gegevens ingevoerd zijn kunnen die later (bij testresultaten) aangepast worden). <br/>

-Vervolgens krijg je als testleider en de testnemer beiden nog instructies. Je kan op ‘volgende’ klikken om naar de volgende instructie te gaan. <br/>

-Wanneer er op volgende geklikt wordt bij de instructies van de testnemer, dan start deel 1 van de test. <br/>
##### Fase 1 interferentie taak tussen deel 1 en deel 2:
-Na deel 1 volgen er opnieuw instructies voor de testleider. <br/>
-Dan start de interferentie taak. Je klikt op start om de timer te starten en zolang de tijd loopt kan je niet naar het volgende deel, namelijk deel 2. <br/>
-Na de interferentie taak, krijgen de testleider en testnemer opnieuw instructies.<br/>
-Wanneer er op volgende geklikt wordt bij de instructies van de testnemer, dan start deel 2 van de test.<br/>

#### Fase 2 Uitgestelde herkenningsfase
-Klikken op 'start'<br/>
-Rechtsboven staat er een knop ‘Volledig scherm’, daarop kan je klikken om de test in volledig scherm te tonen. Dat zorgt voor minder afleiding. <br/>
-Het unieke ID-nummer ingeven dat de testafnemer toegewezen heeft gekregen na Fase 1. Indien de ID niet terug gevonden kan worden, kan er in de resultaten gekeken worden en kan er gefilterd worden op de info die de testafnemer tijdens Fase 1 heeft ingevuld.<br/>
-Klik hierna op 'start'<br/>
-Vervolgens krijg je als testleider en de testnemer beiden nog instructies. Je kan op ‘volgende’ klikken om naar de volgende instructie te gaan. <br/>
-Wanneer er op volgende geklikt wordt bij de instructies van de testnemer, dan start Fase 2 van de test. <br/>

### Testresultaten
#### Algemeen
-De test DiMS48 staat hier, in de toekomst kunnen er hier dus meerdere testen staan.<br/>
-Onder ‘Toon resultaten’ staan alle testresultaten, de nieuwste test staat bovenaan. <br/>

-Linksboven vind je het unieke id van de test. Dit id heb je nodig om deel 3 van de test te koppelen aan deel 1 en deel 2). <br/>
-Rechtsboven de datum en tijd waarop de test is afgelegd.<br/>

#### Testen filteren
-Bovenaan het scherm vind je filters, waarmee je kan zoeken naar een bepaalde test of een groep testen. <br/>
-Een filter toevoegen: <br/>
--selecteer een filter : dus een categorie waarop je wil filteren bv. “Geslacht”<br/>
--Selecteer een operator : waaraan de categorie moet voldoen bv. “= “<br/>
--Selecteer een waarde: een cijfer, datum, letter bv. ‘m’ <br/>
--Klik op ‘toevoegen’<br/>
--Op deze manier verkrijg je alle testen die door een man zijn gemaakt.<br/>
-Je kan verschillende filters toevoegen<br/>
-Een filter verwijderen kan door op het kruisje te klikken<br/>
-ALLE filters verwijderen kan door op “Leegmaken’ te klikken<br/>

#### Resultaat van een test bekijken
-Om de resultaten van een test te zien, klik je in het vak van die test. <br/>
-Dan krijg je een overzicht van de resultaten.<br/>

## Documentatie Admins
### Opties
Als hoofdgebruiker krijg je toegang tot ‘Opties’ en kan je de instellingen voor komende testen aanpassen. Opgelet: de testen die al in het systeem staan worden niet aangepast. Dit kan eventueel belangrijk zijn om de normwaarden te bepalen!<br/>

De Normscores kunnen bij de ‘Opties’ geupload worden in de vorm van een pdf. Klik hiervoor op de knop ‘Bestand Kiezen’ en kies het pdf bestand. Om dit bestand te uploaden, klik op de **blauwe link ‘Upload’**. Klikken op ‘Opslaan’ zal het bestand niet uploaden.<br/>


Deze zaken zijn aanpasbaar: <br/>
-De tijd tussen de afbeeldingen in deel 1 in seconden van de test (dus de tijd die testnemer heeft om te kiezen tussen 2 of minder kleuren en 3 of meer kleuren )<br/>
-De tijd voor de interferentietest in seconden (standaard 3 minuten = 180 seconden) waarbij de testleider de testnemer woorden laat opsommen die met een ‘p’ beginnen<br/>
-De knoppen op het toetsenbord die gebruikt worden om de testen te maken. Aanpassen kan door te klikken op de woorden van de knop die er staat en dan de gewenste toets in te drukken <br/>
-Deze nieuwe opties worden opgeslagen wanneer er op ‘Opslaan’ geklikt word.<br/>

De hoofdgebruiker kan op de pagina waar alle resultaten getoont worden ook een Excel bestand downloaden waarin alle resultaten staan zodat er makkelijk berekeningen kunnen worden uitgevoerd.
