package com.co2absorptioncalculator.co2absorptioncalculator.service;

import com.co2absorptioncalculator.co2absorptioncalculator.calculator.FactorCalculator;
import com.co2absorptioncalculator.co2absorptioncalculator.calculator.exception.IncorrectDataException;
import org.springframework.stereotype.Service;

import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.List;
import java.util.Locale;

@Service
public class CalculateService {

    private final static int DIVISOR = 10000;
    private final static DecimalFormat DECIMAL_FORMAT = new DecimalFormat("#.##", DecimalFormatSymbols.getInstance(Locale.US));

    public CalculateService() {
        DECIMAL_FORMAT.setRoundingMode(RoundingMode.HALF_UP);
    }

// reservoir is still used as a parameter, because of probability of future usage, currently it is  unknown how it can influence result.
    public Double calculateMature(
            Double area,
            String age,
            String habitat,
            Double degree,
            String soil,
            String reservoir,
            String land,
            String location
    ) {
        try {
            Double habitatValue = FactorCalculator.getHabitatValue(habitat);
            Double x = FactorCalculator.getAgeValue(age);
            Double a = FactorCalculator.getSoilValue(soil);
            Double b = FactorCalculator.getLandValue(land);
            Double C = FactorCalculator.getLocationValue(location);

            Double result = (habitatValue * (degree * x  * a * b * C) * area) / DIVISOR;

            return Double.parseDouble( DECIMAL_FORMAT.format(result));

        } catch (IncorrectDataException e) {
            throw new RuntimeException(e);
        }
    }

    public Double calculateYoung(
            Double area,
            String groundType,
            List<String> dominantSpecies,
            List<Double> percentage,
            String treeNumber,
            String soil,
            String reservoir,
            String land,
            String location
    ) {
        Double result  = 0d;
        try {
            Double a = FactorCalculator.getSoilValue(soil);
            Double b = FactorCalculator.getLandValue(land);
            Double c = FactorCalculator.getLocationValue(location);
            Double e = FactorCalculator.getTypeOfGroundValue(groundType);
            Double g = FactorCalculator.getNumberOfTreesValue(treeNumber);
            final Double  AS = 98.9;

            switch (dominantSpecies.size()) {
                case 1 -> {
                    Double f1 = FactorCalculator.getDominantSpeciesValue(dominantSpecies.get(0));
                    Double p1 = percentage.get(0) / 100;
                    result = (AS * e * (f1 * p1) * g * a * b * c * area) / DIVISOR;
                }
                case 2 -> {
                    Double f1 = FactorCalculator.getDominantSpeciesValue(dominantSpecies.get(0));
                    Double f2 = FactorCalculator.getDominantSpeciesValue(dominantSpecies.get(1));
                    Double p1 = percentage.get(0) / 100;
                    Double p2 = percentage.get(1) / 100;
                    result = (AS * e * (f1 * p1 + f2 * p2) * g * a * b * c * area) / 10000;
                }
                case 3 -> {
                    Double f1 = FactorCalculator.getDominantSpeciesValue(dominantSpecies.get(0));
                    Double f2 = FactorCalculator.getDominantSpeciesValue(dominantSpecies.get(1));
                    Double f3 = FactorCalculator.getDominantSpeciesValue(dominantSpecies.get(2));
                    Double p1 = percentage.get(0) / 100;
                    Double p2 = percentage.get(1) / 100;
                    Double p3 = percentage.get(2) / 100;
                    result = (AS * e * (f1 * p1 + f2 * p2 + f3 * p3) * g * a * b * c * area) / 10000;
                }
            }
            return Double.parseDouble(DECIMAL_FORMAT.format(result));

        } catch (IncorrectDataException e) {
            throw new RuntimeException(e);
        }
    }
}
