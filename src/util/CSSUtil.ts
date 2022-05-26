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
        const rgbArr = [r, g, b];
        if (!GenericsUtil.isRGBArray(rgbArr)) return;

        const mappedRgb =

            rgbArr
                .map((e) => CSSUtil.__toFixedNumber(e, CSSUtil.fixedDecimalDigits))
                .join(CSSUtil.valueSaparator + " ") +
            CSSUtil.closingParanthesis;

        return CSSUtil.rgbPrefix + mappedRgb;
    };

    static toRGBACSSString = (r = 255, g = 255, b = 255, a = 1) => {
        const rgbaArr = [r, g, b, a];
        if (!GenericsUtil.isRGBAArray(rgbaArr)) return;

        const mappedRgba = rgbaArr
                .map((e) => CSSUtil.__toFixedNumber(e, CSSUtil.fixedDecimalDigits))
                .join(CSSUtil.valueSaparator + " ") +
            CSSUtil.closingParanthesis;

        return CSSUtil.rgbaPrefix + mappedRgba;
    };

    //cmyk
    static toCMYKCSSString = (c = 1, m = 1, y = 1, k = 1) => {
        const cmykArr = [c, m, y, k];
        if (!GenericsUtil.isCMYKArray(cmykArr)) return;

        const mappedCmyk = cmykArr
                .map(
                    (e) =>
                        CSSUtil.__toFixedNumber(
                            e * GenericsUtil.maxIntPercentage,
                            CSSUtil.fixedDecimalDigits
                        ) + CSSUtil.percentageSign
                )
                .join(CSSUtil.valueSaparator + " ") +
            CSSUtil.closingParanthesis;

        return CSSUtil.cmykPrefix + mappedCmyk;
    };

    //hsl
    static toHSLCSSString = (h = 60, s = 1, l = 1) => {
        const hslArr = [h, s, l];
        if (!GenericsUtil.isHSLArray(hslArr)) return;

        const mappedHsl = hslArr
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

        return CSSUtil.hslPrefix + mappedHsl;
    };

    //hsv
    static toHSVCSSString = (h = 60, s = 1, v = 1) => {
        const hsvArr = [h, s, v]
        if (!GenericsUtil.isHSVArray(hsvArr)) return;

        const mappedHsv = hsvArr.map((e, i) =>
                i > GenericsUtil.zero
                    ? CSSUtil.__toFixedNumber(
                    e * GenericsUtil.maxIntPercentage,
                    CSSUtil.fixedDecimalDigits
                ) + CSSUtil.percentageSign
                    : CSSUtil.__toFixedNumber(e, CSSUtil.fixedDecimalDigits)
            )
                .join(CSSUtil.valueSaparator + " ") +
            CSSUtil.closingParanthesis;

        return CSSUtil.hsvPrefix + mappedHsv;
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
    static cssStringToHSVArray = (cssStr: string) => {
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
