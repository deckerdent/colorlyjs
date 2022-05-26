/**
 * Unit Tests for the Generics Util
 *
 * @author  deckerdent
 * @since   20221604
 */
import GenericsUtil from "../src/util/GenericsUtil.js";

describe("GenericsUtil test suite", () => {

    //hex string test parameters
    const hexStringTestParameters = [
        "#123456",
        "12345678",
        "#123",
        "abcdef",
        "#aBcDEfaB",
        "ABC",
        "tinahv",
        "tInaHVti",
        "#tIn",
        "#ababAGab",
        "AAABBBCCC",
        "#aaaBBBccc",
        "aa bb cc",
        "11 22 3 4",
        " #abc",
        "#abc12345 ",
    ];

//hex int test parameters
    const hexIntTestParameters = [
        1193046, //123456
        305419896, //12345678
        291, //123
        11259375, //abcdef
        2882400171, //aBcDEfaB
        2748, //ABC
        46115048124, //incorrect value, is 9 digit hex string
        703659, //incorrect value, is 5 digit hex string
        170, //incorrect value, is 2 digit hex string
    ];

//consolidated hex int and string test params for functions taking both
    const hexMixedTestParameters = [
        ...hexStringTestParameters,
        ...hexIntTestParameters,
    ];

    /**
     * test getHexTransparency(param)
     */
    const testGetHexTransparency = [
        "FF",
        "78",
        "FF",
        "FF",
        "AB",
        "FF",
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        "FF",
        "78",
        "FF",
        "FF",
        "AB",
        "FF",
        undefined,
        undefined,
        undefined,
    ].map((e, i) => [hexMixedTestParameters[i], e]);

    test.each(testGetHexTransparency)(
        "getHexTransparency(%i), expect %i",
        (a, expected) => {
            expect(GenericsUtil.getHexTransparency(a)).toBe(expected);
        }
    );

    /**
     * test convertToHarmonizedHexValue(param)
     *
     * assert passing for #8D8D8D, #888, 8d8d8d, 2374864383
     */

    const testConvertToHarmonizedHexValue = [
        "123456",
        "12345678",
        "123",
        "ABCDEF",
        "ABCDEFAB",
        "ABC",
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        "123456",
        "12345678",
        "123",
        "ABCDEF",
        "ABCDEFAB",
        "ABC",
        undefined,
        undefined,
        undefined,
    ].map((e, i) => [hexMixedTestParameters[i], e]);

    test.each(testConvertToHarmonizedHexValue)(
        ".convertToHarmonizedHexValue(%i), expect %i",
        (a, expected) => {
            expect(GenericsUtil.convertToHarmonizedHexValue(a)).toBe(expected);
        }
    );

    /**
     * convertHexIntValueToString
     */

    const testConvertHexIntValueToString = [
        "123456",
        "12345678",
        "123",
        "ABCDEF",
        "ABCDEFAB",
        "ABC",
        undefined,
        undefined,
        undefined,
    ].map((e, i) => [hexIntTestParameters[i], e]);

    test.each(testConvertHexIntValueToString)(
        ".convertHexIntValueToString(%i), expect %i",
        (a, expected) => {
            expect(GenericsUtil.convertHexIntValueToString(a)).toBe(expected);
        }
    );

    /**
     * convertHexStringToIntValue
     */

    const testConvertHexStringToIntValue = [
        1193046,
        305419896,
        291,
        11259375,
        2882400171,
        2748,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
    ].map((e, i) => [hexStringTestParameters[i], e]);

    test.each(testConvertHexStringToIntValue)(
        ".convertHexStringToIntValue(%i), expect %i",
        (a, expected) => {
            expect(GenericsUtil.convertHexStringToIntValue(a)).toBe(expected);
        }
    );

    /**
     * isHexValue
     */

    const testIsHexValue = [
        true,
        true,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        true,
        true,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
    ].map((e, i) => [hexMixedTestParameters[i], e]);

    test.each(testIsHexValue)(".isHexValue(%i), expect %i", (a, expected) => {
        expect(GenericsUtil.isHexValue(a)).toBe(expected);
    });

    /**
     * isThreeDigitHexValue
     */

    const testIsThreeDigitHexValue = [
        false,
        false,
        true,
        false,
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        true,
        false,
        false,
        true,
        false,
        false,
        false,
    ].map((e, i) => [hexMixedTestParameters[i], e]);

    test.each(testIsThreeDigitHexValue)(
        ".isThreeDigitHexValue(%i), expect %i",
        (a, expected) => {
            expect(GenericsUtil.isThreeDigitHexValue(a)).toBe(expected);
        }
    );

    /**
     * isSixDigitHexValue
     */

    const testIsSixDigitHexValue = [
        true,
        false,
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        true,
        false,
        false,
        true,
        false,
        false,
        false,
        false,
        false,
    ].map((e, i) => [hexMixedTestParameters[i], e]);

    test.each(testIsSixDigitHexValue)(
        ".isSixDigitHexValue(%i), expect %i",
        (a, expected) => {
            expect(GenericsUtil.isSixDigitHexValue(a)).toBe(expected);
        }
    );

    /**
     * isEightDigitHexValue
     */

    const testisEigthDigitHexValue = [
        false,
        true,
        false,
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        true,
        false,
        false,
        true,
        false,
        false,
        false,
        false,
    ].map((e, i) => [hexMixedTestParameters[i], e]);

    test.each(testisEigthDigitHexValue)(
        ".isEigthDigitHexValue(%i), expect %i",
        (a, expected) => {
            expect(GenericsUtil.isEigthDigitHexValue(a)).toBe(expected);
        }
    );

    /**
     * __convertHexToArray
     */
    const testConvertHexToArray = [
        ["12", "34", "56"],
        ["12", "34", "56", "78"],
        ["11", "22", "33"],
        ["AB", "CD", "EF"],
        ["AB", "CD", "EF", "AB"],
        ["AA", "BB", "CC"],
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        ["12", "34", "56"],
        ["12", "34", "56", "78"],
        ["11", "22", "33"],
        ["AB", "CD", "EF"],
        ["AB", "CD", "EF", "AB"],
        ["AA", "BB", "CC"],
        undefined,
        undefined,
        undefined,
    ].map((e, i) => [hexMixedTestParameters[i], e]);

    test.each(testConvertHexToArray)(
        ".__convertHexToArray(%i), expect %o",
        (a, expected) => {
            expect(GenericsUtil.__convertHexToArray(a)).toStrictEqual(expected);
        }
    );

    /**
     * RGB(A)
     */

    const rgbTestParams = [
        [255, 127, 0],
        [0, 255, 127],
        [127, 0, 255],
        [0, 0, 0],
        [255, 255, 255],
        [127, 127, 127],
        [1, 1, 1],
        [42, 42, 42],
        [299, 150, 0],
        [0, 299, 150],
        [0, 150, 299],
        [299, 299, 299],
        [-1, 25, 50],
        [50, -1, 25],
        [50, 25, -1],
        [-1, -1, -1],
        [125, 57, 57],
    ];

    const rgbaTestParams = [
        1, 0.9, 0, 0.789, 0.42, 0.0000001, 2, -1, 0.91, 0.82, 0, 1, -0.3, 1.3, 0.25,
        0.987654321, 5,
    ].map((e, i) => [...rgbTestParams[i], e]);

    /*const normalizedTestParams = [
      [1, 0.4980392156862745, 0],
      [0, 1, 0.4980392156862745],
      [0.4980392156862745, 0, 1],
      [0, 0, 0],
      [1, 1, 1],
      [0.4980392156862745, 0.4980392156862745, 0.4980392156862745],
      [0.00392156862745098, 0.00392156862745098, 0.00392156862745098],
      [0.16470588235294117, 0.16470588235294117, 0.16470588235294117],
      [0.49019607843137253, 0.2235294117647059, 0.2235294117647059],
    ];*/

    const testGetValueFromRGBA = [
        1,
        1,
        1,
        0,
        1,
        0.4980392156862745,
        0.00392156862745098,
        0.16470588235294117,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        0.49019607843137253,
    ].map((e, i) => [...rgbTestParams[i], e]);

    test.each(testGetValueFromRGBA)(
        ".getValueFromRGBA(%i, %i, %i), expect %i",
        (r, g, b, expected) => {
            expect(GenericsUtil.getValueFromRGBA(r, g, b)).toBe(expected);
        }
    );

    const testGetSaturationFromRGBA = [
        1,
        1,
        1,
        0,
        1,
        0,
        0,
        0,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        0.3736263736263735,
    ].map((e, i) => [...rgbTestParams[i], e]);

    test.each(testGetSaturationFromRGBA)(
        ".getSaturationFromRGBA(%i, %i, %i), expect %f",
        (r, g, b, expected) => {
            expect(GenericsUtil.getSaturationFromRGBA(r, g, b)).toBe(expected);
        }
    );

    const testGetHueFromRGBA = [
        29.88235294117647,
        149.88235294117646,
        269.88235294117646,
        0,
        0,
        0,
        0,
        0,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        0,
    ].map((e, i) => [...rgbTestParams[i], e]);

    test.each(testGetHueFromRGBA)(
        ".getHueFromRGBA(%i, %i, %i), expect %i",
        (r, g, b, expected) => {
            expect(GenericsUtil.getHueFromRGBA(r, g, b)).toBe(expected);
        }
    );

    const testGetLuminosityFromRGBA = [
        0.5,
        0.5,
        0.5,
        0,
        1,
        0.4980392156862745,
        0.00392156862745098,
        0.16470588235294117,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        0.3568627450980392,
    ].map((e, i) => [...rgbTestParams[i], e]);

    test.each(testGetLuminosityFromRGBA)(
        ".getLuminosityFromRGBA(%i, %i, %i), expect %i",
        (r, g, b, expected) => {
            expect(GenericsUtil.getLuminosityFromRGBA(r, g, b)).toBe(expected);
        }
    );

    const testNormalizeRGBArray = [
        [1, 0.4980392156862745, 0],
        [0, 1, 0.4980392156862745],
        [0.4980392156862745, 0, 1],
        [0, 0, 0],
        [1, 1, 1],
        [0.4980392156862745, 0.4980392156862745, 0.4980392156862745],
        [0.00392156862745098, 0.00392156862745098, 0.00392156862745098],
        [0.16470588235294117, 0.16470588235294117, 0.16470588235294117],
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        [0.49019607843137253, 0.2235294117647059, 0.2235294117647059],
    ].map((e, i) => [...rgbTestParams[i], e]);

    test.each(testNormalizeRGBArray)(
        ".normalizeRGBArray([%i, %i, %i]), expect %o",
        (r, g, b, expected) => {
            expect(GenericsUtil.normalizeRGBArray([r, g, b])).toStrictEqual(expected);
        }
    );

    const testNormalizeRGBAArray = [
        [1, 0.4980392156862745, 0],
        [0, 1, 0.4980392156862745],
        [0.4980392156862745, 0, 1],
        [0, 0, 0],
        [1, 1, 1],
        [0.4980392156862745, 0.4980392156862745, 0.4980392156862745],
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
    ].map((e, i) => [
        ...rgbaTestParams[i],
        e === undefined ? undefined : [...e, rgbaTestParams[i][3]],
    ]);

    test.each(testNormalizeRGBAArray)(
        ".normalizeRGBAArray([%i, %i, %i, %f]), expect %o",
        (r, g, b, a, expected) => {
            expect(GenericsUtil.normalizeRGBAArray([r, g, b, a])).toStrictEqual(
                expected
            );
        }
    );

//const testGetValueFromNormalizedRGBValue = [];
//const testIsRGBValue = [];
//const testIsNormalizedRGBValue = [];
//const testIsRGBAlphaValue = [];
    const testIsRGBArray = [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        true,
    ].map((e, i) => [...rgbTestParams[i], e]);

    test.each(testIsRGBArray)(
        ".isRGBArray(%i, %i, %i), expect %i",
        (r, g, b, expected) => {
            expect(GenericsUtil.isRGBArray([r, g, b])).toBe(expected);
        }
    );

    const testIsRGBAArray = [
        true,
        true,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ].map((e, i) => [...rgbaTestParams[i], e]);

    test.each(testIsRGBAArray)(
        ".isRGBAArray(%i, %i, %i, %i), expect %i",
        (r, g, b, a, expected) => {
            expect(GenericsUtil.isRGBAArray([r, g, b, a])).toBe(expected);
        }
    );

    /**
     * cmyk
     */

    const cmykTestParams = [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0.2, 0.4, 0.6, 0.8],
        [0.4, 0.3, 0.2, 0.1],
        [2, 1, 1, 0.5],
        [1, 1, 0.5, 2],
    ];

    const testIsCMYKArray = [true, true, true, true, false, false].map((e, i) => [
        ...cmykTestParams[i],
        e,
    ]);

    test.each(testIsCMYKArray)(
        ".isCMYKArray(%f, %f, %f, %f), expect %i",
        (c, m, y, k, expected) => {
            expect(GenericsUtil.isCMYKArray([c, m, y, k])).toBe(expected);
        }
    );

    /**
     * HSL
     */

    const hslTestParams = [
        [0, 0, 0],
        [360, 1, 1],
        [59, 0.5, 0.2],
        [61, 0.4, 0.6],
        [279, 0.1, 0.00001],
        [-3, 0.1, 0.1],
        [400, 1, 1],
        [359, -1, 1],
        [346, 1, -1],
        [200, 2, 1],
        [123, 1, 2],
    ];

    const testIsHSLArray = [
        true,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
    ].map((e, i) => [...hslTestParams[i], e]);

    test.each(testIsHSLArray)(
        ".isHSLArray(%f, %f, %f), expect %i",
        (h, s, l, expected) => {
            expect(GenericsUtil.isHSLArray([h, s, l])).toBe(expected);
        }
    );

    /**
     * HSV
     */

    const hsvTestParams = [
        [0, 0, 0],
        [360, 1, 1],
        [59, 0.5, 0.2],
        [61, 0.4, 0.6],
        [279, 0.1, 0.00001],
        [-3, 0.1, 0.1],
        [400, 1, 1],
        [359, -1, 1],
        [346, 1, -1],
        [200, 2, 1],
        [123, 1, 2],
    ];

    const testIsHSVArray = [
        true,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
    ].map((e, i) => [...hsvTestParams[i], e]);

    test.each(testIsHSVArray)(
        ".isHSVArray(%f, %f, %f), expect %i",
        (h, s, v, expected) => {
            expect(GenericsUtil.isHSVArray([h, s, v])).toBe(expected);
        }
    );

})

