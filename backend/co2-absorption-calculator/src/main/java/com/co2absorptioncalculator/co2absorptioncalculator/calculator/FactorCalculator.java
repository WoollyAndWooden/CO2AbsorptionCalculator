package com.co2absorptioncalculator.co2absorptioncalculator.calculator;

import com.co2absorptioncalculator.co2absorptioncalculator.calculator.exception.IncorrectDataException;

public class FactorCalculator {

    public static Double getHabitatValue(String habitat) throws IncorrectDataException {
        return switch (habitat) {
            case "Alder" -> 524d;
            case "Swamp-birch" -> 615d;
            case "Swamp-oak" -> 329d;
            case "Ash-alder" -> 471d;
            case "Mesic lime-oak-hornbeam" -> 366d;
            case "Moist lime-oak-hornbeam" -> 403d;
            case "Oak-pine" -> 299d;
            case "Oak-spruce" -> 426d;
            case "Thermophilous oak" -> 340d;
            case "Mesic pine" -> 279d;
            case "Moist pine" -> 319d;
            case "Swamp pine" -> 379d;
            case "Boreal spruce" -> 396d;
            default -> throw new IncorrectDataException("Invalid data " + habitat    );
        };
    }

    public static Double getAgeValue(String age) throws IncorrectDataException {
        return switch (age) {
            case "30-50" -> 1.2;
            case "51-70", "71-90" -> 1.4;
            case "91-110" -> 1.3;
            case "111-130" -> 1.5;
            default -> throw new IncorrectDataException("Invalid data" + age);
        };
    }

    public static Double getSoilValue(String soil) throws IncorrectDataException {
        return switch (soil) {
            case "swamp" -> 1d;
            case "wet" -> 0.9;
            case "moist" -> 0.8;
            case "half-moist" -> 0.6;
            case "dry" -> 0.2;
            default -> throw new IncorrectDataException("Invalid data" + soil);
        };
    }

    public static Double getLandValue(String land) throws IncorrectDataException {
        return switch (land) {
            case "lowlands" -> 1d;
            case "highlands" -> 0.8;
            case "mountains" -> 0.7;
            default -> throw new IncorrectDataException("Invalid data" + land);
        };
    }

    public static Double getLocationValue(String location) throws IncorrectDataException {
        return switch (location) {
            case "woj. suwalskie", "Pasmo wysokich Tatr i Sudetów" -> 0.6;
            case "woj. warmińsko - mazurskie", "woj. podlaskie", "Mazowsze wschodnie",
                    "woj. lubelskie", "woj. podkarpackie" -> 0.7;
            case "woj. małopolskie", "woj. łódzkie", "Mazowsze zachodnie i południowe",
                    "woj. kujawsko - pomorskie", "woj. opolskie", "woj. świętkorzyskie",
                    "woj. śląskie" -> 0.8;
            case "woj.pomorskie", "woj. zachodniopomorskie", "woj. wielkopolskie",
                    "woj. lubuskie", "woj .dolnośląskie" -> 0.9;
            case "Kotlina Kłodzka", "Szczecin i okolice", "Poznań i okolice" -> 1d;
            default -> throw new IncorrectDataException("Invalid data" + location);
        };
    }

    public static Double getTypeOfGroundValue(String typeOfGround) throws IncorrectDataException {
        return switch (typeOfGround) {
            case "after felling" -> 1d;
            case "post-agricultural" -> 0.2;
            case "meadow" -> 0.8;
            default -> throw new IncorrectDataException("Invalid data" + typeOfGround);
        };
    }

    public static Double getDominantSpeciesValue(String dominantSpecies) throws IncorrectDataException {
        return switch (dominantSpecies) {
            case "dąb szypułkowy i bezszypułkowy (Quercus robus Q. petraea)" -> 1.5;
            case "grab pospolity (Carpinus betulus)" -> 1.7;
            case "buk pospolity (Fagus sylvatica)" -> 1.6;
            case "lipa drobnolistna (Tilia cordata)", "klon pospolity (Acer platanoides)" -> 2d;
            case "jesion wyniosły (Fraxinus excelsior)", "gatunki uzupełniające i krzewy" -> 1.8;
            case "klon jawor (Acer pseudoplatanus)", "klon polny (Acer campestre)" -> 1.9;
            default -> throw new IncorrectDataException("Invalid data" + dominantSpecies);
        };
    }

    public static Double getNumberOfTreesValue(String numberOfTrees) throws IncorrectDataException {
        return switch (numberOfTrees) {
            case "800 - 1200" -> 0.8;
            case "1200 - 1800" -> 1d;
            default -> throw new IncorrectDataException("Invalid data" + numberOfTrees);
        };
    }
}
