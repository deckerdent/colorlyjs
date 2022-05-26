/**
 * @author DeckerM7
 * @since 20220414
 *
 */
import GenericsUtil from "./util/GenericsUtil.js";
import ParserUtil from "./util/ParserUtil.js";
import CSSUtil from "./util/CSSUtil.js";
import CSSColors from "./util/CSSColors.js";

import Color from "./model/Color.js";

export type ColorModes = "css" | "hex" | "rgb" | "rgba" | "cmyk" | "hsl" | "hsv" | "name";

class ColorFactory {
    //using variables
    //hex

    static modes = {
        css: "css",
        hex: "hex",
        rgb: "rgb",
        rgba: "rgba",
        cmyk: "cmyk",
        hsl: "hsl",
        hsv: "hsv",
        name: "name",
    };

    static createColor = (mode: ColorModes, a: number | string, b?: number, c?: number, d?: number) => {
        if (!mode) {
            return
        }

        if (mode === "css") {
            return ColorFactory.createColorFromCSSString(a as string)
        } else if (mode === "hex") {
            return ColorFactory.createColorFromHex(a)
        } else if (mode === "rgb") {
            return ColorFactory.createColorFromRGB(a as number, b, c)
        } else if (mode === "rgba") {
            return ColorFactory.createColorFromRGBA(a as number, b, c, d)
        } else if (mode === "cmyk") {
            return ColorFactory.createColorFromCMYK(a as number, b, c, d)
        } else if (mode === "hsl") {
            return ColorFactory.createColorFromHSL(a as number, b, c)
        } else if (mode === "hsv") {
            return ColorFactory.createColorFromHSV(a as number, b, c)
        } else if (mode === "name") {
            return ColorFactory.createColorFromNamedCSSColor(a as string)
        }
    };

    static createColorFromHex = (hex: string | number) => {
        if (!GenericsUtil.isHexValue(hex)) return;
        let rgba = ParserUtil.parseHexToRGBA(
            GenericsUtil.convertToHarmonizedHexValue(hex)
        );
        return new Color(...rgba);
    };

    //rgba
    static createColorFromRGB = (r: number, g: number, b: number) => {
        if (!GenericsUtil.isRGBArray([r, g, b])) return;
        return new Color(r, g, b);
    };

    static createColorFromRGBA = (r: number, g: number, b: number, a: number) => {
        if (!GenericsUtil.isRGBAArray([r, g, b, a])) return;
        return new Color(r, g, b, a);
    };

    //cmyk
    static createColorFromCMYK = (c: number, m: number, y: number, k: number) => {
        if (!GenericsUtil.isCMYKArray([c, m, y, k])) return;
        return new Color(...ParserUtil.parseCMYKToRGBA(c, m, y, k));
    };

    //hsl
    static createColorFromHSL = (h: number, s: number, l: number) => {
        if (!GenericsUtil.isHSLArray([h, s, l])) return;
        return new Color(...ParserUtil.parseHSLToRGBA(h, s, l));
    };

    //hsv
    static createColorFromHSV = (h: number, s: number, v: number) => {
        if (!GenericsUtil.isHSVArray([h, s, v])) return;
        return new Color(...ParserUtil.parseHSVToRGBA(h, s, v));
    };

    //using css strings
    //hex
    static createColorFromCSSString = (cssStr: string) => {
        if (cssStr.indexOf(CSSUtil.hexPrefix) === 0) {
            return ColorFactory.createColorFromHexCSSString(cssStr);
        } else if (cssStr.indexOf(CSSUtil.rgbaPrefix) === 0) {
            return ColorFactory.createColorFromRGBACSSString(cssStr);
        } else if (cssStr.indexOf(CSSUtil.rgbPrefix) === 0) {
            return ColorFactory.createColorFromRGBCSSString(cssStr);
        } else if (cssStr.indexOf(CSSUtil.cmykPrefix) === 0) {
            return ColorFactory.createColorFromCMYKCSSString(cssStr);
        } else if (cssStr.indexOf(CSSUtil.hslPrefix) === 0) {
            return ColorFactory.createColorFromHSLCSSString(cssStr);
        } else if (cssStr.indexOf(CSSUtil.hsvPrefix) === 0) {
            return ColorFactory.createColorFromHSVCSSString(cssStr);
        } else {
            return;
        }
    };

    static createColorFromHexCSSString = (cssStr: string) => {
        let hex = CSSUtil.cssStringToHarmonizedHexString(cssStr);

        return hex ? ColorFactory.createColorFromHex(hex) : undefined;
    };

    //rgba
    static createColorFromRGBCSSString = (cssStr: string) => {
        let rgb = CSSUtil.cssStringToRGBArray(cssStr);
        const [r, g, b] = rgb;
        return GenericsUtil.isRGBArray(rgb) && ColorFactory.createColorFromRGB(r, g, b);
    };
    static createColorFromRGBACSSString = (cssStr: string) => {
        let rgba = CSSUtil.cssStringToRGBAArray(cssStr);
        const [r, g, b, a] = rgba;
        return GenericsUtil.isRGBAArray(rgba) && ColorFactory.createColorFromRGBA(r, g, b, a);
    };

    //cmyk
    static createColorFromCMYKCSSString = (cssStr: string) => {
        let cmyk = CSSUtil.cssStringToCMYKArray(cssStr);
        const [c, m, y, k] = cmyk;
        return GenericsUtil.isCMYKArray(cmyk) && ColorFactory.createColorFromCMYK(c, m, y, k);
    };

    //hsl
    static createColorFromHSLCSSString = (cssStr: string) => {
        let hsl = CSSUtil.cssStringToHSLArray(cssStr);
        const [h, s, l] = hsl;
        return GenericsUtil.isHSLArray(hsl) && ColorFactory.createColorFromHSL(h, s, l);
    };

    //hsv
    static createColorFromHSVCSSString = (cssStr: string) => {
        const hsv = CSSUtil.cssStringToHSVArray(cssStr);
        const [h, s, v] = hsv;
        return GenericsUtil.isHSVArray(hsv) && ColorFactory.createColorFromHSV(h, s, v);
    };

    //using css color names
    static createColorFromNamedCSSColor = (colorName: string) => {
        if (!CSSColors[colorName]) return;
        return ColorFactory.createColorFromHexCSSString(CSSColors[colorName]);
    };
}

export default ColorFactory;
