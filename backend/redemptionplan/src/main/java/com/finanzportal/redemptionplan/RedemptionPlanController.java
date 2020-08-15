package com.finanzportal.redemptionplan;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.text.DecimalFormat;
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
        return numberFormat.format(annuity/12.0);
    }

    public double convertGermanNumber(String number) {
        // optional replace '.' for visualization e.g. 1.000,00
        return Double.parseDouble(number.replace(".", "").replace(',', '.'));
    }

    public double calculateAnnuity(double zinssatz, double fund, double tilgung) {
        return fund * (tilgung/100.0 + zinssatz/100.0);
    }

}
