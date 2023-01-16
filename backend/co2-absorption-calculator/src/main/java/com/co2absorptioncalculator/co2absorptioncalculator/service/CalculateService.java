package com.co2absorptioncalculator.co2absorptioncalculator.service;

import com.co2absorptioncalculator.co2absorptioncalculator.calculator.FactorCalculator;
import org.springframework.stereotype.Service;

@Service
public class CalculateService {
    private final static int DIVISOR = 10000;

    public Double calculate(String forest, Double area, String age, String habitat,
                            Double degree, String soil, String reservoir, String land, String location) {

        if(forest.equals("mature")) {
            Double k = degree;
            Double z = k;
            Double habitatValue = FactorCalculator.getHabitatValue(habitat);
            Double x = FactorCalculator.getAgeValue(age);
            Double a = FactorCalculator.getSoilValue(soil);
            Double b = FactorCalculator.getLandValue(land);
            Double C = FactorCalculator.getLocationValue(location);

            return (habitatValue * (k * x * z * a * b * C)) * area / DIVISOR;
        }
        return 0d;
    }
}
