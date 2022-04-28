/**
 * Unit Tests for the CSS Util
 *
 * @author  deckerdent
 * @since   20221604
 */

import CSSUtil from "../src/util/CSSUtil";

const hexTestParams = [
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

const cymkTestParams = [
  [0, 0, 0, 0],
  [1, 1, 1, 1],
  [0.2, 0.4, 0.6, 0.8],
  [0.4, 0.3, 0.2, 0.1],
  [2, 1, 1, 0.5],
  [1, 1, 0.5, 2],
];

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

/**
 * hex
 */
const testHexFunctions = [
  "#123456",
  "#12345678",
  "#123",
  "#ABCDEF",
  "#ABCDEFAB",
  "#ABC",
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  "#AABBCC",
  "#112234",
  "#ABC",
  "#ABC12345",
  "#123456",
  "#12345678",
  "#123",
  "#ABCDEF",
  "#ABCDEFAB",
  "#ABC",
  undefined,
  undefined,
  undefined,
].map((e, i) => [hexTestParams[i], e]);
describe(".toHexCSSString(), .fromHexCSSString()", () => {
  test.each(testHexFunctions)(
    ".toHexCSSString(%s), expected %s",
    (a, expected) => {
      expect(CSSUtil.toHexCSSString(a)).toBe(expected);
    }
  );

  test.each(testHexFunctions)(
    ".fromHexCSSString(%s), expected %s",
    (a, expected) => {
      let cssHex = CSSUtil.toHexCSSString(a);
      expected = expected ? expected.replace("#", "") : expected;
      expect(CSSUtil.cssStringToHarmonizedHexString(cssHex)).toBe(expected);
    }
  );
});

/**
 * rgb(a)
 */
const testRGBFunctions = [
  "rgb(255, 127, 0)",
  "rgb(0, 255, 127)",
  "rgb(127, 0, 255)",
  "rgb(0, 0, 0)",
  "rgb(255, 255, 255)",
  "rgb(127, 127, 127)",
  "rgb(1, 1, 1)",
  "rgb(42, 42, 42)",
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  "rgb(125, 57, 57)",
].map((e, i) => [...rgbTestParams[i], e]);

const testRGBAFunctions = [
  "rgba(255, 127, 0, 1)",
  "rgba(0, 255, 127, 0.9)",
  "rgba(127, 0, 255, 0)",
  "rgba(0, 0, 0, 0.789)",
  "rgba(255, 255, 255, 0.42)",
  "rgba(127, 127, 127, 0.0000001)",
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
].map((e, i) => [...rgbaTestParams[i], e]);

describe(".toRGBCSSString(), .toRGBACSSString(), .cssStringToRGBArray(), .cssStringToRGBAArray()", () => {
  test.each(testRGBFunctions)(
    ".toRGBCSSString(%f, %f, %f), expect %s",
    (a, b, c, expected) => {
      expect(CSSUtil.toRGBCSSString(a, b, c)).toBe(expected);
    }
  );

  test.each(testRGBFunctions)(
    ".cssStringToRGBArray(%s), expect [%f, %f, %f]",
    (a, b, c, expected) => {
      let cssRGB = CSSUtil.toRGBCSSString(a, b, c);
      expected = expected ? [a, b, c] : expected;
      expect(CSSUtil.cssStringToRGBArray(cssRGB)).toStrictEqual(expected);
    }
  );

  test.each(testRGBAFunctions)(
    ".toRGBACSSString(%f, %f, %f, %f), expect %s",
    (a, b, c, d, expected) => {
      expect(CSSUtil.toRGBACSSString(a, b, c, d)).toBe(expected);
    }
  );

  test.each(testRGBAFunctions)(
    ".cssStringToRGBAArray(%s), expect [%f, %f, %f, %f]",
    (a, b, c, d, expected) => {
      let cssRGB = CSSUtil.toRGBACSSString(a, b, c, d);
      expected = expected ? [a, b, c, d] : expected;
      expect(CSSUtil.cssStringToRGBAArray(cssRGB)).toStrictEqual(expected);
    }
  );
});

/**
 * cymk
 * [0, 0, 0, 0],
  [1, 1, 1, 1],
  [0.2, 0.4, 0.6, 0.8],
  [0.4, 0.3, 0.2, 0.1],
  [2, 1, 1, 0.5],
  [1, 1, 0.5, 2],
 */

const testCYMKFunctions = [
  "cmyk(0%, 0%, 0%, 0%)",
  "cmyk(100%, 100%, 100%, 100%)",
  "cmyk(20%, 40%, 60%, 80%)",
  "cmyk(40%, 30%, 20%, 10%)",
  undefined,
  undefined,
].map((e, i) => [...cymkTestParams[i], e]);

describe(".toCYMKCSSString(), .cssStringToCYMKArray()", () => {
  test.each(testCYMKFunctions)(
    ".toCYMKCSSString(%f, %f, %f, %f), expected %s",
    (a, b, c, d, expected) => {
      expect(CSSUtil.toCYMKCSSString(a, b, c, d)).toBe(expected);
    }
  );

  test.each(testCYMKFunctions)(
    ".toCYMKCSSString(%f, %f, %f, %f), expected %s",
    (a, b, c, d, expected) => {
      let cymkCss = CSSUtil.toCYMKCSSString(a, b, c, d);
      expected = expected ? [a, b, c, d] : expected;
      expect(CSSUtil.cssStringToCYMKArray(cymkCss)).toStrictEqual(expected);
    }
  );
});

/**
 * hsl
 * [0, 0, 0],
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
 */

const testHSLFunctions = [
  "hsl(0, 0%, 0%)",
  "hsl(360, 100%, 100%)",
  "hsl(59, 50%, 20%)",
  "hsl(61, 40%, 60%)",
  "hsl(279, 10%, 0.001%)",
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
].map((e, i) => [...hslTestParams[i], e]);

describe(".toHSLCSSString(), .cssStringToHSLArray()", () => {
  test.each(testHSLFunctions)(
    ".toHSLCSSString(%f, %f, %f), expected %s",
    (a, b, c, expected) => {
      expect(CSSUtil.toHSLCSSString(a, b, c)).toBe(expected);
    }
  );

  test.each(testHSLFunctions)(
    ".toHSLCSSString(%f, %f, %f), expected %s",
    (a, b, c, expected) => {
      let hslCss = CSSUtil.toHSLCSSString(a, b, c);
      expected = expected ? [a, b, c] : expected;
      expect(CSSUtil.cssStringToHSLArray(hslCss)).toStrictEqual(expected);
    }
  );
});

/**
 * hsv
 */
const testHSVFunctions = [
  "hsv(0, 0%, 0%)",
  "hsv(360, 100%, 100%)",
  "hsv(59, 50%, 20%)",
  "hsv(61, 40%, 60%)",
  "hsv(279, 10%, 0.001%)",
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
].map((e, i) => [...hsvTestParams[i], e]);

describe(".toHSVCSSString(), .cssStringToHSVArray()", () => {
  test.each(testHSVFunctions)(
    ".toHSVCSSString(%f, %f, %f), expected %s",
    (a, b, c, expected) => {
      expect(CSSUtil.toHSVCSSString(a, b, c)).toBe(expected);
    }
  );

  test.each(testHSVFunctions)(
    ".toHSVCSSString(%f, %f, %f), expected %s",
    (a, b, c, expected) => {
      let hsvCss = CSSUtil.toHSVCSSString(a, b, c);
      expected = expected ? [a, b, c] : expected;
      expect(CSSUtil.cssStringToHSVArray(hsvCss)).toStrictEqual(expected);
    }
  );
});
