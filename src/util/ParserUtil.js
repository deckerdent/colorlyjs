/**This script consists of all necessary code to parse a color into another format
 * @author  DeckerM7
 * @since   20220411
 */

import GenericsUtil from "./GenericsUtil";

class ParserUtil {
  /**
   * hex
   */
  static parseHexToRGBA = (hex) => {
    if (!GenericsUtil.isHexValue(hex)) return;

    let hexArray = GenericsUtil.__convertHexToArray(
      GenericsUtil.convertToHarmonizedHexValue(hex)
    );
    let rgba = GenericsUtil.isThreeElementsArray(hexArray)
      ? hexArray.map((e) => GenericsUtil.convertHexStringToIntValue(e))
      : hexArray.map((e, i) =>
          i < GenericsUtil.validArrayLength[0]
            ? GenericsUtil.convertHexStringToIntValue(e)
            : GenericsUtil.convertHexStringToIntValue(e) / GenericsUtil.maxRGB
        );

    return rgba;
  };

  static parseHexToCYMK = (hex) => {
    if (!GenericsUtil.isHexValue(hex)) return;

    return ParserUtil.parseRGBAToCYMK(...ParserUtil.parseHexToRGBA());
  };

  static parseHexToHSL = (hex) => {
    if (!GenericsUtil.isHexValue(hex)) return;

    return ParserUtil.parseRGBAToHSL(...ParserUtil.parseHexToRGBA());
  };

  static parseHexToHSV = (hex) => {
    if (!GenericsUtil.isHexValue(hex)) return;

    return ParserUtil.parseRGBAToHSV(...ParserUtil.parseHexToRGBA());
  };

  /**
   * rgba
   */
  static parseRGBAToHex = (r = 255, g = 255, b = 255, a = 1) => {
    a *= GenericsUtil.maxRGB;
    let rgba = [r, g, b, a];
    if (!GenericsUtil.isRGBAArray()) return;

    let hex = rgba
      .map((e) => {
        e = GenericsUtil.convertHexIntValueToString(e);
        return e;
      })
      .join("");
    return GenericsUtil.convertToHarmonizedHexValue(hex);
  };

  static parseRGBAToCYMK = (r = 255, g = 255, b = 255) => {
    let rgb = [r, g, b];
    if (!GenericsUtil.isRGBArray(rgb)) return;

    rgb = rgb.every((e) => GenericsUtil.normalizeRGBValue(e));

    let k = 1 - Math.max(...rgb),
      c = (1 - rgb[0] - k) / (1 - k),
      m = (1 - rgb[1] - k) / (1 - k),
      y = (1 - rgb[2] - k) / (1 - k);

    return [c, m, y, k];
  };

  static parseRGBAToHSL = (r = 255, g = 255, b = 255) => {
    let rgb = [r, g, b];
    if (!GenericsUtil.isRGBArray(rgb)) return;

    let h = GenericsUtil.getHueFromRGBA(rgb),
      s = GenericsUtil.getSaturationFromRGBA(rgb),
      l = GenericsUtil.getLuminosityFromRGBA(rgb);

    return [h, s, l];
  };

  static parseRGBAToHSV = (r = 255, g = 255, b = 255) => {
    let rgb = [r, g, b];
    if (!GenericsUtil.isRGBArray(rgb)) return;

    let h = this.getHueFromRGBA(rgb),
      s = this.getSaturationFromRGBA(rgb),
      v = this.getValueFromRGBA(rgb);

    return [h, s, v];
  };

  /**
   * cmyk
   */
  static parseCYMKToHex = (c = 1, m = 1, y = 1, k = 1) => {
    let cymk = [c, m, y, k];
    if (!GenericsUtil.isCYMKArray(cymk)) return;

    return ParserUtil.parseRGBAToHex(...ParserUtil.parseCYMKToRGBA(...cymk));
  };

  static parseCYMKToRGBA = (c = 1, m = 1, y = 1, k = 1) => {
    let cymk = [c, m, y, k];
    if (!GenericsUtil.isCYMKArray(cymk)) return;

    let r = GenericsUtil.maxRGB * (1 - cymk[0]) * (1 - cymk[3]),
      g = GenericsUtil.maxRGB * (1 - cymk[2]) * (1 - cymk[3]),
      b = GenericsUtil.maxRGB * (1 - cymk[1]) * (1 - cymk[3]);

    return [r, g, b, GenericsUtil.maxDecimalPercentage];
  };

  static parseCYMKToHSL = (c = 1, m = 1, y = 1, k = 1) => {
    let cymk = [c, m, y, k];
    if (!GenericsUtil.isCYMKArray(cymk)) return;

    return ParserUtil.parseRGBAToHSL(...ParserUtil.parseCYMKToRGBA(...cymk));
  };

  static parseCYMKToHSV = (c = 1, m = 1, y = 1, k = 1) => {
    let cymk = [c, m, y, k];
    if (!GenericsUtil.isCYMKArray(cymk)) return;

    return ParserUtil.parseRGBAToHSV(...ParserUtil.parseCYMKToRGBA(...cymk));
  };

  /**
   * hsl
   */
  static parseHSLToHex = (h = 60, s = 1, l = 1) => {
    let hsl = [h, s, l];
    if (!GenericsUtil.isHSLArray(hsl)) return;

    return ParserUtil.parseRGBAToHex(...ParserUtil.parseHSLToRGB(...hsl));
  };

  static parseHSLToRGB = (h = 60, s = 1, l = 1) => {
    let hsl = [h, s, l];
    if (!GenericsUtil.isHSLArray(hsl)) return;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / GenericsUtil.standardHue) % 2) - 1)),
      m = l - c / 2;

    let rgba = ParserUtil.getRGBPerHue(c, x, m, hsl[0]).map((e) =>
      GenericsUtil.getValueFromNormalizedRGBValue(e)
    );

    rgba[3] = GenericsUtil.maxDecimalPercentage;
    return rgba;
  };

  static parseHSLToCYMK = (h = 60, s = 1, l = 1) => {
    let hsl = [h, s, l];
    if (!GenericsUtil.isHSLArray(hsl)) return;

    return ParserUtil.parseRGBAToCYMK(...ParserUtil.parseHSLToRGB(...hsl));
  };

  static parseHSLToHSV = (h = 60, s = 1, l = 1) => {
    let hsl = [h, s, l];
    if (!GenericsUtil.isHSLArray(hsl)) return;

    return ParserUtil.parseRGBAToHSV(...ParserUtil.parseHSLToRGB(...hsl));
  };

  /**
   * hsv
   */
  static parseHSVToHex = (h = 60, s = 1, v = 1) => {
    let hsv = [h, s, v];
    if (!GenericsUtil.isHSVArray(hsv)) return;

    return ParserUtil.parseRGBAToHex(...ParserUtil.parseHSVToRGBA(...hsv));
  };

  static parseHSVToRGBA = (h = 60, s = 1, v = 1) => {
    let hsv = [h, s, v];
    if (!GenericsUtil.isHSVArray(hsv)) return;

    let c = hsv[1] * hsv[2],
      x = c * (1 - Math.abs(((hsv[0] / GenericsUtil.standardHue) % 2) - 1)),
      m = hsv[2] - c;

    let rgba = ParserUtil.getRGBPerHue(c, x, m, hsv[0]).map((e) =>
      GenericsUtil.getValueFromNormalizedRGBValue(e)
    );

    rgba[3] = GenericsUtil.maxDecimalPercentage;
  };

  static parseHSVToHSL = (h = 60, s = 1, v = 1) => {
    let hsv = [h, s, v];
    if (!GenericsUtil.isHSVArray(hsv)) return;

    return ParserUtil.parseRGBAToHSL(...ParserUtil.parseHSVToRGBA(...hsv));
  };

  static parseHSVToCYMK = (h = 60, s = 1, v = 1) => {
    let hsv = [h, s, v];
    if (!GenericsUtil.isHSVArray(hsv)) return;

    return ParserUtil.parseRGBAToCYMK(...ParserUtil.parseHSVToRGBA(...hsv));
  };

  /**
   * helpers
   */

  static getRGBPerHue = (c, x, m, h) => {
    let normalizedRBG;
    switch (h) {
      case (h >= 0 && h < 60) || h === 360:
        normalizedRBG = [c + m, x + m, m];
        break;
      case h >= 60 && h < 120:
        normalizedRBG = [x + m, c + m, m];
        break;
      case h >= 120 && h < 180:
        normalizedRBG = [m, c + m, x + m];
        break;
      case h >= 180 && h < 240:
        normalizedRBG = [m, x + m, c + m];
        break;
      case h >= 240 && h < 300:
        normalizedRBG = [x + m, m, c + m];
        break;
      case h >= 300 && h < 360:
        normalizedRBG = [c + m, m, x + m];
        break;
      default:
        break;
    }

    return normalizedRBG;
  };
}

export default ParserUtil;
