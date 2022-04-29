/**
 * @author DeckerM7
 * @since 20220411
 */
import GenericsUtil from "../util/GenericsUtil.js";
import ParserUtil from "../util/ParserUtil.js";
import CSSUtil from "../util/CSSUtil.js";

class Color {
  r;
  g;
  b;
  a;

  constructor(r = 255, g = 255, b = 255, a = 1) {
    let rgba = [r, g, b, a];
    let errMsg = `The given values ${rgba} are not valid color values. Read the documentation do find out more.`;
    if (!GenericsUtil.isRGBAArray(rgba)) throw new Error(errMsg);

    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  /**
   * Adders
   */
  //TODO: Unsure if there's a need for those
  //addHexRed = (hex) => {};
  //addHexGreen = (hex) => {};
  //addHexBlue = (hex) => {};
  //rgb
  addRed = (r) => {
    this.setRed(r + this.r);
  };

  addGreen = (g) => {
    this.setGreen(g + this.g);
  };

  addBlue = (b) => {
    this.setBlue(b + this.b);
  };
  //cmyk
  addCyan = (c) => {
    let cmyk = ParserUtil.parseRGBAToCMYK(this.r, this.g, this.b);

    this.setCyan(cmyk[0] + c);
  };

  addYellow = (y) => {
    let cmyk = ParserUtil.parseRGBAToCMYK(this.r, this.g, this.b);

    this.setYellow(cmyk[2] + y);
  };
  addMagenta = (m) => {
    let cmyk = ParserUtil.parseRGBAToCMYK(this.r, this.g, this.b);

    this.setMagenta(cmyk[1] + m);
  };
  addBlack = (k) => {
    let cmyk = ParserUtil.parseRGBAToCMYK(this.r, this.g, this.b);

    this.setBlack(cmyk[3] + k);
  };
  //hsl, hsv
  addHue = (h) => {
    let hsl = ParserUtil.parseRGBAToHSL(this.r, this.g, this.b);

    this.setHue(hsl[0] + h);
  };

  addSaturation = (s) => {
    let hsl = ParserUtil.parseRGBAToHSL(this.r, this.g, this.b);

    this.setSaturation(hsl[1] + s);
  };

  addLightness = (l) => {
    let hsl = ParserUtil.parseRGBAToHSL(this.r, this.g, this.b);

    this.setLightness(hsl[2] + l);
  };

  addValue = (v) => {
    let hsv = ParserUtil.parseRGBAToHSV(this.r, this.g, this.b);

    this.setValue(hsv[2] + v);
  };

  //additional adders for transparency
  //TODO: addHexOpacity = (o) => {};
  addDecimalOpacity = (o) => {
    this.setDecimalOpacity(o + this.a);
  };

  addIntOpacity = (o) => {
    o /= GenericsUtil.maxIntPercentage;
    this.addDecimalOpacity(o);
  };

  /**
   * Getters
   */
  //TODO:
  //getHexRed = () => {};
  //getHexGreen = () => {};
  //getHexBlue = () => {};
  //rgb
  getRed = () => {
    return this.r;
  };

  getGreen = () => {
    return this.g;
  };

  getBlue = () => {
    return this.b;
  };
  //cmyk
  getCyan = () => {
    let [c, m, y, k] = ParserUtil.parseRGBAToCMYK(this.r, this.g, this.b);
    return c;
  };

  getYellow = () => {
    let [c, m, y, k] = ParserUtil.parseRGBAToCMYK(this.r, this.g, this.b);
    return y;
  };

  getMagenta = () => {
    let [c, m, y, k] = ParserUtil.parseRGBAToCMYK(this.r, this.g, this.b);
    return m;
  };

  getBlack = () => {
    let [c, m, y, k] = ParserUtil.parseRGBAToCMYK(this.r, this.g, this.b);
    return k;
  };
  //hsl, hsv
  getHue = () => {
    return GenericsUtil.getHueFromRGBA(this.r, this.g, this.b);
  };

  getSaturation = () => {
    return GenericsUtil.getSaturationFromRGBA(this.r, this.g, this.b);
  };

  getLightness = () => {
    return GenericsUtil.getLuminosityFromRGBA(this.r, this.g, this.b);
  };

  getValue = () => {
    return GenericsUtil.getValueFromRGBA(this.r, this.g, this.b);
  };

  //additional getters for transparency
  //TODO: getHexOpacity = () => {};
  getDecimalOpacity = () => {
    return this.a;
  };

  getIntOpacity = () => {
    return this.a * GenericsUtil.maxIntPercentage;
  };

  /**
   * Setters
   */
  //hex
  //TODO:
  //setHexRed = (hex) => {};
  //setHexGreen = (hex) => {};
  //setHexBlue = (hex) => {};
  //rgb
  setRed = (r) => {
    this.r =
      r && r < GenericsUtil.zero
        ? GenericsUtil.zero
        : r && r > GenericsUtil.maxRGB
        ? GenericsUtil.maxRGB
        : r;
  };

  setGreen = (g) => {
    this.g =
      g && g < GenericsUtil.zero
        ? GenericsUtil.zero
        : g && g > GenericsUtil.maxRGB
        ? GenericsUtil.maxRGB
        : g;
  };

  setBlue = (b) => {
    this.b =
      b && b < GenericsUtil.zero
        ? GenericsUtil.zero
        : b && b > GenericsUtil.maxRGB
        ? GenericsUtil.maxRGB
        : b;
  };

  //cmyk
  setCyan = (c) => {
    let cmyk = ParserUtil.parseRGBAToCMYK(this.r, this.g, this.b);

    cmyk[0] =
      c && c < GenericsUtil.zero
        ? GenericsUtil.zero
        : c && c > GenericsUtil.maxDecimalPercentage
        ? GenericsUtil.maxDecimalPercentage
        : c;

    let rgb = ParserUtil.parseCMYKToRGBA(...cmyk);
    if (!rgb) return;

    let [r, g, b] = rgb;
    this.setRed(r);
    this.setGreen(g);
    this.setBlue(b);
  };

  setYellow = (y) => {
    let cmyk = ParserUtil.parseRGBAToCMYK(this.r, this.g, this.b);

    cmyk[2] =
      y && y < GenericsUtil.zero
        ? GenericsUtil.zero
        : y && y > GenericsUtil.maxDecimalPercentage
        ? GenericsUtil.maxDecimalPercentage
        : y;

    let rgb = ParserUtil.parseCMYKToRGBA(...cmyk);
    if (!rgb) return;

    let [r, g, b] = rgb;
    this.setRed(r);
    this.setGreen(g);
    this.setBlue(b);
  };

  setMagenta = (m) => {
    let cmyk = ParserUtil.parseRGBAToCMYK(this.r, this.g, this.b);

    cmyk[1] =
      m && m < GenericsUtil.zero
        ? GenericsUtil.zero
        : m && m > GenericsUtil.maxDecimalPercentage
        ? GenericsUtil.maxDecimalPercentage
        : m;

    let rgb = ParserUtil.parseCMYKToRGBA(...cmyk);
    if (!rgb) return;

    let [r, g, b] = rgb;
    this.setRed(r);
    this.setGreen(g);
    this.setBlue(b);
  };

  setBlack = (k) => {
    let cmyk = ParserUtil.parseRGBAToCMYK(this.r, this.g, this.b);

    cmyk[3] =
      k && k < GenericsUtil.zero
        ? GenericsUtil.zero
        : k && k > GenericsUtil.maxDecimalPercentage
        ? GenericsUtil.maxDecimalPercentage
        : k;

    let rgb = ParserUtil.parseCMYKToRGBA(...cmyk);

    if (!rgb) return;

    let [r, g, b] = rgb;
    this.setRed(r);
    this.setGreen(g);
    this.setBlue(b);
  };
  //hsl, hsv
  setHue = (h) => {
    let hsl = ParserUtil.parseRGBAToHSL(this.r, this.g, this.b);

    hsl[0] =
      h && h < GenericsUtil.zero
        ? GenericsUtil.zero
        : h && h > GenericsUtil.maxDecimalPercentage
        ? GenericsUtil.maxDecimalPercentage
        : h;

    let rgb = ParserUtil.parseHSLToRGBA(...hsl);
    if (!rgb) return;

    let [r, g, b] = rgb;
    this.setRed(r);
    this.setGreen(g);
    this.setBlue(b);
  };

  setSaturation = (s) => {
    let hsl = ParserUtil.parseRGBAToHSL(this.r, this.g, this.b);

    hsl[1] =
      s && s < GenericsUtil.zero
        ? GenericsUtil.zero
        : s && s > GenericsUtil.maxDecimalPercentage
        ? GenericsUtil.maxDecimalPercentage
        : s;

    let rgb = ParserUtil.parseHSLToRGBA(...hsl);
    if (!rgb) return;

    let [r, g, b] = rgb;
    this.setRed(r);
    this.setGreen(g);
    this.setBlue(b);
  };

  setLightness = (l) => {
    let hsl = ParserUtil.parseRGBAToHSL(this.r, this.g, this.b);

    hsl[2] =
      l && l < GenericsUtil.zero
        ? GenericsUtil.zero
        : l && l > GenericsUtil.maxDecimalPercentage
        ? GenericsUtil.maxDecimalPercentage
        : l;

    let rgb = ParserUtil.parseHSLToRGBA(...hsl);
    if (!rgb) return;

    let [r, g, b] = rgb;
    this.setRed(r);
    this.setGreen(g);
    this.setBlue(b);
  };

  setValue = (v) => {
    let hsv = ParserUtil.parseRGBAToHSV(this.r, this.g, this.b);

    hsv[2] =
      v && v < GenericsUtil.zero
        ? GenericsUtil.zero
        : v && v > GenericsUtil.maxDecimalPercentage
        ? GenericsUtil.maxDecimalPercentage
        : 0;

    let rgb = ParserUtil.parseHSVToRGBA(...hsv);
    if (!rgb) return;

    let [r, g, b] = rgb;
    this.setRed(r);
    this.setGreen(g);
    this.setBlue(b);
  };

  //additional setters for transparency
  //TODO: setHexOpacity = (o) => {};
  setDecimalOpacity = (o) => {
    this.a =
      o && o < GenericsUtil.zero
        ? GenericsUtil.zero
        : o && o > GenericsUtil.maxDecimalPercentage
        ? GenericsUtil.maxDecimalPercentage
        : o;
  };
  setIntOpacity = (o) => {
    o /= GenericsUtil.maxIntPercentage;
    this.setDecimalOpacity(o);
  };

  /**
   * Parsers
   */
  //hex
  toHexIntValue = () => {
    return GenericsUtil.convertHexStringToIntValue(
      ParserUtil.parseRGBAToHex(this.r, this.g, this.b, this.a)
    );
  };
  toHexArray = () => {
    return GenericsUtil.__convertHexToArray(
      ParserUtil.parseRGBAToHex(this.r, this.g, this.b, this.a)
    );
  };

  toHexCSSString = () => {
    let hex = ParserUtil.parseRGBAToHex(this.r, this.g, this.b, this.a);
    return CSSUtil.toHexCSSString(hex);
  };
  //rgba
  toRGBArray = () => {
    return [this.r, this.g, this.b];
  };
  toRGBCSSString = () => {
    return CSSUtil.toRGBCSSString(this.r, this.g, this.b);
  };

  toRGBAArray = () => {
    return [this.r, this.g, this.b, this.a];
  };
  toRGBACSSString = () => {
    return CSSUtil.toRGBACSSString(this.r, this.g, this.b, this.a);
  };
  //cmyk
  toCMYKArray = () => {
    return ParserUtil.parseRGBAToCMYK(this.r, this.g, this.b);
  };
  toCMYKCSSString = () => {
    let cmyk = ParserUtil.parseRGBAToCMYK(this.r, this.g, this.b);
    return CSSUtil.toCMYKCSSString(...cmyk);
  };
  //hsl
  toHSLArray = () => {
    return ParserUtil.parseRGBAToHSL(this.r, this.g, this.b);
  };

  toHSLCSSString = () => {
    let hsl = ParserUtil.parseRGBAToHSL(this.r, this.g, this.b);
    return CSSUtil.toHSLCSSString(...hsl);
  };
  //hsv
  toHSVArray = () => {
    return ParserUtil.parseRGBAToHSV(this.r, this.g, this.b);
  };
  toHSVCSSString = () => {
    let hsv = ParserUtil.parseRGBAToHSV(this.r, this.g, this.b);
    return CSSUtil.toHSVCSSString(...hsv);
  };

  //additional toCSSString for opacity
  toOpacityCSSString = () => {
    return this.a;
  };

  /**
   * Copy color
   */
  copy = () => {
    return new Color(this.r, this.g, this.b, this.a);
  };
}

export default Color;
