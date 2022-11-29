package com.co2absorptioncalculator.co2absorptioncalculator;

import com.co2absorptioncalculator.co2absorptioncalculator.controller.HealthController;
import com.co2absorptioncalculator.co2absorptioncalculator.service.HealthService;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class HealthTest {

    @Test
    public void testHealthStatusCode()  {
        HealthController healthController = new HealthController(new HealthService());
        String expectedResult = "OK";

        Assertions.assertEquals(expectedResult, healthController.getHealth());
    }
}

