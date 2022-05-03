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

  static createColor = (mode, a, b, c, d) => {
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

  static createColorFromHex = (hex) => {
    if (!GenericsUtil.isHexValue(hex)) return;
    let rgba = ParserUtil.parseHexToRGBA(
      GenericsUtil.convertToHarmonizedHexValue(hex)
    );
    return new Color(...rgba);
  };

  //rgba
  static createColorFromRGB = (r, g, b) => {
    if (!GenericsUtil.isRGBArray([r, g, b])) return;
    return new Color(r, g, b);
  };

  static createColorFromRGBA = (r, g, b, a) => {
    if (!GenericsUtil.isRGBAArray([r, g, b, a])) return;
    return new Color(r, g, b, a);
  };

  //cmyk
  static createColorFromCMYK = (c, m, y, k) => {
    if (!GenericsUtil.isCMYKArray([c, m, y, k])) return;
    return new Color(...ParserUtil.parseCMYKToRGBA(c, m, y, k));
  };

  //hsl
  static createColorFromHSL = (h, s, l) => {
    if (!GenericsUtil.isHSLArray([h, s, l])) return;
    return new Color(...ParserUtil.parseHSLToRGBA(h, s, l));
  };

  //hsv
  static createColorFromHSV = (h, s, v) => {
    if (!GenericsUtil.isHSVArray([h, s, v])) return;
    return new Color(...ParserUtil.parseHSVToRGBA(h, s, v));
  };

  //using css strings
  //hex
  static createColorFromCSSString = (cssStr) => {
    let color;
    if (cssStr.indexOf(CSSUtil.hexPrefix) === 0) {
      color = ColorFactory.createColorFromHexCSSString(cssStr);
    } else if (cssStr.indexOf(CSSUtil.rgbaPrefix) === 0) {
      color = ColorFactory.createColorFromRGBACSSString(cssStr);
    } else if (cssStr.indexOf(CSSUtil.rgbPrefix) === 0) {
      color = ColorFactory.createColorFromRGBCSSString(cssStr);
    } else if (cssStr.indexOf(CSSUtil.cmykPrefix) === 0) {
      color = ColorFactory.createColorFromCMYKCSSString(cssStr);
    } else if (cssStr.indexOf(CSSUtil.hslPrefix) === 0) {
      color = ColorFactory.createColorFromHSLCSSString(cssStr);
    } else if (cssStr.indexOf(CSSUtil.hsvPrefix) === 0) {
      color = ColorFactory.createColorFromHSVCSSString(cssStr);
    } else {
      return;
    }

    return color;
  };

  static createColorFromHexCSSString = (cssStr) => {
    let hex = CSSUtil.cssStringToHarmonizedHexString(cssStr);

    return hex ? ColorFactory.createColorFromHex(hex) : undefined;
  };

  //rgba
  static createColorFromRGBCSSString = (cssStr) => {
    let rgb = CSSUtil.cssStringToRGBArray(cssStr);

    return rgb ? ColorFactory.createColorFromRGB(...rgb) : undefined;
  };
  static createColorFromRGBACSSString = (cssStr) => {
    let rgba = CSSUtil.cssStringToRGBAArray(cssStr);
    return rgba ? ColorFactory.createColorFromRGBA(...rgba) : undefined;
  };

  //cmyk
  static createColorFromCMYKCSSString = (cssStr) => {
    let cmyk = CSSUtil.cssStringToCMYKArray(cssStr);
    return cmyk ? ColorFactory.createColorFromCMYK(...cmyk) : undefined;
  };

  //hsl
  static createColorFromHSLCSSString = (cssStr) => {
    let hsl = CSSUtil.cssStringToHSLArray(cssStr);
    return hsl ? ColorFactory.createColorFromHSL(...hsl) : undefined;
  };

  //hsv
  static createColorFromHSVCSSString = (cssStr) => {
    let hsv = CSSUtil.cssStringToHSVArray(cssStr);
    return hsv ? ColorFactory.createColorFromHSV(...hsv) : undefined;
  };

  //using css color names
  static createColorFromNamedCSSColor = (colorName) => {
    if (!CSSColors[colorName]) return;
    return ColorFactory.createColorFromHexCSSString(CSSColors[colorName]);
  };
}

export default ColorFactory;
