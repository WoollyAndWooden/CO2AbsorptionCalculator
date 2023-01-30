package com.co2absorptioncalculator.co2absorptioncalculator.service;

import com.co2absorptioncalculator.co2absorptioncalculator.calculator.FactorCalculator;
import com.co2absorptioncalculator.co2absorptioncalculator.calculator.exception.IncorrectDataException;
import org.springframework.stereotype.Service;

@Service
public class CalculateService {

    private final static int DIVISOR = 10000;

    public Double calculateMature(
            String forest,
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

            return (habitatValue * (degree * x  * a * b * C)) * area / DIVISOR;

        } catch (IncorrectDataException e) {
            throw new RuntimeException(e);
        }
    }

    public Double calculateYoungFirstOption(
            String forest,
            Double area,
            String groundType,
            String dominantSpecies,
            Double percentage,
            String treeNumber,
            String soil,
            String reservoir,
            String land,
            String location
    ) {
        try {
            Double a = FactorCalculator.getSoilValue(soil);
            Double b = FactorCalculator.getLandValue(land);
            Double c = FactorCalculator.getLocationValue(location);
            final Double  AS = 98.9;
            Double e = FactorCalculator.getTypeOfGroundValue(groundType);
            Double f = FactorCalculator.getDominantSpeciesValue(dominantSpecies);
            Double g = FactorCalculator.getNumberOfTreesValue(treeNumber);
            Double p = 0d; // not known factor ?
            percentage = percentage/100;

            return (AS * e * (f * percentage) *g * a * b * c * area) / 10000;

        } catch (IncorrectDataException e) {
            throw new RuntimeException(e);
        }
    }

    public Double calculateYoungSecond(
            String forest,
            Double area,
            String groundType,
            String dominantSpecies1,
            String dominantSpecies2,
            Double percentage1,
            Double percentage2,
            String treeNumber,
            String soil,
            String reservoir,
            String land,
            String location
    ) {

        try {
            Double a = FactorCalculator.getSoilValue(soil);
            Double b = FactorCalculator.getLandValue(land);
            Double c = FactorCalculator.getLocationValue(location);
            final Double  AS = 98.9;
            Double e = FactorCalculator.getTypeOfGroundValue(groundType);
            Double f1 = FactorCalculator.getDominantSpeciesValue(dominantSpecies1);
            Double f2 = FactorCalculator.getDominantSpeciesValue(dominantSpecies2);
            Double g = FactorCalculator.getNumberOfTreesValue(treeNumber);
            Double p = 0d; // not known factor ?
            percentage1 = percentage1/100;
            percentage2 = percentage2/100;

            return (AS * e * (f1 * percentage1 + f2 * percentage2) *g * a * b * c * area) / 10000;
        } catch (IncorrectDataException e) {
            throw new RuntimeException(e);
        }
    }

    public Double calculateYoungThird(
            String forest,
            Double area,
            String groundType,
            String dominantSpecies1,
            String dominantSpecies2,
            String dominantSpecies3,
            Double percentage1,
            Double percentage2,
            Double percentage3,
            String treeNumber,
            String soil,
            String reservoir,
            String land,
            String location
    ) {
        try {
            Double a = FactorCalculator.getSoilValue(soil);
            Double b = FactorCalculator.getLandValue(land);
            Double c = FactorCalculator.getLocationValue(location);
            final Double  AS = 98.9;
            Double e = FactorCalculator.getTypeOfGroundValue(groundType);
            Double f1 = FactorCalculator.getDominantSpeciesValue(dominantSpecies1);
            Double f2 = FactorCalculator.getDominantSpeciesValue(dominantSpecies2);
            Double f3 = FactorCalculator.getDominantSpeciesValue(dominantSpecies3);
            Double g = FactorCalculator.getNumberOfTreesValue(treeNumber);
            Double p = 0d;  // not known factor ?
            percentage1 = percentage1/100;
            percentage2 = percentage2/100;
            percentage3 = percentage3/100;

            return (AS * e * (f1 * percentage1 + f2 * percentage2 + f3 * percentage3) * g * a * b * c * area) / 10000;

        } catch (IncorrectDataException e) {
            throw new RuntimeException(e);
        }

    }
}
