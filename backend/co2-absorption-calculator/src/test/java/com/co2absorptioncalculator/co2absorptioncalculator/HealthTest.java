package com.co2absorptioncalculator.co2absorptioncalculator;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import java.io.IOException;

public class HealthTest {

    private static final CloseableHttpClient CLIENT = HttpClients.createDefault();
    private static final String URL = "http://localhost:8080/health";

    @AfterAll
    public static void closeClient() throws IOException {
        CLIENT.close();
    }

    @Test
    public void testHealthStatusCode() throws IOException {
        CloseableHttpResponse response = CLIENT.execute(new HttpGet(URL));
        String resultOfGetMethod = EntityUtils.toString(response.getEntity());

        Assertions.assertEquals(HttpStatus.OK.value(), Integer.valueOf(resultOfGetMethod));
    }
}

