"use strict";
/**GenericsUtil script consists of all necessary code to parse a color into another format
 * @author  DeckerM7
 * @since   20220411
 */
Object.defineProperty(exports, "__esModule", { value: true });
const GenericsUtil_js_1 = require("./GenericsUtil.js");
class ParserUtil {
}
/**
 * hex
 */
ParserUtil.parseHexToRGBA = (hex) => {
    if (!GenericsUtil_js_1.default.isHexValue(hex))
        return;
    let hexArray = GenericsUtil_js_1.default.__convertHexToArray(GenericsUtil_js_1.default.convertToHarmonizedHexValue(hex));
    let rgba = hexArray.map((e) => parseInt(e, GenericsUtil_js_1.default.hex));
    if (rgba.length === GenericsUtil_js_1.default.validArrayLength[1])
        rgba[3] = rgba[3] / GenericsUtil_js_1.default.maxRGB;
    return rgba;
};
ParserUtil.parseHexToCMYK = (hex) => {
    if (!GenericsUtil_js_1.default.isHexValue(hex))
        return;
    return ParserUtil.parseRGBAToCMYK(...ParserUtil.parseHexToRGBA(hex));
};
ParserUtil.parseHexToHSL = (hex) => {
    if (!GenericsUtil_js_1.default.isHexValue(hex))
        return;
    return ParserUtil.parseRGBAToHSL(...ParserUtil.parseHexToRGBA(hex));
};
ParserUtil.parseHexToHSV = (hex) => {
    if (!GenericsUtil_js_1.default.isHexValue(hex))
        return;
    return ParserUtil.parseRGBAToHSV(...ParserUtil.parseHexToRGBA(hex));
};
/**
 * rgba
 */
ParserUtil.parseRGBAToHex = (r = 255, g = 255, b = 255, a = 1) => {
    let rgba = [r, g, b, a];
    if (!GenericsUtil_js_1.default.isRGBAArray(rgba))
        return;
    rgba[3] *= GenericsUtil_js_1.default.maxRGB;
    let hex = rgba
        .map((e) => Math.round(e).toString(GenericsUtil_js_1.default.hex).padStart(2, 0))
        .join("");
    return GenericsUtil_js_1.default.convertToHarmonizedHexValue(hex);
};
ParserUtil.parseRGBAToCMYK = (r = 255, g = 255, b = 255) => {
    let rgb = [r, g, b];
    if (!GenericsUtil_js_1.default.isRGBArray(rgb))
        return;
    rgb = rgb.map((e) => GenericsUtil_js_1.default.normalizeRGBValue(e));
    if (Math.max(...rgb) === 0)
        return [0, 0, 0, 1];
    let k = 1 - Math.max(...rgb), c = (1 - rgb[0] - k) / (1 - k), m = (1 - rgb[1] - k) / (1 - k), y = (1 - rgb[2] - k) / (1 - k);
    return [c, m, y, k];
};
ParserUtil.parseRGBAToHSL = (r = 255, g = 255, b = 255) => {
    let rgb = [r, g, b];
    if (!GenericsUtil_js_1.default.isRGBArray(rgb))
        return;
    let h = GenericsUtil_js_1.default.getHueFromRGBA(...rgb), s = GenericsUtil_js_1.default.getSaturationFromRGBA(...rgb), l = GenericsUtil_js_1.default.getLuminosityFromRGBA(...rgb);
    return [h, s, l];
};
ParserUtil.parseRGBAToHSV = (r = 255, g = 255, b = 255) => {
    let rgb = [r, g, b];
    if (!GenericsUtil_js_1.default.isRGBArray(rgb))
        return;
    /**
     *
    let h = GenericsUtil.getHueFromRGBA(...rgb),
      s = GenericsUtil.getSaturationFromRGBA(...rgb),
      v = GenericsUtil.getValueFromRGBA(...rgb)
    return [h, s, v];
    */
    rgb = GenericsUtil_js_1.default.normalizeRGBArray(rgb);
    let cMax = Math.max(...rgb), cMin = Math.min(...rgb), delta = cMax - cMin;
    let h = delta === 0
        ? 0
        : cMax === rgb[0]
            ? GenericsUtil_js_1.default.standardHue * (((rgb[1] - rgb[2]) / delta) % 6)
            : cMax === rgb[1]
                ? GenericsUtil_js_1.default.standardHue * ((rgb[2] - rgb[0]) / delta + 2)
                : GenericsUtil_js_1.default.standardHue * ((rgb[0] - rgb[1]) / delta + 4);
    h = h < 0 ? 360 + h : h > 360 ? h - 360 : h;
    let s = cMax === 0 ? 0 : delta / cMax;
    return [h, s, cMax];
};
/**
 * cmyk
 */
ParserUtil.parseCMYKToHex = (c = 1, m = 1, y = 1, k = 1) => {
    let cmyk = [c, m, y, k];
    if (!GenericsUtil_js_1.default.isCMYKArray(cmyk))
        return;
    return ParserUtil.parseRGBAToHex(...ParserUtil.parseCMYKToRGBA(...cmyk));
};
ParserUtil.parseCMYKToRGBA = (c = 1, m = 1, y = 1, k = 1) => {
    let cmyk = [c, m, y, k];
    if (!GenericsUtil_js_1.default.isCMYKArray(cmyk))
        return;
    let r = GenericsUtil_js_1.default.maxRGB * (1 - cmyk[0]) * (1 - cmyk[3]), g = GenericsUtil_js_1.default.maxRGB * (1 - cmyk[1]) * (1 - cmyk[3]), b = GenericsUtil_js_1.default.maxRGB * (1 - cmyk[2]) * (1 - cmyk[3]);
    return [r, g, b, GenericsUtil_js_1.default.maxDecimalPercentage];
};
ParserUtil.parseCMYKToHSL = (c = 1, m = 1, y = 1, k = 1) => {
    let cmyk = [c, m, y, k];
    if (!GenericsUtil_js_1.default.isCMYKArray(cmyk))
        return;
    return ParserUtil.parseRGBAToHSL(...ParserUtil.parseCMYKToRGBA(...cmyk));
};
ParserUtil.parseCMYKToHSV = (c = 1, m = 1, y = 1, k = 1) => {
    let cmyk = [c, m, y, k];
    if (!GenericsUtil_js_1.default.isCMYKArray(cmyk))
        return;
    return ParserUtil.parseRGBAToHSV(...ParserUtil.parseCMYKToRGBA(...cmyk));
};
/**
 * hsl
 */
ParserUtil.parseHSLToHex = (h = 60, s = 1, l = 1) => {
    let hsl = [h, s, l];
    if (!GenericsUtil_js_1.default.isHSLArray(hsl))
        return;
    return ParserUtil.parseRGBAToHex(...ParserUtil.parseHSLToRGBA(...hsl));
};
ParserUtil.parseHSLToRGBA = (h = 60, s = 1, l = 1) => {
    let hsl = [h, s, l];
    if (!GenericsUtil_js_1.default.isHSLArray(hsl))
        return;
    let c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / GenericsUtil_js_1.default.standardHue) % 2) - 1)), m = l - c / 2;
    let rgba = ParserUtil.getRGBPerHue(c, x, m, hsl[0]).map((e) => GenericsUtil_js_1.default.getValueFromNormalizedRGBValue(e));
    rgba[3] = GenericsUtil_js_1.default.maxDecimalPercentage;
    return rgba;
};
ParserUtil.parseHSLToCMYK = (h = 60, s = 1, l = 1) => {
    let hsl = [h, s, l];
    if (!GenericsUtil_js_1.default.isHSLArray(hsl))
        return;
    return ParserUtil.parseRGBAToCMYK(...ParserUtil.parseHSLToRGBA(...hsl));
};
ParserUtil.parseHSLToHSV = (h = 60, s = 1, l = 1) => {
    let hsl = [h, s, l];
    if (!GenericsUtil_js_1.default.isHSLArray(hsl))
        return;
    return ParserUtil.parseRGBAToHSV(...ParserUtil.parseHSLToRGBA(...hsl));
};
/**
 * hsv
 */
ParserUtil.parseHSVToHex = (h = 60, s = 1, v = 1) => {
    let hsv = [h, s, v];
    if (!GenericsUtil_js_1.default.isHSVArray(hsv))
        return;
    return ParserUtil.parseRGBAToHex(...ParserUtil.parseHSVToRGBA(...hsv));
};
ParserUtil.parseHSVToRGBA = (h = 60, s = 1, v = 1) => {
    let hsv = [h, s, v];
    if (!GenericsUtil_js_1.default.isHSVArray(hsv))
        return;
    let c = hsv[1] * hsv[2], x = c * (1 - Math.abs(((hsv[0] / GenericsUtil_js_1.default.standardHue) % 2) - 1)), m = hsv[2] - c;
    let rgba = ParserUtil.getRGBPerHue(c, x, m, hsv[0]).map((e) => GenericsUtil_js_1.default.getValueFromNormalizedRGBValue(e));
    rgba[3] = GenericsUtil_js_1.default.maxDecimalPercentage;
    return rgba;
};
ParserUtil.parseHSVToHSL = (h = 60, s = 1, v = 1) => {
    let hsv = [h, s, v];
    if (!GenericsUtil_js_1.default.isHSVArray(hsv))
        return;
    return ParserUtil.parseRGBAToHSL(...ParserUtil.parseHSVToRGBA(...hsv));
};
ParserUtil.parseHSVToCMYK = (h = 60, s = 1, v = 1) => {
    let hsv = [h, s, v];
    if (!GenericsUtil_js_1.default.isHSVArray(hsv))
        return;
    return ParserUtil.parseRGBAToCMYK(...ParserUtil.parseHSVToRGBA(...hsv));
};
/**
 * helpers
 */
ParserUtil.getRGBPerHue = (c, x, m, h) => {
    let normalizedRBG;
    if ((h >= 0 && h < 60) || h === 360) {
        normalizedRBG = [c + m, x + m, m];
    }
    else if (h >= 60 && h < 120) {
        normalizedRBG = [x + m, c + m, m];
    }
    else if (h >= 120 && h < 180) {
        normalizedRBG = [m, c + m, x + m];
    }
    else if (h >= 180 && h < 240) {
        normalizedRBG = [m, x + m, c + m];
    }
    else if (h >= 240 && h < 300) {
        normalizedRBG = [x + m, m, c + m];
    }
    else if (h >= 300 && h < 360) {
        normalizedRBG = [c + m, m, x + m];
    }
    else {
        normalizedRBG = [0, 0, 0];
    }
    return normalizedRBG;
};
exports.default = ParserUtil;
//# sourceMappingURL=ParserUtil.js.map