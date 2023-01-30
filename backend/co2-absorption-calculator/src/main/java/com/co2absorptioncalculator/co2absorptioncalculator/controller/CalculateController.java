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

    @GetMapping("/calculateMature")
    public Double calculateMature(
            @RequestParam String forest,
            @RequestParam Double area,
            @RequestParam String age,
            @RequestParam String habitat,
            @RequestParam Double degree,
            @RequestParam String soil,
            @RequestParam String reservoir,
            @RequestParam String land,
            @RequestParam String location
    ) throws IncorrectDataException {

        return calculateService.calculateMature(forest, area, age, habitat, degree, soil, reservoir, land, location);
    }

    @GetMapping("/calculateYoungFirst")
    public Double calculateYoungFirstOption(
            @RequestParam String forest,
            @RequestParam Double area,
            @RequestParam String groundType,
            @RequestParam String dominantSpecies,
            @RequestParam Double percentage,
            @RequestParam String treeNumber,
            @RequestParam String soil,
            @RequestParam String reservoir,
            @RequestParam String land,
            @RequestParam String location
) throws IncorrectDataException {

        return calculateService.calculateYoungFirstOption(
                forest,
                area,
                groundType,
                dominantSpecies,
                percentage,
                treeNumber,
                soil,
                reservoir,
                land,
                location
        );
    }

    @GetMapping("/calculateYoungSecond")
    public Double calculateYoungSecond(
            @RequestParam String forest,
            @RequestParam Double area,
            @RequestParam String groundType,
            @RequestParam String dominantSpecies1,
            @RequestParam String dominantSpecies2,
            @RequestParam Double percentage1,
            @RequestParam Double percentage2,
            @RequestParam String treeNumber,
            @RequestParam String soil,
            @RequestParam String reservoir,
            @RequestParam String land,
            @RequestParam String location
    ) throws IncorrectDataException {

        return calculateService.calculateYoungSecond(
                forest,
                area,
                groundType,
                dominantSpecies1,
                dominantSpecies2,
                percentage1,
                percentage2,
                treeNumber,
                soil,
                reservoir,
                land,
                location
        );
    }

    @GetMapping("/calculateYoungThird")
    public Double calculateYoungThird(
            @RequestParam String forest,
            @RequestParam Double area,
            @RequestParam String groundType,
            @RequestParam String dominantSpecies1,
            @RequestParam String dominantSpecies2,
            @RequestParam String dominantSpecies3,
            @RequestParam Double percentage1,
            @RequestParam Double percentage2,
            @RequestParam Double percentage3,
            @RequestParam String treeNumber,
            @RequestParam String soil,
            @RequestParam String reservoir,
            @RequestParam String land,
            @RequestParam String location
    ) throws IncorrectDataException {

        return calculateService.calculateYoungThird(
                forest,
                area,
                groundType,
                dominantSpecies1,
                dominantSpecies2,
                dominantSpecies3,
                percentage1,
                percentage2,
                percentage3,
                treeNumber,
                soil,
                reservoir,
                land,
                location
        );
    }
}
