# Express-RestAPI

### Beskrivning
Det här projektet innehåller en serverdel och en klientdel. Servern är byggd med javascript (med användning av node.js och express) som via ett api hanterar resursen "skor" för fiktiva webbsidan *The Shoe Storage*. 

Serverdelen består av filerna:
#### server.js
Har hand om att först och främst skapa en Express serverapplikation och starta servern, men också lägga till resources och konvertera inkommande data till json. 

#### shoes.router.js
Skapar ett router objekt, definierar applikationens router endpoints (get, post, put och delete) och exporterar dessa till server.js via router objektet. 

#### shoes.controllers.js
Hanterar förfrågningar från klienten och svaren från servern. Skriver och läser den json-fil som håller den data som hanteras. Anropar statuskoder som finns definierade i shoes.statuscode.handler.js, beroende på typ av förfrågning från klienten och vad servern svarar med.

#### shoes.statuscode.handler.js
Definierar funktioner som hanterar de statuskoder som behövs. De är anpassade efter klientens förfrågan och serverns svar. Utöver statuskod skickas ett anpassat meddelande, tillsammans med statuskoden, ut till klienten.

#### shoes.json
Json-fil där data sparas i Json-format. Agerar som en liten och enkel databas.

#### server.rest
En fil som använder sig av REST-client. Åtkomstpunkter till alla endpoints finns definierade där.

Klientdelen består av index.html, index.js och styles.css som tillsammans ger ett enkelt användargränsnitt som kan nå apiets enpoints.

### Uppfyllda krav
#### Krav för godkänt:
1. Projektet innehåller minst 4 st. endpoints (GET, POST, PUT & DELETE för en resurs) - JA
2. Samtliga endpoints skall kunna nås via en REST Client fil (.rest|.http) - JA
3. Datan som API:et hanterar sparas lokalt i serverfilen - JA
4. Git & GitHub har använts - JA
5. Projektmappen innehåller en README.md fil - JA
6. Uppgiften lämnas in i tid! - JA
#### Krav för väl godkänt:
1. Alla punkter för godkänt är uppfyllda - JA
2. All data skall vara sparad i en JSON-fil istället för i serverfilen - JA
3. Datan i JSON-filen skall uppdateras då något läggs till, uppdateras eller tas bort - JA
4. Ett simpelt klient-gränssnitt skall finnas för att anropa API:ets olika endpoints, samt
visa upp resultatet vid GET anrop -JA
5. Ytterligare en GET endpoint skall läggas till där det går att hämta ett specifikt objekt - JA
 
Projektet använder sig av npm, express, nodemon och uuid. Dessa dependencies behövs för att appen ska kunna köras. 
Om paketen behöver installeras, kör dessa kommando i terminalen:

npm i npm

npm i express nodemon uuid

#### För att starta servern:
npm start (kommer att köra kommandot 'nodemon server.js')