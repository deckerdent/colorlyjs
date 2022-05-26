"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author DeckerM7
 * @since 20220414
 *
 */
const GenericsUtil_js_1 = require("./util/GenericsUtil.js");
const ParserUtil_js_1 = require("./util/ParserUtil.js");
const CSSUtil_js_1 = require("./util/CSSUtil.js");
const CSSColors_js_1 = require("./util/CSSColors.js");
const Color_js_1 = require("./model/Color.js");
class ColorFactory {
}
//using variables
//hex
ColorFactory.modes = {
    css: "css",
    hex: "hex",
    rgb: "rgb",
    rgba: "rgba",
    cmyk: "cmyk",
    hsl: "hsl",
    hsv: "hsv",
    name: "name",
};
ColorFactory.createColor = (mode, a, b, c, d) => {
    let modes = {
        css: ColorFactory.createColorFromCSSString,
        hex: ColorFactory.createColorFromHex,
        rgb: ColorFactory.createColorFromRGB,
        rgba: ColorFactory.createColorFromRGBA,
        cmyk: ColorFactory.createColorFromCMYK,
        hsl: ColorFactory.createColorFromHSL,
        hsv: ColorFactory.createColorFromHSV,
        name: ColorFactory.createColorFromNamedCSSColor,
    };
    return modes[mode] ? modes[mode](a, b, c, d) : undefined;
};
ColorFactory.createColorFromHex = (hex) => {
    if (!GenericsUtil_js_1.default.isHexValue(hex))
        return;
    let rgba = ParserUtil_js_1.default.parseHexToRGBA(GenericsUtil_js_1.default.convertToHarmonizedHexValue(hex));
    return new Color_js_1.default(...rgba);
};
//rgba
ColorFactory.createColorFromRGB = (r, g, b) => {
    if (!GenericsUtil_js_1.default.isRGBArray([r, g, b]))
        return;
    return new Color_js_1.default(r, g, b);
};
ColorFactory.createColorFromRGBA = (r, g, b, a) => {
    if (!GenericsUtil_js_1.default.isRGBAArray([r, g, b, a]))
        return;
    return new Color_js_1.default(r, g, b, a);
};
//cmyk
ColorFactory.createColorFromCMYK = (c, m, y, k) => {
    if (!GenericsUtil_js_1.default.isCMYKArray([c, m, y, k]))
        return;
    return new Color_js_1.default(...ParserUtil_js_1.default.parseCMYKToRGBA(c, m, y, k));
};
//hsl
ColorFactory.createColorFromHSL = (h, s, l) => {
    if (!GenericsUtil_js_1.default.isHSLArray([h, s, l]))
        return;
    return new Color_js_1.default(...ParserUtil_js_1.default.parseHSLToRGBA(h, s, l));
};
//hsv
ColorFactory.createColorFromHSV = (h, s, v) => {
    if (!GenericsUtil_js_1.default.isHSVArray([h, s, v]))
        return;
    return new Color_js_1.default(...ParserUtil_js_1.default.parseHSVToRGBA(h, s, v));
};
//using css strings
//hex
ColorFactory.createColorFromCSSString = (cssStr) => {
    let color;
    if (cssStr.indexOf(CSSUtil_js_1.default.hexPrefix) === 0) {
        color = ColorFactory.createColorFromHexCSSString(cssStr);
    }
    else if (cssStr.indexOf(CSSUtil_js_1.default.rgbaPrefix) === 0) {
        color = ColorFactory.createColorFromRGBACSSString(cssStr);
    }
    else if (cssStr.indexOf(CSSUtil_js_1.default.rgbPrefix) === 0) {
        color = ColorFactory.createColorFromRGBCSSString(cssStr);
    }
    else if (cssStr.indexOf(CSSUtil_js_1.default.cmykPrefix) === 0) {
        color = ColorFactory.createColorFromCMYKCSSString(cssStr);
    }
    else if (cssStr.indexOf(CSSUtil_js_1.default.hslPrefix) === 0) {
        color = ColorFactory.createColorFromHSLCSSString(cssStr);
    }
    else if (cssStr.indexOf(CSSUtil_js_1.default.hsvPrefix) === 0) {
        color = ColorFactory.createColorFromHSVCSSString(cssStr);
    }
    else {
        return;
    }
    return color;
};
ColorFactory.createColorFromHexCSSString = (cssStr) => {
    let hex = CSSUtil_js_1.default.cssStringToHarmonizedHexString(cssStr);
    return hex ? ColorFactory.createColorFromHex(hex) : undefined;
};
//rgba
ColorFactory.createColorFromRGBCSSString = (cssStr) => {
    let rgb = CSSUtil_js_1.default.cssStringToRGBArray(cssStr);
    return rgb ? ColorFactory.createColorFromRGB(...rgb) : undefined;
};
ColorFactory.createColorFromRGBACSSString = (cssStr) => {
    let rgba = CSSUtil_js_1.default.cssStringToRGBAArray(cssStr);
    return rgba ? ColorFactory.createColorFromRGBA(...rgba) : undefined;
};
//cmyk
ColorFactory.createColorFromCMYKCSSString = (cssStr) => {
    let cmyk = CSSUtil_js_1.default.cssStringToCMYKArray(cssStr);
    return cmyk ? ColorFactory.createColorFromCMYK(...cmyk) : undefined;
};
//hsl
ColorFactory.createColorFromHSLCSSString = (cssStr) => {
    let hsl = CSSUtil_js_1.default.cssStringToHSLArray(cssStr);
    return hsl ? ColorFactory.createColorFromHSL(...hsl) : undefined;
};
//hsv
ColorFactory.createColorFromHSVCSSString = (cssStr) => {
    let hsv = CSSUtil_js_1.default.cssStringToHSVArray(cssStr);
    return hsv ? ColorFactory.createColorFromHSV(...hsv) : undefined;
};
//using css color names
ColorFactory.createColorFromNamedCSSColor = (colorName) => {
    if (!CSSColors_js_1.default[colorName])
        return;
    return ColorFactory.createColorFromHexCSSString(CSSColors_js_1.default[colorName]);
};
exports.default = ColorFactory;
//# sourceMappingURL=ColorFactory.js.map