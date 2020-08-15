package com.finanzportal.redemptionplan;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.text.NumberFormat;
import java.util.Locale;

@RestController
public class RedemptionPlanController {

    @RequestMapping(method = RequestMethod.GET, path = "/redemption_plan")
    public String calculate(
        @PathParam("betrag") String betrag,
        @PathParam("zinssatz") String zinssatz,
        // TODO: What is 'anfangstilgung'? maybe 'tilgungssatz'?
        @PathParam("anfangstilgung") String anfangstilgung) {

        // TODO: Check Params

        double betragNumeric = convertGermanNumber(betrag);
        double anfangstilgungNumeric = convertGermanNumber(anfangstilgung);
        double zinsNumeric = convertGermanNumber(zinssatz);

        NumberFormat numberFormat = NumberFormat.getCurrencyInstance(Locale.GERMAN);
        double annuity = calculateAnnuity(zinsNumeric, betragNumeric, anfangstilgungNumeric);
        double restschuld = betragNumeric;

        int month = 1;
        while(restschuld > 0) {
            System.out.println("Monat:" + month);
            System.out.println("Restschuld: " + restschuld);
            double zinszahlung = calculateZinszahlung(restschuld, zinsNumeric);
            System.out.println("Zinsanteil");
            System.out.println(zinszahlung);
            System.out.println("("+ zinszahlung / Math.min(annuity/12, restschuld) + "%)");
            System.out.println("Tilgungsanteil");
            System.out.println(Math.min(annuity/12.0, restschuld) - zinszahlung);
            restschuld = calculateRestschuld(restschuld, annuity, zinsNumeric);
            month++;
        }

        return numberFormat.format(annuity/12.0);
    }

    public double convertGermanNumber(String number) {
        // optional replace '.' for visualization e.g. 1.000,00
        return Double.parseDouble(number.replace(".", "").replace(',', '.'));
    }

    public double calculateAnnuity(double zinssatz, double fund, double tilgung) {
        return fund * (tilgung/100.0 + zinssatz/100.0);
    }

    public double calculateZinszahlung(double amount, double zinssatz){
        return amount * zinssatz/1200.0;
    }

    public double calculateRestschuld(double amount, double annuity, double zinssatz) {
        return amount * (1 + zinssatz/1200.0) - annuity/12.0;
    }

}
