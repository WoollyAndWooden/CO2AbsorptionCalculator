package com.co2absorptioncalculator.co2absorptioncalculator.calculator;

public class FactorCalculator {

    public static Double getHabitatValue(String habitat) {
        return switch (habitat) {
            case "Alder" -> 524d;
            case "Swamp-birch" -> 615d;
            case "Swamp-oak" -> 329d;
            default -> 0d;
        };
    }

    public static Double getX(String age) {
        return switch (age) {
            case "30-50" -> 1.2;
            case "51-70", "71-90" -> 1.4;
            case "91-110" -> 1.3;
            case "111-130" -> 1.5;
            default -> 0d;
        };
    }

    public static Double getA(String soil) {
        return switch (soil) {
            case "swamp" -> 1d;
            case "wet" -> 0.9;
            case "moist" -> 0.8;
            case "half-moist" -> 0.6;
            case "dry" -> 0.2;
            default -> 0d;
        };
    }

    public static Double getB(String land) {
        return switch (land) {
            case "lowlands" -> 1d;
            case "highlands" -> 0.8;
            case "mountains" -> 0.7;
            default -> 0d;
        };
    }

    public static Double getC(String location) {
        return switch (location) {
            case "woj. suwalskie", "Pasmo wysokich Tatr i Sudetów " -> 0.6;
            case "woj. warmińsko - mazurskie", "woj. podlaskie", "Mazowsze wschodnie",
                    "woj. lubelskie", "woj. podkarpackie" -> 0.7;
            case "woj. małopolskie", "woj. łódzkie", "Mazowsze zachodnie i południowe",
                    "woj. kujawsko - pomorskie", "woj. opolskie", "woj. świętkorzyskie",
                    "woj. śląskie" -> 0.8;
            case "woj.pomorskie", "woj. zachodniopomorskie", "woj. wielkopolskie",
                    "woj. lubuskie", "woj .dolnośląskie" -> 0.9;
            case "Kotlina Kłodzka", "Szczecin i okolice", "Poznań i okolice" -> 1d;
            default -> 0d;
        };
    }
}
