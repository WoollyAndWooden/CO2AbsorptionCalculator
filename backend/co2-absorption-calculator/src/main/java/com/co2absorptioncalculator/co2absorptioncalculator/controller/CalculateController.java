package com.co2absorptioncalculator.co2absorptioncalculator.controller;

import com.co2absorptioncalculator.co2absorptioncalculator.calculator.exception.IncorrectDataException;
import com.co2absorptioncalculator.co2absorptioncalculator.service.CalculateService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class CalculateController {

    private final CalculateService calculateService;

    public CalculateController(CalculateService calculateService) {
        this.calculateService = calculateService;
    }

    @GetMapping("/calculate")
    public Double calculate(@RequestParam String forest, @RequestParam Double area,
                            @RequestParam String age, @RequestParam String habitat,
                            @RequestParam Double degree, @RequestParam String soil,
                            @RequestParam String reservoir, @RequestParam String land,
                            @RequestParam String location) throws IncorrectDataException {

        return calculateService.calculate(forest, area, age, habitat, degree, soil, reservoir, land, location);
    }
}
