# finanzportal
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
