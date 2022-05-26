"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author DeckerM7
 * @since 20220411
 */
const GenericsUtil_js_1 = require("../util/GenericsUtil.js");
const ParserUtil_js_1 = require("../util/ParserUtil.js");
const CSSUtil_js_1 = require("../util/CSSUtil.js");
class Color {
    constructor(r = 255, g = 255, b = 255, a = 1) {
        this.precision = {
            rgb: 0,
            cmyk: 2,
            hsl: 2,
            hsv: 2,
            opacity: 2,
        };
        /**
         * Adders
         */
        //TODO: Unsure if there's a need for those
        //addHexRed = (hex) => {};
        //addHexGreen = (hex) => {};
        //addHexBlue = (hex) => {};
        //rgb
        this.addRed = (r) => {
            this.setRed(r + this.getRed());
        };
        this.addGreen = (g) => {
            this.setGreen(g + this.getGreen());
        };
        this.addBlue = (b) => {
            this.setBlue(b + this.getBlue());
        };
        //cmyk
        this.addCyan = (c) => {
            let cmyk = ParserUtil_js_1.default.parseRGBAToCMYK(this.getRed(), this.getGreen(), this.getBlue());
            this.setCyan(cmyk[0] + c);
        };
        this.addYellow = (y) => {
            let cmyk = ParserUtil_js_1.default.parseRGBAToCMYK(this.getRed(), this.getGreen(), this.getBlue());
            this.setYellow(cmyk[2] + y);
        };
        this.addMagenta = (m) => {
            let cmyk = ParserUtil_js_1.default.parseRGBAToCMYK(this.getRed(), this.getGreen(), this.getBlue());
            this.setMagenta(cmyk[1] + m);
        };
        this.addBlack = (k) => {
            let cmyk = ParserUtil_js_1.default.parseRGBAToCMYK(this.getRed(), this.getGreen(), this.getBlue());
            this.setBlack(cmyk[3] + k);
        };
        //hsl, hsv
        this.addHue = (h) => {
            let hsl = ParserUtil_js_1.default.parseRGBAToHSL(this.getRed(), this.getGreen(), this.getBlue());
            this.setHue(hsl[0] + h);
        };
        this.addSaturation = (s) => {
            let hsl = ParserUtil_js_1.default.parseRGBAToHSL(this.getRed(), this.getGreen(), this.getBlue());
            this.setSaturation(hsl[1] + s);
        };
        this.addLightness = (l) => {
            let hsl = ParserUtil_js_1.default.parseRGBAToHSL(this.getRed(), this.getGreen(), this.getBlue());
            this.setLightness(hsl[2] + l);
        };
        this.addValue = (v) => {
            let hsv = ParserUtil_js_1.default.parseRGBAToHSV(this.getRed(), this.getGreen(), this.getBlue());
            this.setValue(hsv[2] + v);
        };
        //additional adders for transparency
        //TODO: addHexOpacity = (o) => {};
        this.addDecimalOpacity = (o) => {
            this.setDecimalOpacity(o + this.getDecimalOpacity());
        };
        this.addIntOpacity = (o) => {
            o /= GenericsUtil_js_1.default.maxIntPercentage;
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
        this.getRed = () => {
            return this.r;
        };
        this.getGreen = () => {
            return this.g;
        };
        this.getBlue = () => {
            return this.b;
        };
        //cmyk
        this.getCyan = () => {
            let [c, m, y, k] = ParserUtil_js_1.default.parseRGBAToCMYK(this.getRed(), this.getGreen(), this.getBlue());
            return c;
        };
        this.getYellow = () => {
            let [c, m, y, k] = ParserUtil_js_1.default.parseRGBAToCMYK(this.getRed(), this.getGreen(), this.getBlue());
            return y;
        };
        this.getMagenta = () => {
            let [c, m, y, k] = ParserUtil_js_1.default.parseRGBAToCMYK(this.getRed(), this.getGreen(), this.getBlue());
            return m;
        };
        this.getBlack = () => {
            let [c, m, y, k] = ParserUtil_js_1.default.parseRGBAToCMYK(this.getRed(), this.getGreen(), this.getBlue());
            return k;
        };
        //hsl, hsv
        this.getHue = () => {
            return GenericsUtil_js_1.default.getHueFromRGBA(this.getRed(), this.getGreen(), this.getBlue());
        };
        this.getSaturation = () => {
            return GenericsUtil_js_1.default.getSaturationFromRGBA(this.getRed(), this.getGreen(), this.getBlue());
        };
        this.getLightness = () => {
            return GenericsUtil_js_1.default.getLuminosityFromRGBA(this.getRed(), this.getGreen(), this.getBlue());
        };
        this.getValue = () => {
            return GenericsUtil_js_1.default.getValueFromRGBA(this.getRed(), this.getGreen(), this.getBlue());
        };
        //additional getters for transparency
        //TODO: getHexOpacity = () => {};
        this.getDecimalOpacity = () => {
            return this.a;
        };
        this.getIntOpacity = () => {
            return this.getDecimalOpacity() * GenericsUtil_js_1.default.maxIntPercentage;
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
        this.setRed = (r) => {
            if (!r && r !== 0)
                return;
            this.r =
                r && r < GenericsUtil_js_1.default.zero
                    ? GenericsUtil_js_1.default.zero
                    : r && r > GenericsUtil_js_1.default.maxRGB
                        ? GenericsUtil_js_1.default.maxRGB
                        : GenericsUtil_js_1.default.roundNumberToInfinity(r, this.precision.rgb);
        };
        this.setGreen = (g) => {
            if (!g && g !== 0)
                return;
            this.g =
                g && g < GenericsUtil_js_1.default.zero
                    ? GenericsUtil_js_1.default.zero
                    : g && g > GenericsUtil_js_1.default.maxRGB
                        ? GenericsUtil_js_1.default.maxRGB
                        : GenericsUtil_js_1.default.roundNumberToInfinity(g, this.precision.rgb);
        };
        this.setBlue = (b) => {
            if (!b && b !== 0)
                return;
            this.b =
                b && b < GenericsUtil_js_1.default.zero
                    ? GenericsUtil_js_1.default.zero
                    : b && b > GenericsUtil_js_1.default.maxRGB
                        ? GenericsUtil_js_1.default.maxRGB
                        : GenericsUtil_js_1.default.roundNumberToInfinity(b, this.precision.rgb);
        };
        //cmyk
        this.setCyan = (c) => {
            if (!c && c !== 0)
                return;
            let cmyk = ParserUtil_js_1.default.parseRGBAToCMYK(this.getRed(), this.getGreen(), this.getBlue());
            cmyk[0] =
                c && c < GenericsUtil_js_1.default.zero
                    ? GenericsUtil_js_1.default.zero
                    : c && c > GenericsUtil_js_1.default.maxDecimalPercentage
                        ? GenericsUtil_js_1.default.maxDecimalPercentage
                        : c;
            let rgb = ParserUtil_js_1.default.parseCMYKToRGBA(...cmyk);
            if (!rgb)
                return;
            let [r, g, b] = rgb;
            this.setRed(r);
            this.setGreen(g);
            this.setBlue(b);
        };
        this.setYellow = (y) => {
            if (!y && y !== 0)
                return;
            let cmyk = ParserUtil_js_1.default.parseRGBAToCMYK(this.getRed(), this.getGreen(), this.getBlue());
            cmyk[2] =
                y && y < GenericsUtil_js_1.default.zero
                    ? GenericsUtil_js_1.default.zero
                    : y && y > GenericsUtil_js_1.default.maxDecimalPercentage
                        ? GenericsUtil_js_1.default.maxDecimalPercentage
                        : y;
            let rgb = ParserUtil_js_1.default.parseCMYKToRGBA(...cmyk);
            if (!rgb)
                return;
            let [r, g, b] = rgb;
            this.setRed(r);
            this.setGreen(g);
            this.setBlue(b);
        };
        this.setMagenta = (m) => {
            if (!m && m !== 0)
                return;
            let cmyk = ParserUtil_js_1.default.parseRGBAToCMYK(this.getRed(), this.getGreen(), this.getBlue());
            cmyk[1] =
                m && m < GenericsUtil_js_1.default.zero
                    ? GenericsUtil_js_1.default.zero
                    : m && m > GenericsUtil_js_1.default.maxDecimalPercentage
                        ? GenericsUtil_js_1.default.maxDecimalPercentage
                        : m;
            let rgb = ParserUtil_js_1.default.parseCMYKToRGBA(...cmyk);
            if (!rgb)
                return;
            let [r, g, b] = rgb;
            this.setRed(r);
            this.setGreen(g);
            this.setBlue(b);
        };
        this.setBlack = (k) => {
            if (!k && k !== 0)
                return;
            let cmyk = ParserUtil_js_1.default.parseRGBAToCMYK(this.getRed(), this.getGreen(), this.getBlue());
            cmyk[3] =
                k && k < GenericsUtil_js_1.default.zero
                    ? GenericsUtil_js_1.default.zero
                    : k && k > GenericsUtil_js_1.default.maxDecimalPercentage
                        ? GenericsUtil_js_1.default.maxDecimalPercentage
                        : k;
            let rgb = ParserUtil_js_1.default.parseCMYKToRGBA(...cmyk);
            if (!rgb)
                return;
            let [r, g, b] = rgb;
            this.setRed(r);
            this.setGreen(g);
            this.setBlue(b);
        };
        //hsl, hsv
        this.setHue = (h) => {
            if (!h && h !== 0)
                return;
            let hsl = ParserUtil_js_1.default.parseRGBAToHSL(this.getRed(), this.getGreen(), this.getBlue());
            hsl[0] =
                h && h < GenericsUtil_js_1.default.zero
                    ? GenericsUtil_js_1.default.zero
                    : h && h > GenericsUtil_js_1.default.maxHue
                        ? GenericsUtil_js_1.default.maxHue
                        : h;
            let rgb = ParserUtil_js_1.default.parseHSLToRGBA(...hsl);
            if (!rgb)
                return;
            let [r, g, b] = rgb;
            this.setRed(r);
            this.setGreen(g);
            this.setBlue(b);
        };
        this.setSaturation = (s) => {
            if (!s && s !== 0)
                return;
            let hsl = ParserUtil_js_1.default.parseRGBAToHSL(this.getRed(), this.getGreen(), this.getBlue());
            hsl[1] =
                s && s < GenericsUtil_js_1.default.zero
                    ? GenericsUtil_js_1.default.zero
                    : s && s > GenericsUtil_js_1.default.maxDecimalPercentage
                        ? GenericsUtil_js_1.default.maxDecimalPercentage
                        : s;
            let rgb = ParserUtil_js_1.default.parseHSLToRGBA(...hsl);
            if (!rgb)
                return;
            let [r, g, b] = rgb;
            this.setRed(r);
            this.setGreen(g);
            this.setBlue(b);
        };
        this.setLightness = (l) => {
            if (!l && l !== 0)
                return;
            let hsl = ParserUtil_js_1.default.parseRGBAToHSL(this.getRed(), this.getGreen(), this.getBlue());
            hsl[2] =
                l && l < GenericsUtil_js_1.default.zero
                    ? GenericsUtil_js_1.default.zero
                    : l && l > GenericsUtil_js_1.default.maxDecimalPercentage
                        ? GenericsUtil_js_1.default.maxDecimalPercentage
                        : l;
            let rgb = ParserUtil_js_1.default.parseHSLToRGBA(...hsl);
            if (!rgb)
                return;
            let [r, g, b] = rgb;
            this.setRed(r);
            this.setGreen(g);
            this.setBlue(b);
        };
        this.setValue = (v) => {
            if (!v && v !== 0)
                return;
            let hsv = ParserUtil_js_1.default.parseRGBAToHSV(this.getRed(), this.getGreen(), this.getBlue());
            hsv[2] =
                v && v < GenericsUtil_js_1.default.zero
                    ? GenericsUtil_js_1.default.zero
                    : v && v > GenericsUtil_js_1.default.maxDecimalPercentage
                        ? GenericsUtil_js_1.default.maxDecimalPercentage
                        : v;
            let rgb = ParserUtil_js_1.default.parseHSVToRGBA(...hsv);
            if (!rgb)
                return;
            let [r, g, b] = rgb;
            this.setRed(r);
            this.setGreen(g);
            this.setBlue(b);
        };
        //additional setters for transparency
        //TODO: setHexOpacity = (o) => {};
        this.setDecimalOpacity = (o) => {
            if (!o && o !== 0)
                return;
            this.a =
                o && o < GenericsUtil_js_1.default.zero
                    ? GenericsUtil_js_1.default.zero
                    : o && o > GenericsUtil_js_1.default.maxDecimalPercentage
                        ? GenericsUtil_js_1.default.maxDecimalPercentage
                        : GenericsUtil_js_1.default.roundNumberToInfinity(o, this.precision.opacity);
        };
        this.setIntOpacity = (o) => {
            if (!o && o !== 0)
                return;
            o =
                o && o < GenericsUtil_js_1.default.zero
                    ? GenericsUtil_js_1.default.zero
                    : o && o > GenericsUtil_js_1.default.maxIntPercentage
                        ? GenericsUtil_js_1.default.maxIntPercentage
                        : o;
            this.setDecimalOpacity(o);
        };
        /**
         * Parsers
         */
        //hex
        this.toHexIntValue = () => {
            return GenericsUtil_js_1.default.convertHexStringToIntValue(ParserUtil_js_1.default.parseRGBAToHex(this.getRed(), this.getGreen(), this.getBlue(), this.getDecimalOpacity()));
        };
        this.toHexArray = () => {
            return GenericsUtil_js_1.default.__convertHexToArray(ParserUtil_js_1.default.parseRGBAToHex(this.getRed(), this.getGreen(), this.getBlue(), this.getDecimalOpacity()));
        };
        this.toHexCSSString = () => {
            let hex = ParserUtil_js_1.default.parseRGBAToHex(this.getRed(), this.getGreen(), this.getBlue(), this.getDecimalOpacity());
            return CSSUtil_js_1.default.toHexCSSString(hex);
        };
        //rgba
        this.toRGBArray = () => {
            return [this.getRed(), this.getGreen(), this.getBlue()];
        };
        this.toRGBCSSString = () => {
            return CSSUtil_js_1.default.toRGBCSSString(this.getRed(), this.getGreen(), this.getBlue());
        };
        this.toRGBAArray = () => {
            return [
                this.getRed(),
                this.getGreen(),
                this.getBlue(),
                this.getDecimalOpacity(),
            ];
        };
        this.toRGBACSSString = () => {
            return CSSUtil_js_1.default.toRGBACSSString(this.getRed(), this.getGreen(), this.getBlue(), this.getDecimalOpacity());
        };
        //cmyk
        this.toCMYKArray = () => {
            return ParserUtil_js_1.default.parseRGBAToCMYK(this.getRed(), this.getGreen(), this.getBlue()).map((e) => GenericsUtil_js_1.default.roundNumberToInfinity(e, this.precision.cmyk));
        };
        this.toCMYKCSSString = () => {
            let cmyk = ParserUtil_js_1.default.parseRGBAToCMYK(this.getRed(), this.getGreen(), this.getBlue()).map((e) => GenericsUtil_js_1.default.roundNumberToInfinity(e, this.precision.cmyk));
            return CSSUtil_js_1.default.toCMYKCSSString(...cmyk);
        };
        //hsl
        this.toHSLArray = () => {
            return ParserUtil_js_1.default.parseRGBAToHSL(this.getRed(), this.getGreen(), this.getBlue()).map((e, i) => i === 0
                ? GenericsUtil_js_1.default.roundNumberToInfinity(e, this.precision.hsl - 2)
                : GenericsUtil_js_1.default.roundNumberToInfinity(e, this.precision.hsl));
        };
        this.toHSLCSSString = () => {
            let hsl = ParserUtil_js_1.default.parseRGBAToHSL(this.getRed(), this.getGreen(), this.getBlue()).map((e, i) => i === 0
                ? GenericsUtil_js_1.default.roundNumberToInfinity(e, this.precision.hsl - 2)
                : GenericsUtil_js_1.default.roundNumberToInfinity(e, this.precision.hsl));
            return CSSUtil_js_1.default.toHSLCSSString(...hsl);
        };
        //hsv
        this.toHSVArray = () => {
            return ParserUtil_js_1.default.parseRGBAToHSV(this.getRed(), this.getGreen(), this.getBlue()).map((e, i) => i === 0
                ? GenericsUtil_js_1.default.roundNumberToInfinity(e, this.precision.hsv - 2)
                : GenericsUtil_js_1.default.roundNumberToInfinity(e, this.precision.hsv));
        };
        this.toHSVCSSString = () => {
            let hsv = ParserUtil_js_1.default.parseRGBAToHSV(this.getRed(), this.getGreen(), this.getBlue()).map((e, i) => i === 0
                ? GenericsUtil_js_1.default.roundNumberToInfinity(e, this.precision.hsv - 2)
                : GenericsUtil_js_1.default.roundNumberToInfinity(e, this.precision.hsv));
            return CSSUtil_js_1.default.toHSVCSSString(...hsv);
        };
        //additional toCSSString for opacity
        this.toOpacityCSSString = () => {
            return this.getDecimalOpacity();
        };
        /**
         * Copy color
         */
        this.copy = () => {
            return new Color(this.getRed(), this.getGreen(), this.getBlue(), this.getDecimalOpacity());
        };
        this.toString = () => {
            let hex = ParserUtil_js_1.default.parseRGBAToHex(this.getRed(), this.getGreen(), this.getBlue(), this.getDecimalOpacity()), cmyk = ParserUtil_js_1.default.parseRGBAToCMYK(this.getRed(), this.getGreen(), this.getBlue(), this.getDecimalOpacity()), hsl = ParserUtil_js_1.default.parseRGBAToHSL(this.getRed(), this.getGreen(), this.getBlue(), this.getDecimalOpacity()), hsv = ParserUtil_js_1.default.parseRGBAToHSV(this.getRed(), this.getGreen(), this.getBlue(), this.getDecimalOpacity());
            return `{hex: ${hex}, rgb: [${this.getRed()},
        ${this.getGreen()},
        ${this.getBlue()}], rgba: [${this.getRed()},
        ${this.getGreen()},
        ${this.getBlue()}, ${this.getDecimalOpacity()}], cmyk: ${cmyk}, hsl: ${hsl}, hsv: ${hsv}}`;
        };
        let rgba = [r, g, b, a];
        let errMsg = `The given values ${rgba} are not valid color values. Read the documentation do find out more.`;
        if (!GenericsUtil_js_1.default.isRGBAArray(rgba))
            throw new Error(errMsg);
        this.r = GenericsUtil_js_1.default.roundNumberToInfinity(r, this.precision.rgb);
        this.g = GenericsUtil_js_1.default.roundNumberToInfinity(g, this.precision.rgb);
        this.b = GenericsUtil_js_1.default.roundNumberToInfinity(b, this.precision.rgb);
        this.a = GenericsUtil_js_1.default.roundNumberToInfinity(a, this.precision.rgb);
    }
}
exports.default = Color;
//# sourceMappingURL=Color.js.map