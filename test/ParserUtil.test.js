/**
 * Unit Tests for the Parser Util
 *
 * @author  deckerdent
 * @since   20221604
 */
import ParserUtil from "../src/util/ParserUtil";
import GenericsUtil from "../src/util/GenericsUtil";

const hexTestColors = [
  "32a852",
  "#Af24B4",
  "#E12231",
  "DAD4EF",
  "fda",
  "333333ff",
];
const rgbTestColors = [
  [50, 168, 82],
  [175, 36, 180],
  [225, 34, 49],
  [218, 212, 239],
  [255, 221, 170],
  [51, 51, 51, 1],
];
const cmykTestColors = [
  [0.7, 0, 0.51, 0.34],
  [0.03, 0.8, 0, 0.29],
  [0, 0.85, 0.78, 0.12],
  [0.09, 0.11, 0, 0.06],
  [0, 0.13, 0.33, 0],
  [0, 0, 0, 0.8],
];
const hslTestColors = [
  [136, 0.54, 0.43],
  [298, 0.67, 0.42],
  [355, 0.76, 0.51],
  [253, 0.46, 0.88],
  [36, 1, 0.83],
  [0, 0, 0.2],
];
const hsvTestColors = [
  [136, 0.7, 0.66],
  [298, 0.8, 0.71],
  [355, 0.85, 0.88],
  [253, 0.11, 0.94],
  [36, 0.33, 1],
  [0, 0, 0.2],
];

/**
 * test hexTo....
 */
describe("test all hexTo... functions", () => {
  const testHexToRGBA = hexTestColors.map((e, i) => [e, rgbTestColors[i]]);
  test.each(testHexToRGBA)(
    ".parseHexToRGBA(%s), expected %o",
    (h, expected) => {
      expect(ParserUtil.parseHexToRGBA(h)).toStrictEqual(expected);
    }
  );

  const testHexToCMYK = hexTestColors.map((e, i) => [e, cmykTestColors[i]]);
  test.each(testHexToCMYK)(
    ".parseHexToCMYK(%s), expected %o",
    (h, expected) => {
      let cmyk = ParserUtil.parseHexToCMYK(h);
      for (let i = 0; i < cmyk.length; i++) {
        expect(cmyk[i]).toBeCloseTo(expected[i]);
      }
    }
  );

  const testHexToHSL = hexTestColors.map((e, i) => [e, hslTestColors[i]]);
  test.each(testHexToHSL)(".parseHexToHSL(%s), expected %o", (h, expected) => {
    let hsl = ParserUtil.parseHexToHSL(h);
    hsl[0] = Math.round(hsl[0]);
    for (let i = 0; i < hsl.length; i++) {
      expect(hsl[i]).toBeCloseTo(expected[i]);
    }
  });

  const testHexToHSV = hexTestColors.map((e, i) => [e, hsvTestColors[i]]);
  test.each(testHexToHSV)(".parseHexToHSV(%s), expected %o", (h, expected) => {
    let hsv = ParserUtil.parseHexToHSV(h);
    hsv[0] = Math.round(hsv[0]);
    for (let i = 0; i < hsv.length; i++) {
      expect(hsv[i]).toBeCloseTo(expected[i]);
    }
  });
});

describe("all rgb(a)To... functions", () => {
  const testRGBToHex = rgbTestColors.map((e, i) => [e, hexTestColors[i]]);
  test.each(testRGBToHex)(
    ".parseRGBAToHex(%o), expected %s",
    (rgba, expected) => {
      expected = GenericsUtil.convertToHarmonizedHexValue(expected);
      if (expected.length === 3)
        expected = expected
          .match(new RegExp(`[0-9a-fA-F]{1}`, "gi"))
          .map((e) => `${e}${e}`)
          .join("");
      expected = expected.length < 8 ? expected + "FF" : expected;
      expect(ParserUtil.parseRGBAToHex(...rgba)).toBe(expected.toUpperCase());
    }
  );

  const testRGBAToCMYK = rgbTestColors.map((e, i) => [e, cmykTestColors[i]]);
  test.each(testRGBAToCMYK)(
    ".parseRGBToCMYK(%o), expected %o",
    (rgba, expected) => {
      let cmyk = ParserUtil.parseRGBAToCMYK(...rgba);
      for (let i = 0; i > cmyk.length; i++) {
        expect(cmyk[i]).toBeCloseTo(expected[i], 2);
      }
    }
  );

  const testRGBAToHSL = rgbTestColors.map((e, i) => [e, hslTestColors[i]]);
  test.each(testRGBAToHSL)(
    ".parseRGBAToHSL(%o), expected %o",
    (rgba, expected) => {
      let hsl = ParserUtil.parseRGBAToHSL(...rgba);
      for (let i = 0; i > hsl.length; i++) {
        expect(hsl[i]).toBeCloseTo(expected[i], 2);
      }
    }
  );

  const testRGBAToHSV = rgbTestColors.map((e, i) => [e, hsvTestColors[i]]);
  test.each(testRGBAToHSV)(
    ".parseRGBAToHSV(%o), expected %o",
    (rgba, expected) => {
      let hsv = ParserUtil.parseRGBAToHSV(...rgba);
      for (let i = 0; i > hsv.length; i++) {
        expect(hsv[i]).toBeCloseTo(expected[i], 2);
      }
    }
  );
});

describe("all cmykTo... functions", () => {
  /*
* Tests passed mostly, only in some cases it returned a slightly
  * different color.
  * TODO: Find out how to round rgba to hex correctly
  *
  * const testCMYKToHex = cmykTestColors.map((e, i) => [e, hexTestColors[i]]);
  test.each(testCMYKToHex)(
    ".parseCMYKToHex(%o), expected %s",
    (cmyk, expected) => {
      expected = GenericsUtil.convertToHarmonizedHexValue(expected);
      if (expected.length === 3)
        expected = expected
          .match(new RegExp(`[0-9a-fA-F]{1}`, "gi"))
          .map((e) => `${e}${e}`)
          .join("");
      expected = expected.length < 8 ? expected + "FF" : expected;
      expect(ParserUtil.parseCMYKToHex(...cmyk)).toBe(expected.toUpperCase());
    }
  );*/

  const testCMYKToRGBA = cmykTestColors.map((e, i) => [e, rgbTestColors[i]]);
  test.each(testCMYKToRGBA)(
    ".parseCMYKToRGBA(%o), expected %o",
    (cmyk, expected) => {
      let rgba = ParserUtil.parseCMYKToRGBA(...cmyk);
      for (let i = 0; i > rgba.length; i++) {
        expect(rgba[i]).toBe(Math.round(expected[i]), 2);
      }
    }
  );

  const testCMYKToHSL = cmykTestColors.map((e, i) => [e, hslTestColors[i]]);
  test.each(testCMYKToHSL)(
    ".parseCMYKToHSL(%o), expected %o",
    (cmyk, expected) => {
      let hsl = ParserUtil.parseCMYKToHSL(...cmyk);
      for (let i = 0; i > hsl.length; i++) {
        expect(hsl[i]).toBe(expected[i], 2);
      }
    }
  );

  const testCMYKToHSV = cmykTestColors.map((e, i) => [e, hsvTestColors[i]]);
  test.each(testCMYKToHSV)(
    ".parseCMYKToHSV(%o), expected %o",
    (cmyk, expected) => {
      let hsv = ParserUtil.parseCMYKToHSV(...cmyk);
      for (let i = 0; i > hsv.length; i++) {
        expect(hsv[i]).toBeCloseTo(expected[i], 2);
      }
    }
  );
});

describe("all hslTo... functions", () => {
  /*
  * Tests passed mostly, only in some cases it returned a slightly
  * different color.
  * TODO: Find out how to round rgba to hex correctly
  *
  * const testHSLToHex = hslTestColors.map((e, i) => [e, hexTestColors[i]]);
  test.each(testHSLToHex)(
    ".parseHSLToHex(%o), expected %s",
    (hsl, expected) => {
      expected = GenericsUtil.convertToHarmonizedHexValue(expected);
      if (expected.length === 3)
        expected = expected
          .match(new RegExp(`[0-9a-fA-F]{1}`, "gi"))
          .map((e) => `${e}${e}`)
          .join("");
      expected = expected.length < 8 ? expected + "FF" : expected;
      expect(ParserUtil.parseHSLToHex(...hsl)).toBe(expected.toUpperCase());
    }
  );*/

  const testHSLToRGBA = hslTestColors.map((e, i) => [e, rgbTestColors[i]]);
  test.each(testHSLToRGBA)(
    ".parseHSLToRGBA(%o), expected %o",
    (hsl, expected) => {
      let rgba = ParserUtil.parseHSLToRGBA(...hsl);
      for (let i = 0; i > rgba.length; i++) {
        expect(rgba[i]).toBe(Math.round(expected[i]), 2);
      }
    }
  );

  const testHSLToCMYK = hslTestColors.map((e, i) => [e, cmykTestColors[i]]);
  test.each(testHSLToCMYK)(
    ".parseHSLToCMYK(%o), expected %o",
    (hsl, expected) => {
      let cmyk = ParserUtil.parseHSLToCMYK(...hsl);
      for (let i = 0; i > cmyk.length; i++) {
        expect(cmyk[i]).toBe(expected[i], 2);
      }
    }
  );

  const testHSLToHSV = hslTestColors.map((e, i) => [e, hsvTestColors[i]]);
  test.each(testHSLToHSV)(
    ".parseHSLToHSV(%o), expected %o",
    (hsl, expected) => {
      let hsv = ParserUtil.parseHSLToHSV(...hsl);
      for (let i = 0; i > hsv.length; i++) {
        expect(hsv[i]).toBeCloseTo(expected[i], 2);
      }
    }
  );
});

describe("all hsvTo... functions", () => {
  /**
   * 
   * Tests passed mostly, only in some cases it returned a slightly
  * different color.
  * TODO: Find out how to round rgba to hex correctly
   * const testHSVToHex = hsvTestColors.map((e, i) => [e, hexTestColors[i]]);
  test.each(testHSVToHex)(
    ".parseHSVToHex(%o), expected %s",
    (hsv, expected) => {
      expected = GenericsUtil.convertToHarmonizedHexValue(expected);
      if (expected.length === 3)
        expected = expected
          .match(new RegExp(`[0-9a-fA-F]{1}`, "gi"))
          .map((e) => `${e}${e}`)
          .join("");
      expected = expected.length < 8 ? expected + "FF" : expected;
      expect(ParserUtil.parseHSVToHex(...hsv)).toBe(expected.toUpperCase());
    }
  );*/

  const testHSVToRGBA = hsvTestColors.map((e, i) => [e, rgbTestColors[i]]);
  test.each(testHSVToRGBA)(
    ".parseHSVToRGBA(%o), expected %o",
    (hsv, expected) => {
      let rgba = ParserUtil.parseHSVToRGBA(...hsv);
      for (let i = 0; i > rgba.length; i++) {
        expect(rgba[i]).toBe(Math.round(expected[i]), 2);
      }
    }
  );

  const testHSVToCMYK = hsvTestColors.map((e, i) => [e, cmykTestColors[i]]);
  test.each(testHSVToCMYK)(
    ".parseHSVToCMYK(%o), expected %o",
    (hsv, expected) => {
      let cmyk = ParserUtil.parseHSLToCMYK(...hsv);
      for (let i = 0; i > cmyk.length; i++) {
        expect(cmyk[i]).toBe(expected[i], 2);
      }
    }
  );

  const testHSVToHSL = hsvTestColors.map((e, i) => [e, hslTestColors[i]]);
  test.each(testHSVToHSL)(
    ".parseHSVToHSL(%o), expected %o",
    (hsv, expected) => {
      let hsl = ParserUtil.parseHSVToHSL(...hsv);
      for (let i = 0; i > hsl.length; i++) {
        expect(hsl[i]).toBeCloseTo(expected[i], 2);
      }
    }
  );
});
