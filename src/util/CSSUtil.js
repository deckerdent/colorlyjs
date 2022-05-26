"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author DeckerM7
 * @since 20220414
 */
const GenericsUtil_js_1 = require("./GenericsUtil.js");
class CSSUtil {
}
CSSUtil.hexPrefix = "#";
CSSUtil.rgbPrefix = "rgb(";
CSSUtil.rgbaPrefix = "rgba(";
CSSUtil.cmykPrefix = "cmyk(";
CSSUtil.hslPrefix = "hsl(";
CSSUtil.hsvPrefix = "hsv(";
CSSUtil.valueSaparator = ",";
CSSUtil.closingParanthesis = ")";
CSSUtil.percentageSign = "%";
CSSUtil.fixedDecimalDigits = 8;
/**
 * to CSS String
 */
//hex
CSSUtil.toHexCSSString = (hex = "FFFFFF") => {
    if (GenericsUtil_js_1.default.__isString(hex))
        hex = CSSUtil.__removeWhitespace(hex);
    let harmonizedHex = GenericsUtil_js_1.default.convertToHarmonizedHexValue(hex);
    if (!harmonizedHex)
        return;
    return CSSUtil.hexPrefix + harmonizedHex;
};
//rgba
CSSUtil.toRGBCSSString = (r = 255, g = 255, b = 255) => {
    let rgb = [r, g, b];
    if (!GenericsUtil_js_1.default.isRGBArray(rgb))
        return;
    rgb =
        CSSUtil.rgbPrefix +
            rgb
                .map((e) => CSSUtil.__toFixedNumber(e, CSSUtil.fixedDecimalDigits))
                .join(CSSUtil.valueSaparator + " ") +
            CSSUtil.closingParanthesis;
    return rgb;
};
CSSUtil.toRGBACSSString = (r = 255, g = 255, b = 255, a = 1) => {
    let rgba = [r, g, b, a];
    if (!GenericsUtil_js_1.default.isRGBAArray(rgba))
        return;
    rgba =
        CSSUtil.rgbaPrefix +
            rgba
                .map((e) => CSSUtil.__toFixedNumber(e, CSSUtil.fixedDecimalDigits))
                .join(CSSUtil.valueSaparator + " ") +
            CSSUtil.closingParanthesis;
    return rgba;
};
//cmyk
CSSUtil.toCMYKCSSString = (c = 1, m = 1, y = 1, k = 1) => {
    let cmyk = [c, m, y, k];
    if (!GenericsUtil_js_1.default.isCMYKArray(cmyk))
        return;
    cmyk =
        CSSUtil.cmykPrefix +
            cmyk
                .map((e) => CSSUtil.__toFixedNumber(e * GenericsUtil_js_1.default.maxIntPercentage, CSSUtil.fixedDecimalDigits) + CSSUtil.percentageSign)
                .join(CSSUtil.valueSaparator + " ") +
            CSSUtil.closingParanthesis;
    return cmyk;
};
//hsl
CSSUtil.toHSLCSSString = (h = 60, s = 1, l = 1) => {
    let hsl = [h, s, l];
    if (!GenericsUtil_js_1.default.isHSLArray(hsl))
        return;
    hsl =
        CSSUtil.hslPrefix +
            hsl
                .map((e, i) => i > GenericsUtil_js_1.default.zero
                ? CSSUtil.__toFixedNumber(e * GenericsUtil_js_1.default.maxIntPercentage, CSSUtil.fixedDecimalDigits) + CSSUtil.percentageSign
                : CSSUtil.__toFixedNumber(e, CSSUtil.fixedDecimalDigits))
                .join(CSSUtil.valueSaparator + " ") +
            CSSUtil.closingParanthesis;
    return hsl;
};
//hsv
CSSUtil.toHSVCSSString = (h = 60, s = 1, v = 1) => {
    let hsv = [h, s, v];
    if (!GenericsUtil_js_1.default.isHSVArray(hsv))
        return;
    hsv =
        CSSUtil.hsvPrefix +
            hsv
                .map((e, i) => i > GenericsUtil_js_1.default.zero
                ? CSSUtil.__toFixedNumber(e * GenericsUtil_js_1.default.maxIntPercentage, CSSUtil.fixedDecimalDigits) + CSSUtil.percentageSign
                : CSSUtil.__toFixedNumber(e, CSSUtil.fixedDecimalDigits))
                .join(CSSUtil.valueSaparator + " ") +
            CSSUtil.closingParanthesis;
    return hsv;
};
/**
 * from CSS String
 */
//hex
CSSUtil.cssStringToHarmonizedHexString = (cssStr) => {
    cssStr = CSSUtil.__removeWhitespace(cssStr);
    return GenericsUtil_js_1.default.convertToHarmonizedHexValue(cssStr);
};
//rgba
CSSUtil.cssStringToRGBArray = (cssStr) => {
    cssStr = CSSUtil.__removeWhitespace(cssStr);
    if (!cssStr ||
        !cssStr.startsWith(CSSUtil.rgbPrefix) ||
        !cssStr.endsWith(CSSUtil.closingParanthesis))
        return;
    let rgb = cssStr
        .replace(CSSUtil.rgbPrefix, "")
        .replace(CSSUtil.closingParanthesis, "")
        .split(CSSUtil.valueSaparator)
        .map((e) => parseFloat(e));
    if (!GenericsUtil_js_1.default.isRGBArray(rgb))
        return;
    return rgb;
};
CSSUtil.cssStringToRGBAArray = (cssStr) => {
    cssStr = CSSUtil.__removeWhitespace(cssStr);
    if (!cssStr ||
        !cssStr.startsWith(CSSUtil.rgbaPrefix) ||
        !cssStr.endsWith(CSSUtil.closingParanthesis))
        return;
    let rgba = cssStr
        .replace(CSSUtil.rgbaPrefix, "")
        .replace(CSSUtil.closingParanthesis, "")
        .split(CSSUtil.valueSaparator)
        .map((e) => parseFloat(e));
    if (!GenericsUtil_js_1.default.isRGBAArray(rgba))
        return;
    return rgba;
};
//cmyk
CSSUtil.cssStringToCMYKArray = (cssStr) => {
    cssStr = CSSUtil.__removeWhitespace(cssStr);
    if (!cssStr ||
        !cssStr.startsWith(CSSUtil.cmykPrefix) ||
        !cssStr.endsWith(CSSUtil.closingParanthesis))
        return;
    let cmyk = cssStr
        .replace(CSSUtil.cmykPrefix, "")
        .replace(CSSUtil.closingParanthesis, "")
        .split(CSSUtil.valueSaparator)
        .map((e) => parseFloat(e) / GenericsUtil_js_1.default.maxIntPercentage);
    if (!GenericsUtil_js_1.default.isCMYKArray(cmyk))
        return;
    return cmyk;
};
//HSL
CSSUtil.cssStringToHSLArray = (cssStr) => {
    cssStr = CSSUtil.__removeWhitespace(cssStr);
    if (!cssStr ||
        !cssStr.startsWith(CSSUtil.hslPrefix) ||
        !cssStr.endsWith(CSSUtil.closingParanthesis))
        return;
    let hsl = cssStr
        .replace(CSSUtil.hslPrefix, "")
        .replace(CSSUtil.closingParanthesis, "")
        .split(CSSUtil.valueSaparator)
        .map((e, i) => i === 0 ? parseFloat(e) : parseFloat(e) / GenericsUtil_js_1.default.maxIntPercentage);
    if (!GenericsUtil_js_1.default.isHSLArray(hsl))
        return;
    return hsl;
};
//HSV
CSSUtil.cssStringToHSVArray = (cssStr) => {
    cssStr = CSSUtil.__removeWhitespace(cssStr);
    if (!cssStr ||
        !cssStr.startsWith(CSSUtil.hsvPrefix) ||
        !cssStr.endsWith(CSSUtil.closingParanthesis))
        return;
    let hsv = cssStr
        .replace(CSSUtil.hsvPrefix, "")
        .replace(CSSUtil.closingParanthesis, "")
        .split(CSSUtil.valueSaparator)
        .map((e, i) => i === 0 ? parseFloat(e) : parseFloat(e) / GenericsUtil_js_1.default.maxIntPercentage);
    if (!GenericsUtil_js_1.default.isHSVArray(hsv))
        return;
    return hsv;
};
CSSUtil.__removeWhitespace = (string) => {
    if (!GenericsUtil_js_1.default.__isString(string))
        return;
    return string.replace(/\s+/g, "");
};
CSSUtil.__toFixedNumber = (number, decimalDigits) => {
    if (!GenericsUtil_js_1.default.__isNumeric(number))
        return;
    return Number.isInteger(number)
        ? `${number}`
        : number.toFixed(decimalDigits).replace(/0+.$/gi, "");
};
exports.default = CSSUtil;
//# sourceMappingURL=CSSUtil.js.map