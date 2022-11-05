package com.co2absorptioncalculator.co2absorptioncalculator.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class HealthService {

    public int getHealth() {
        return HttpStatus.OK.value();
    }
}
