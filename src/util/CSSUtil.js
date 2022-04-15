/**
 * @author DeckerM7
 * @since 20220414
 */
import GenericsUtil from "./GenericsUtil";

class CSSUtil {
  static hexPrefix = "#";

  static rgbPrefix = "rgb(";
  static rgbaPrefix = "rgba(";

  static cymkPrefix = "cymk(";

  static hslPrefix = "hsl(";

  static hsvPrefix = "hsv(";

  static valueSaparator = ",";
  static closingParanthesis = ")";
  static percentageSign = "%";

  static fixedDecimalDigits = 3;

  /**
   * to CSS String
   */
  //hex
  static toHexCSSString = (hex = "FFFFFF") => {
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
        .join(CSSUtil.valueSaparator) +
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
        .join(CSSUtil.valueSaparator) +
      CSSUtil.closingParanthesis;

    return rgba;
  };

  //cymk
  static toCYMKCSSString = (c = 1, y = 1, m = 1, k = 1) => {
    let cymk = [c, y, m, k];
    if (!GenericsUtil.isCYMKArray(cymk)) return;

    cymk =
      CSSUtil.cymkPrefix +
      cymk
        .map((e) => CSSUtil.__toFixedNumber(e, CSSUtil.fixedDecimalDigits))
        .join(CSSUtil.valueSaparator) +
      CSSUtil.closingParanthesis;

    return cymk;
  };

  //hsl
  static toHSLCSSString = (h = 60, s = 1, l = 1) => {
    let hsl = [h, s, l];
    if (!GenericsUtil.isHSLArray(hsl)) return;

    hsl =
      CSSUtil.cymkPrefix +
      hsl
        .map((e, i) =>
          i > GenericsUtil.zero
            ? CSSUtil.__toFixedNumber(
                e * GenericsUtil.maxIntPercentage,
                CSSUtil.fixedDecimalDigits
              )
            : CSSUtil.__toFixedNumber(e, CSSUtil.fixedDecimalDigits)
        )
        .join(CSSUtil.valueSaparator) +
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
              )
            : CSSUtil.__toFixedNumber(e, CSSUtil.fixedDecimalDigits)
        )
        .join(CSSUtil.valueSaparator) +
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
      !cssStr.startsWith(CSSUtil.rgbPrefix) &&
      cssStr.endsWith(CSSUtil.closingParanthesis)
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
      !cssStr.startsWith(CSSUtil.rgbaPrefix) &&
      cssStr.endsWith(CSSUtil.closingParanthesis)
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

  //cymk
  static cssStringToCYMKArray = (cssStr) => {
    cssStr = CSSUtil.__removeWhitespace(cssStr);
    if (
      !cssStr.startsWith(CSSUtil.cymkPrefix) &&
      cssStr.endsWith(CSSUtil.closingParanthesis)
    )
      return;

    let cymk = cssStr
      .replace(CSSUtil.cymkPrefix, "")
      .replace(CSSUtil.closingParanthesis, "")
      .split(CSSUtil.valueSaparator)
      .map((e) => parseFloat(e));

    if (!GenericsUtil.isCYMKArray(cymk)) return;

    return cymk;
  };

  //HSL
  static cssStringToHSLArray = (cssStr) => {
    cssStr = CSSUtil.__removeWhitespace(cssStr);
    if (
      !cssStr.startsWith(CSSUtil.hslPrefix) &&
      cssStr.endsWith(CSSUtil.closingParanthesis)
    )
      return;

    let hsl = cssStr
      .replace(CSSUtil.hslPrefix, "")
      .replace(CSSUtil.closingParanthesis, "")
      .split(CSSUtil.valueSaparator)
      .map((e) => parseFloat(e));

    if (!GenericsUtil.isHSLArray(hsl)) return;

    return hsl;
  };

  //HSV
  static cssStringToHSVArray = (cssStr) => {
    cssStr = CSSUtil.__removeWhitespace(cssStr);
    if (
      !cssStr.startsWith(CSSUtil.hsvPrefix) &&
      cssStr.endsWith(CSSUtil.closingParanthesis)
    )
      return;

    let hsv = cssStr
      .replace(CSSUtil.hsvPrefix, "")
      .replace(CSSUtil.closingParanthesis, "")
      .split(CSSUtil.valueSaparator)
      .map((e) => parseFloat(e));

    if (!GenericsUtil.isHSVArray(hsv)) return;

    return hsv;
  };
}

export default CSSUtil;
