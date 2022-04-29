/**
 * @author DeckerM7
 * @since 20220414
 */
import GenericsUtil from "./GenericsUtil.js";

class CSSUtil {
  static hexPrefix = "#";

  static rgbPrefix = "rgb(";
  static rgbaPrefix = "rgba(";

  static cmykPrefix = "cmyk(";

  static hslPrefix = "hsl(";

  static hsvPrefix = "hsv(";

  static valueSaparator = ",";
  static closingParanthesis = ")";
  static percentageSign = "%";

  static fixedDecimalDigits = 8;

  /**
   * to CSS String
   */
  //hex
  static toHexCSSString = (hex = "FFFFFF") => {
    if (GenericsUtil.__isString(hex)) hex = CSSUtil.__removeWhitespace(hex);

    let harmonizedHex = GenericsUtil.convertToHarmonizedHexValue(hex);
    if (!harmonizedHex) return;

    return CSSUtil.hexPrefix + harmonizedHex;
  };

  //rgba
  static toRGBCSSString = (r = 255, g = 255, b = 255) => {
    let rgb = [r, g, b];
    if (!GenericsUtil.isRGBArray(rgb)) return;

    rgb =
      CSSUtil.rgbPrefix +
      rgb
        .map((e) => CSSUtil.__toFixedNumber(e, CSSUtil.fixedDecimalDigits))
        .join(CSSUtil.valueSaparator + " ") +
      CSSUtil.closingParanthesis;

    return rgb;
  };

  static toRGBACSSString = (r = 255, g = 255, b = 255, a = 1) => {
    let rgba = [r, g, b, a];
    if (!GenericsUtil.isRGBAArray(rgba)) return;

    rgba =
      CSSUtil.rgbaPrefix +
      rgba
        .map((e) => CSSUtil.__toFixedNumber(e, CSSUtil.fixedDecimalDigits))
        .join(CSSUtil.valueSaparator + " ") +
      CSSUtil.closingParanthesis;

    return rgba;
  };

  //cmyk
  static toCMYKCSSString = (c = 1, m = 1, y = 1, k = 1) => {
    let cmyk = [c, m, y, k];
    if (!GenericsUtil.isCMYKArray(cmyk)) return;

    cmyk =
      CSSUtil.cmykPrefix +
      cmyk
        .map(
          (e) =>
            CSSUtil.__toFixedNumber(
              e * GenericsUtil.maxIntPercentage,
              CSSUtil.fixedDecimalDigits
            ) + CSSUtil.percentageSign
        )
        .join(CSSUtil.valueSaparator + " ") +
      CSSUtil.closingParanthesis;

    return cmyk;
  };

  //hsl
  static toHSLCSSString = (h = 60, s = 1, l = 1) => {
    let hsl = [h, s, l];
    if (!GenericsUtil.isHSLArray(hsl)) return;

    hsl =
      CSSUtil.hslPrefix +
      hsl
        .map((e, i) =>
          i > GenericsUtil.zero
            ? CSSUtil.__toFixedNumber(
                e * GenericsUtil.maxIntPercentage,
                CSSUtil.fixedDecimalDigits
              ) + CSSUtil.percentageSign
            : CSSUtil.__toFixedNumber(e, CSSUtil.fixedDecimalDigits)
        )
        .join(CSSUtil.valueSaparator + " ") +
      CSSUtil.closingParanthesis;
    return hsl;
  };

  //hsv
  static toHSVCSSString = (h = 60, s = 1, v = 1) => {
    let hsv = [h, s, v];
    if (!GenericsUtil.isHSVArray(hsv)) return;

    hsv =
      CSSUtil.hsvPrefix +
      hsv
        .map((e, i) =>
          i > GenericsUtil.zero
            ? CSSUtil.__toFixedNumber(
                e * GenericsUtil.maxIntPercentage,
                CSSUtil.fixedDecimalDigits
              ) + CSSUtil.percentageSign
            : CSSUtil.__toFixedNumber(e, CSSUtil.fixedDecimalDigits)
        )
        .join(CSSUtil.valueSaparator + " ") +
      CSSUtil.closingParanthesis;

    return hsv;
  };

  /**
   * from CSS String
   */
  //hex
  static cssStringToHarmonizedHexString = (cssStr) => {
    cssStr = CSSUtil.__removeWhitespace(cssStr);
    return GenericsUtil.convertToHarmonizedHexValue(cssStr);
  };

  //rgba
  static cssStringToRGBArray = (cssStr) => {
    cssStr = CSSUtil.__removeWhitespace(cssStr);
    if (
      !cssStr ||
      !cssStr.startsWith(CSSUtil.rgbPrefix) ||
      !cssStr.endsWith(CSSUtil.closingParanthesis)
    )
      return;

    let rgb = cssStr
      .replace(CSSUtil.rgbPrefix, "")
      .replace(CSSUtil.closingParanthesis, "")
      .split(CSSUtil.valueSaparator)
      .map((e) => parseFloat(e));

    if (!GenericsUtil.isRGBArray(rgb)) return;

    return rgb;
  };

  static cssStringToRGBAArray = (cssStr) => {
    cssStr = CSSUtil.__removeWhitespace(cssStr);
    if (
      !cssStr ||
      !cssStr.startsWith(CSSUtil.rgbaPrefix) ||
      !cssStr.endsWith(CSSUtil.closingParanthesis)
    )
      return;

    let rgba = cssStr
      .replace(CSSUtil.rgbaPrefix, "")
      .replace(CSSUtil.closingParanthesis, "")
      .split(CSSUtil.valueSaparator)
      .map((e) => parseFloat(e));

    if (!GenericsUtil.isRGBAArray(rgba)) return;

    return rgba;
  };

  //cmyk
  static cssStringToCMYKArray = (cssStr) => {
    cssStr = CSSUtil.__removeWhitespace(cssStr);
    if (
      !cssStr ||
      !cssStr.startsWith(CSSUtil.cmykPrefix) ||
      !cssStr.endsWith(CSSUtil.closingParanthesis)
    )
      return;

    let cmyk = cssStr
      .replace(CSSUtil.cmykPrefix, "")
      .replace(CSSUtil.closingParanthesis, "")
      .split(CSSUtil.valueSaparator)
      .map((e) => parseFloat(e) / GenericsUtil.maxIntPercentage);

    if (!GenericsUtil.isCMYKArray(cmyk)) return;

    return cmyk;
  };

  //HSL
  static cssStringToHSLArray = (cssStr) => {
    cssStr = CSSUtil.__removeWhitespace(cssStr);
    if (
      !cssStr ||
      !cssStr.startsWith(CSSUtil.hslPrefix) ||
      !cssStr.endsWith(CSSUtil.closingParanthesis)
    )
      return;

    let hsl = cssStr
      .replace(CSSUtil.hslPrefix, "")
      .replace(CSSUtil.closingParanthesis, "")
      .split(CSSUtil.valueSaparator)
      .map((e, i) =>
        i === 0 ? parseFloat(e) : parseFloat(e) / GenericsUtil.maxIntPercentage
      );

    if (!GenericsUtil.isHSLArray(hsl)) return;

    return hsl;
  };

  //HSV
  static cssStringToHSVArray = (cssStr) => {
    cssStr = CSSUtil.__removeWhitespace(cssStr);
    if (
      !cssStr ||
      !cssStr.startsWith(CSSUtil.hsvPrefix) ||
      !cssStr.endsWith(CSSUtil.closingParanthesis)
    )
      return;

    let hsv = cssStr
      .replace(CSSUtil.hsvPrefix, "")
      .replace(CSSUtil.closingParanthesis, "")
      .split(CSSUtil.valueSaparator)
      .map((e, i) =>
        i === 0 ? parseFloat(e) : parseFloat(e) / GenericsUtil.maxIntPercentage
      );

    if (!GenericsUtil.isHSVArray(hsv)) return;

    return hsv;
  };

  static __removeWhitespace = (string) => {
    if (!GenericsUtil.__isString(string)) return;
    return string.replace(/\s+/g, "");
  };

  static __toFixedNumber = (number, decimalDigits) => {
    if (!GenericsUtil.__isNumeric(number)) return;
    return Number.isInteger(number)
      ? `${number}`
      : number.toFixed(decimalDigits).replace(/0+.$/gi, "");
  };
}

export default CSSUtil;
