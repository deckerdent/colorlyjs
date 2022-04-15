/**
 * @author DeckerM7
 * @since 20220411
 */
import GenericsUtil from "../util/GenericsUtil";
import ParserUtil from "../util/ParserUtil";
import CSSUtil from "../util/CSSUtil";

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
  //cymk
  addCyan = (c) => {
    let cymk = ParserUtil.parseRGBAToCYMK(this.r, this.g, this.b);

    this.setCyan(cymk[0] + c);
  };

  addYellow = (y) => {
    let cymk = ParserUtil.parseRGBAToCYMK(this.r, this.g, this.b);

    this.setYellow(cymk[1] + y);
  };
  addMagenta = (m) => {
    let cymk = ParserUtil.parseRGBAToCYMK(this.r, this.g, this.b);

    this.setMagenta(cymk[2] + m);
  };
  addBlack = (k) => {
    let cymk = ParserUtil.parseRGBAToCYMK(this.r, this.g, this.b);

    this.setBlack(cymk[3] + k);
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
  //cymk
  getCyan = () => {
    let [c, y, m, k] = ParserUtil.parseRGBAToCYMK(this.r, this.g, this.b);
    return c;
  };

  getYellow = () => {
    let [c, y, m, k] = ParserUtil.parseRGBAToCYMK(this.r, this.g, this.b);
    return y;
  };

  getMagenta = () => {
    let [c, y, m, k] = ParserUtil.parseRGBAToCYMK(this.r, this.g, this.b);
    return m;
  };

  getBlack = () => {
    let [c, y, m, k] = ParserUtil.parseRGBAToCYMK(this.r, this.g, this.b);
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
    return GenericsUtil.getLightnessFromRGBA(this.r, this.g, this.b);
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
      r < GenericsUtil.zero
        ? GenericsUtil.zero
        : r > GenericsUtil.maxRGB
        ? GenericsUtil.maxRGB
        : r;
  };

  setGreen = (g) => {
    this.g =
      g < GenericsUtil.zero
        ? GenericsUtil.zero
        : g > GenericsUtil.maxRGB
        ? GenericsUtil.maxRGB
        : g;
  };

  setBlue = (b) => {
    this.b =
      b < GenericsUtil.zero
        ? GenericsUtil.zero
        : b > GenericsUtil.maxRGB
        ? GenericsUtil.maxRGB
        : b;
  };

  //cymk
  setCyan = (c) => {
    let cymk = ParserUtil.parseRGBAToCYMK(this.r, this.g, this.b);

    cymk[0] = c;

    let [r, g, b] = ParserUtil.parseCYMKToRGB(...cymk);

    this.setRed(r);
    this.setGreen(g);
    this.setBlue(b);
  };

  setYellow = (y) => {
    let cymk = ParserUtil.parseRGBAToCYMK(this.r, this.g, this.b);

    cymk[1] = y;

    let [r, g, b] = ParserUtil.parseCYMKToRGB(...cymk);

    this.setRed(r);
    this.setGreen(g);
    this.setBlue(b);
  };

  setMagenta = (m) => {
    let cymk = ParserUtil.parseRGBAToCYMK(this.r, this.g, this.b);

    cymk[2] = m;

    let [r, g, b] = ParserUtil.parseCYMKToRGB(...cymk);

    this.setRed(r);
    this.setGreen(g);
    this.setBlue(b);
  };

  setBlack = (k) => {
    let cymk = ParserUtil.parseRGBAToCYMK(this.r, this.g, this.b);

    cymk[3] = k;

    let [r, g, b] = ParserUtil.parseCYMKToRGB(...cymk);

    this.setRed(r);
    this.setGreen(g);
    this.setBlue(b);
  };
  //hsl, hsv
  setHue = (h) => {
    let hsl = ParserUtil.parseRGBAToHSL(this.r, this.g, this.b);

    hsl[0] = h;

    let [r, g, b] = ParserUtil.parseHSLToRGB(...hsl);

    this.setRed(r);
    this.setGreen(g);
    this.setBlue(b);
  };

  setSaturation = (s) => {
    let hsl = ParserUtil.parseRGBAToHSL(this.r, this.g, this.b);

    hsl[1] = s;

    let [r, g, b] = ParserUtil.parseHSLToRGB(...hsl);

    this.setRed(r);
    this.setGreen(g);
    this.setBlue(b);
  };

  setLightness = (l) => {
    let hsl = ParserUtil.parseRGBAToHSL(this.r, this.g, this.b);

    hsl[2] = l;

    let [r, g, b] = ParserUtil.parseHSLToRGB(...hsl);

    this.setRed(r);
    this.setGreen(g);
    this.setBlue(b);
  };

  setValue = (v) => {
    let hsv = ParserUtil.parseRGBAToHSV(this.r, this.g, this.b);

    hsv[2] = v;

    let [r, g, b] = ParserUtil.parseHSVToRGB(...hsv);

    this.setRed(r);
    this.setGreen(g);
    this.setBlue(b);
  };

  //additional setters for transparency
  //TODO: setHexOpacity = (o) => {};
  setDecimalOpacity = (o) => {
    this.a =
      o < GenericsUtil.zero
        ? GenericsUtil.zero
        : o > GenericsUtil.maxDecimalPercentage
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
  //cymk
  toCYMKArray = () => {
    return ParserUtil.parseRGBAToCYMK(this.r, this.g, this.b);
  };
  toCYMKCSSString = () => {
    let cymk = ParserUtil.parseRGBAToCYMK(this.r, this.g, this.b);
    return CSSUtil.toCYMKCSSString(...cymk);
  };
  //hsl
  toHSLArray = () => {
    return ParserUtil.parseRGBAToHSL(this.r, this.g, this.b);
  };
  toHSLSSString = () => {
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
