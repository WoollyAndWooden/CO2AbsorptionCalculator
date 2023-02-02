package com.co2absorptioncalculator.co2absorptioncalculator;

import com.co2absorptioncalculator.co2absorptioncalculator.calculator.FactorCalculator;
import com.co2absorptioncalculator.co2absorptioncalculator.calculator.exception.IncorrectDataException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

public class FactorCalculatorTest {

    private static Stream<Arguments> incorrectValues() {
        return Stream.of(
                Arguments.of(""),
                Arguments.of("45wewer234324qeqwe12eqe")
        );
    }

    private static Stream<Arguments> habitatValues() {
        return Stream.of(
                Arguments.of(
                        "Alder", 524d
                ),
                Arguments.of(
                        "Swamp-birch", 615d
                ),
                Arguments.of(
                        "Swamp-oak", 329d
                ),
                Arguments.of(
                        "Ash-alder", 471d
                ),
                Arguments.of(
                        "Mesic lime-oak-hornbeam", 366d
                ),
                Arguments.of(
                        "Moist lime-oak-hornbeam", 403d
                ),
                Arguments.of(
                        "Oak-pine", 299d
                ),
                Arguments.of(
                        "Oak-spruce", 426d
                ),
                Arguments.of(
                        "Thermophilous oak", 340d
                ),
                Arguments.of(
                        "Mesic pine", 279d
                ),
                Arguments.of(
                        "Moist pine", 319d
                ),
                Arguments.of(
                        "Swamp pine", 379d
                ),
                Arguments.of(
                        "Boreal spruce", 396d
                )
        );
    }

    private static Stream<Arguments> ageValues() {
        return Stream.of(
                Arguments.of(
                        "30-50", 1.2
                ),
                Arguments.of(
                        "51-70", 1.4
                ),
                Arguments.of(
                        "71-90", 1.4
                ),
                Arguments.of(
                        "91-110", 1.3
                ),
                Arguments.of(
                        "111-130", 1.5
                )
        );
    }

    private static Stream<Arguments> soilValues() {
        return Stream.of(
                Arguments.of(
                        "swamp", 1d
                ),
                Arguments.of(
                        "wet", 0.9
                ),
                Arguments.of(
                        "moist", 0.8
                ),
                Arguments.of(
                        "half-moist", 0.6
                ),
                Arguments.of(
                        "dry", 0.2
                )
        );
    }

    private static Stream<Arguments> landValues() {
        return Stream.of(
                Arguments.of(
                        "lowlands", 1d
                ),
                Arguments.of(
                        "highlands", 0.8
                ),
                Arguments.of(
                        "mountains", 0.7
                )
        );
    }

    private static Stream<Arguments> locationValues() {
        return Stream.of(
                Arguments.of(
                        "woj. suwalskie", 0.6
                ),
                Arguments.of(
                        "Pasmo wysokich Tatr i Sudetów", 0.6
                ),
                Arguments.of(
                        "woj. warmińsko - mazurskie", 0.7
                ),
                 Arguments.of(
                        "woj. podlaskie", 0.7
                ),
                 Arguments.of(
                        "Mazowsze wschodnie", 0.7
                ),
                 Arguments.of(
                        "woj. małopolskie", 0.8
                ),
                 Arguments.of(
                        "woj. łódzkie", 0.8
                ),
                 Arguments.of(
                        "Mazowsze zachodnie i południowe", 0.8
                ),
                 Arguments.of(
                        "woj. kujawsko - pomorskie", 0.8
                ),
                 Arguments.of(
                        "woj. opolskie", 0.8
                ),
                 Arguments.of(
                        "woj. świętkorzyskie", 0.8
                ),
                 Arguments.of(
                        "woj. śląskie", 0.8
                ),
                 Arguments.of(
                        "woj.pomorskie", 0.9
                ),
                 Arguments.of(
                        "woj. zachodniopomorskie", 0.9
                ),
                 Arguments.of(
                        "woj. wielkopolskie", 0.9
                ),
                 Arguments.of(
                        "woj. lubuskie", 0.9
                ),
                 Arguments.of(
                        "woj .dolnośląskie", 0.9
                ),
                 Arguments.of(
                        "Kotlina Kłodzka", 1d
                ),
                 Arguments.of(
                        "Szczecin i okolice", 1d
                ),
                 Arguments.of(
                        "Poznań i okolice", 1d
                )
        );
    }

    private static Stream<Arguments> typeOfGroundValues() {
        return Stream.of(
                Arguments.of(
                        "after felling", 1d
                ),
                Arguments.of(
                        "post-agricultural", 0.2
                ),
                Arguments.of(
                        "meadow", 0.8
                )
        );
    }

    private static Stream<Arguments> dominantSpeciesValue() {
        return Stream.of(
                Arguments.of(
                        "dąb szypułkowy i bezszypułkowy (Quercus robus Q. petraea)", 1.5
                ),
                Arguments.of(
                        "grab pospolity (Carpinus betulus)", 1.7
                ),
                Arguments.of(
                        "buk pospolity (Fagus sylvatica)", 1.6
                ),
                Arguments.of(
                        "lipa drobnolistna (Tilia cordata)", 2d
                ),
                Arguments.of(
                        "klon pospolity (Acer platanoides)", 2d
                ),
                Arguments.of(
                        "jesion wyniosły (Fraxinus excelsior)", 1.8
                ),
                Arguments.of(
                        "gatunki uzupełniające i krzewy", 1.8
                ),
                Arguments.of(
                        "klon jawor (Acer pseudoplatanus)", 1.9
                ),
                Arguments.of(
                        "klon polny (Acer campestre)", 1.9
                )
        );
    }

    private static Stream<Arguments> numberOfTreesValues() {
        return Stream.of(
                Arguments.of(
                        "800 - 1200", 0.8
                ),
                Arguments.of(
                        "1200 - 1800", 1d
                )
        );
    }

    @ParameterizedTest
    @MethodSource("habitatValues")
    public void testHabitatValue(String habitat, Double expectedValue) throws IncorrectDataException {
        Assertions.assertEquals(expectedValue, FactorCalculator.getHabitatValue(habitat));
    }

    @ParameterizedTest
    @MethodSource("incorrectValues")
    public void testHabitatValue(Object arg) throws IncorrectDataException {
        Assertions.assertThrows(IncorrectDataException.class, () -> {
            FactorCalculator.getHabitatValue((String) arg);
        });
    }

    @Test
    public void testNullHabitatValue() {
        Assertions.assertThrows(NullPointerException.class, () -> {
            FactorCalculator.getHabitatValue(null);
        });
    }

    @ParameterizedTest
    @MethodSource("ageValues")
    public void testAgeValues(String age, Double expectedValue) throws IncorrectDataException {
        Assertions.assertEquals(expectedValue, FactorCalculator.getAgeValue(age));
    }

    @ParameterizedTest
    @MethodSource("incorrectValues")
    public void testIncorrectAgeValues(String arg) throws IncorrectDataException {
        Assertions.assertThrows(IncorrectDataException.class, () -> {
            FactorCalculator.getHabitatValue(arg);
        });
    }

    @Test
    public void testNullAgeValue() {
        Assertions.assertThrows(NullPointerException.class, () -> {
            FactorCalculator.getHabitatValue(null);
        });
    }

    @ParameterizedTest
    @MethodSource("soilValues")
    public void testSoilValues(String soil, Double expectedValue) throws IncorrectDataException {
        Assertions.assertEquals(expectedValue, FactorCalculator.getSoilValue(soil));
    }

    @ParameterizedTest
    @MethodSource("incorrectValues")
    public void testIncorrectSoilValues(String arg) throws IncorrectDataException {
        Assertions.assertThrows(IncorrectDataException.class, () -> {
            FactorCalculator.getHabitatValue(arg);
        });
    }

    @Test
    public void testNullSoilValue() {
        Assertions.assertThrows(NullPointerException.class, () -> {
            FactorCalculator.getHabitatValue(null);
        });
    }

    @ParameterizedTest
    @MethodSource("landValues")
    public void testLandValues(String land, Double expectedValue) throws IncorrectDataException {
        Assertions.assertEquals(expectedValue, FactorCalculator.getLandValue(land));
    }

    @ParameterizedTest
    @MethodSource("incorrectValues")
    public void testIncorrectLandValue(String arg) throws IncorrectDataException {
        Assertions.assertThrows(IncorrectDataException.class, () -> {
            FactorCalculator.getHabitatValue(arg);
        });
    }

    @Test
    public void testNullLandValue() {
        Assertions.assertThrows(NullPointerException.class, () -> {
            FactorCalculator.getHabitatValue(null);
        });
    }

    @ParameterizedTest
    @MethodSource("locationValues")
    public void testLocationValues(String location, Double expectedValue) throws IncorrectDataException {
        Assertions.assertEquals(expectedValue, FactorCalculator.getLocationValue(location));
    }

    @ParameterizedTest
    @MethodSource("incorrectValues")
    public void testIncorrectLocationValues(String arg) throws IncorrectDataException {
        Assertions.assertThrows(IncorrectDataException.class, () -> {
            FactorCalculator.getHabitatValue(arg);
        });
    }

    @Test
    public void testNullLocationValue() {
        Assertions.assertThrows(NullPointerException.class, () -> {
            FactorCalculator.getHabitatValue(null);
        });
    }

    @ParameterizedTest
    @MethodSource("typeOfGroundValues")
    public void testTypeOfGround(String typeOfGround, Double expectedValue) throws IncorrectDataException {
        Assertions.assertEquals(expectedValue, FactorCalculator.getTypeOfGroundValue(typeOfGround));
    }

    @ParameterizedTest
    @MethodSource("incorrectValues")
    public void testIncorrectTypeOfGroundValue(String arg) throws IncorrectDataException {
        Assertions.assertThrows(IncorrectDataException.class, () -> {
            FactorCalculator.getHabitatValue(arg);
        });
    }

    @Test
    public void testNullTypeOfGroundValue() {
        Assertions.assertThrows(NullPointerException.class, () -> {
            FactorCalculator.getHabitatValue(null);
        });
    }


    @ParameterizedTest
    @MethodSource("typeOfGroundValues")
    public void testDominantSpeciesValues(String dominantSpecies, Double expectedValue) throws IncorrectDataException {
        Assertions.assertEquals(expectedValue, FactorCalculator.getTypeOfGroundValue(dominantSpecies));
    }

    @ParameterizedTest
    @MethodSource("incorrectValues")
    public void testIncorrectDominantSpecies(String arg) throws IncorrectDataException {
        Assertions.assertThrows(IncorrectDataException.class, () -> {
            FactorCalculator.getHabitatValue(arg);
        });
    }

    @Test
    public void testNullDominantSpecies() {
        Assertions.assertThrows(NullPointerException.class, () -> {
            FactorCalculator.getHabitatValue(null);
        });
    }

    @ParameterizedTest
    @MethodSource("typeOfGroundValues")
    public void testNumberOfTrees(String numberOfTrees, Double expectedValue) throws IncorrectDataException {
        Assertions.assertEquals(expectedValue, FactorCalculator.getTypeOfGroundValue(numberOfTrees));
    }

    @ParameterizedTest
    @MethodSource("incorrectValues")
    public void testIncorrectNumberOfTrees(String arg) throws IncorrectDataException {
        Assertions.assertThrows(IncorrectDataException.class, () -> {
            FactorCalculator.getHabitatValue(arg);
        });
    }

    @Test
    public void testNullNumberOfTrees() {
        Assertions.assertThrows(NullPointerException.class, () -> {
            FactorCalculator.getHabitatValue(null);
        });
    }
}
