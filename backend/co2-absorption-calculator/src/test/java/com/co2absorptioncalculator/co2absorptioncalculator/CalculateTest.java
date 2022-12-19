package com.co2absorptioncalculator.co2absorptioncalculator;

import com.co2absorptioncalculator.co2absorptioncalculator.service.CalculateService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class CalculateTest {
    private CalculateService calculateService = new CalculateService();

    @Test
    public void testCalculate() {
        String expectedResult = "Calculated";

        Assertions.assertEquals(expectedResult, calculateService.calculate());
    }
}
