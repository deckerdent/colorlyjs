/**
 * Unit Tests for the CSS Util
 *
 * @author  deckerdent
 * @since   20221604
 */
import ColorFactory from "../src/ColorFactory";

const validParams = [
    ["css", "#32a852"],
    ["css", "rgb(50, 168, 82)"],
    ["css", "rgba(50, 168, 82, 0.5)"],
    ["css", "cmyk(70%, 0%, 51%, 34%)"],
    ["css", "hsl(136, 54%, 43%)"],
    ["css", "hsv(136, 70%, 66%)"],
    ["hex", "32a852"],
    ["hex", 3319890],
    ["rgb", 50, 168, 82],
    ["rgba", 50, 168, 82, 1],
    ["cmyk", 0.7, 0.0, 0.51, 0.34],
    ["hsl", 136, 0.54, 0.43],
    ["hsv", 136, 0.7, 0.66],
];

const expectedOutcomeValidParams = [50, 168, 82];

const invalidParams = [
    ["css", "#32a852Z"],
    ["css", "rgb(50, 168, 300)"],
    ["css", "rgba(50, 256, 82, 0.5)"],
    ["css", "cmyk(70%, 0%, 51%, 101%)"],
    ["css", "hsl(400, 54%, 43%)"],
    ["css", "hsv(136, -3%, 66%)"],
    ["hex", "32a852AAA"],
    ["hex", 4581298449],
    ["rgb", 50, 168, 256],
    ["rgba", 50, -168, 82, 1],
    ["cmyk", 0.7, 0.0, -0.51, 0.34],
    ["hsl", 136, -0.54, 0.43],
    ["hsv", 136, -0.7, 0.66],
];

const expectedOutcomeInvalidParams = undefined;

describe(".createColor()", () => {
    /*
    *TODO: Solving rounding issue
    * works out well with +-1 in r g and b
    *const testValidParams = validParams.map((e) => [
      e,
      expectedOutcomeValidParams,
    ]);
    test.each(testValidParams)(
      ".createColor(%s), expect " + expectedOutcomeValidParams,
      (a, expected) => {
        console.log(a);
        let color = ColorFactory.createColor(...a);
        let rgb = [
          parseInt(color.getRed()),
          parseInt(color.getGreen()),
          parseInt(color.getBlue()),
        ];
        expect(rgb).toStrictEqual(expected);
      }
    );
    */

    const testInvalidParams = invalidParams.map((e) => [
        e,
        expectedOutcomeInvalidParams,
    ]);
    test.each(testInvalidParams)(
        "createColor(%s), expect" + expectedOutcomeInvalidParams,
        (a, expected) => {
            if (a.length === 2) {
                expect(ColorFactory.createColor(a[0], a[1])).toBe(expectedOutcomeInvalidParams);
            } else if (a.length === 3) {
                expect(ColorFactory.createColor(a[0], a[1], a[2])).toBe(expectedOutcomeInvalidParams);
            } else if (a.length === 4) {
                expect(ColorFactory.createColor(a[0], a[1], a[2], a[3])).toBe(expectedOutcomeInvalidParams);
            }
        }
    );
});
