package com.co2absorptioncalculator.co2absorptioncalculator.controller;

import com.co2absorptioncalculator.co2absorptioncalculator.service.CalculateService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class CalculateController {

    private final CalculateService calculateService;

    public CalculateController(CalculateService calculateService) {
        this.calculateService = calculateService;
    }

    @GetMapping("/calculateMature")
    public Double calculateMature(
            @RequestParam Double area,
            @RequestParam String age,
            @RequestParam String habitat,
            @RequestParam Double degree,
            @RequestParam String soil,
            @RequestParam String reservoir,
            @RequestParam String land,
            @RequestParam String location
    ) {

        return calculateService.calculateMature(area, age, habitat, degree, soil, reservoir, land, location);
    }

    @GetMapping("/calculateYoung")
    public Double calculateYoung(
            @RequestParam Double area,
            @RequestParam String groundType,
            @RequestParam List<String> dominantSpecies,
            @RequestParam List<Double> percentage,
            @RequestParam String treeNumber,
            @RequestParam String soil,
            @RequestParam String reservoir,
            @RequestParam String land,
            @RequestParam String location

    ) {
        return calculateService.calculateYoung(area, groundType, dominantSpecies, percentage,
                treeNumber, soil, reservoir, land, location);
    }
}
