## Projekt-Strukur:

1. Frontend - ReactJS Projekt 
startet auf localhost:3000 mit 'npm start' in frontend/repayment-plan-app

2. Backend Spring Boot (Java 11) 
Einstiegspunkt 'backend/redemptionplan/src/main/java/com.finanzportal.redemtionplan/RepaymentPlanApplication.java'
startet auf localhost:8080

Wichtig: npm muss zuerst startet, da ansonsten ein 'CORS request did not succeed'-Fehler auftritt 

# Dieser Prototyp ist ausbaufähig durch folgende Erweiterungen:

- Die Anzeige der Rückzahlung ist tabellarisch dargestellt, wobei jede Zeile einen Monat repräsentiert -> visuell besser aufgliedern nach Monaten und Jahren

- Das Design ist basal und nicht sehr ansprechend -> Ans Corparate Design der Sparkasse anpassen

- Die Zinsbindung kann noch nicht ausgewählt werden -> Slider einführen, der den max. Zeitraum angibt und gegebenenfalls den Rückzahlungsplan entsprechend kürzen

- Die Eingabe im Frontend ist auf gültige Parameter limitiert ->
Unbedingt auch backend-seitig Checks einbauen!

- Unwichtigen Code entfernen (entstanden bei initialisierung des React-Projekts)


## Aufgabenbeschreibung:

task for code evaluation

Userstory:

Als Sparkassenkunde
möchte ich einen Tilgungsplan für Kredite berechnen können
damit ich den Verlauf meines Darlehens besser verstehen kann.

Akzeptanzkriterien:
- Der Nutzer kann Darlehensbetrag, Sollzinssatz und anfängliche Tilgung (%) eingeben
- Optional: Der Nutzer kann eine Zinsbindungsdauer zwischen 1 - 30 Jahren wählen
- Mit Klick auf den Button “Berechnen” werden dem Nutzer die monatliche Rate und optional die Restschuld am Ende der Zinsbindung angezeigt
- Weiterhin wird ein Tilgungsplan mit jährlicher Aufgliederung von Jahr, Rate, Zinsanteil, Tilgungsanteil und Restschuld angezeigt
- Bei Änderung der Eingabeparameter wird die Berechnung automatisch aktualisiert
- Der Tilgungsrechner ist sowohl mobil als auch per Desktop System verwendbar

Ergänzende Informationen:
- Die Umsetzung soll frontendseitig mittels ReactJS erfolgen
- Die Berechnung soll im Backend erfolgen und mit Java/Spring Boot realisiert werden
- Der entstandene Code soll problemlos auch auf Systemen anderer Entwickler lauffähig sein
- Die Berechnung kann anhand von: https://www.baufi24.de/baufinanzierung-rechner/darlehensrechner/ oder https://finanzrechner-tilgung.faz.net/rechner3/faz/tilgungsrechner/?AspxAutoDetectCookieSupport=1 überprüft werden
- Die Implementierung kann in Teilen prototypenhaft erfolgen, soll aber wesentliche Programmier-/Architekturkonzepte erkennen lassen
- Das Arbeitsergebnis muss inklusive dem Sourcecode komplett bereitgestellt werden
