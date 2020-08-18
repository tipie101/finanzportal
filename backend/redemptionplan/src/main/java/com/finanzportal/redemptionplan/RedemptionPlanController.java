package com.finanzportal.redemptionplan;

import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Locale;

@RestController
public class RedemptionPlanController {

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET, path = "/redemption_plan")
    public JSONObject calculate(
        @PathParam("betrag") String betrag,
        @PathParam("zinssatz") String zinssatz,
        // TODO: What is 'anfangstilgung'? maybe 'tilgungssatz'?
        @PathParam("anfangstilgung") String anfangstilgung) {

        // TODO: Check Params

        double betragNumeric = convertGermanNumber(betrag);
        double anfangstilgungNumeric = convertGermanNumber(anfangstilgung);
        double zinsNumeric = convertGermanNumber(zinssatz);
        double annuity = calculateAnnuity(zinsNumeric, betragNumeric, anfangstilgungNumeric);
        double restschuld = betragNumeric;

        ArrayList<double[]> monthlyPayments = new ArrayList<>();
        monthlyPayments.add(new double[]{restschuld, 0, 0}); // before the first payment is due
        int month = 1;
        // calculate 'Rate' ~ that is annuity/12.0 rounded
        while(restschuld > annuity/12.0) {
            double zinszahlung = calculateZinszahlung(restschuld, zinsNumeric);
            // TODO: Use this logic in monthlyPayment-List?
/*            System.out.println("Zinsanteil");
            System.out.println(zinszahlung);
            System.out.println("("+ zinszahlung / Math.min(annuity/12.0, restschuld) + "%)");
            System.out.println("Tilgungsanteil");
            System.out.println(Math.min(annuity/12.0, restschuld) - zinszahlung);*/
            restschuld = calculateRestschuld(restschuld, annuity, zinsNumeric);
            month++;
            monthlyPayments.add(new double[]{
                    restschuld,
                    roundNumber(zinszahlung, 2),
                    roundNumber(Math.min(annuity / 12.0, restschuld) - zinszahlung, 2),
                    // % der zinszahlung
                    roundNumber(100.0 * (zinszahlung / Math.min(annuity/12.0, restschuld)), 4)
            });
        }
        monthlyPayments.forEach(monthlyData -> System.out.println(Arrays.toString(monthlyData)));

        JSONObject json = new JSONObject();
        json.put("rate", roundNumber(annuity/12.0, 2));
        json.put("tilgungsplan", monthlyPayments);
        return json;
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
        // Check if all terms should be rounded in calculation?
        // Yep but instead before passing the param, new param is annuity/12.0 rounded to two decimals
        return roundNumber(amount * (1 + zinssatz/1200.0) - annuity/12.0, 2);
    }

    public double roundNumber(double number, int decimals){
        BigDecimal preciseResult = new BigDecimal(number);
        BigDecimal roundResult = preciseResult.setScale(decimals, RoundingMode.HALF_UP);
        return roundResult.doubleValue();
    }

}
