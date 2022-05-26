/**
 * @author DeckerM7
 * @since 20220411
 */
import GenericsUtil from "../util/GenericsUtil.js";
import ParserUtil from "../util/ParserUtil.js";
import CSSUtil from "../util/CSSUtil.js";

interface IColor {
    addRed: (additive: number) => void
    addGreen: (additive: number) => void
    addBlue: (additive: number) => void
    addCyan: (additive: number) => void
    addYellow: (additive: number) => void
    addMagenta: (additive: number) => void
    addBlack: (additive: number) => void
    addHue: (additive: number) => void
    addSaturation: (additive: number) => void
    addLightness: (additive: number) => void
    addValue: (additive: number) => void
    addDecimalOpacity: (additive: number) => void
    addIntOpacity: (additive: number) => void
    getRed: () => number
    getGreen: () => number
    getBlue: () => number
    getCyan: () => number
    getYellow: () => number
    getMagenta: () => number
    getBlack: () => number
    getHue: () => number
    getSaturation: () => number
    getLightness: () => number
    getValue: () => number
    getDecimalOpacity: () => number
    getIntOpacity: () => number
    setRed: (val: number) => void
    setGreen: (val: number) => void
    setBlue: (val: number) => void
    setCyan: (val: number) => void
    setYellow: (val: number) => void
    setMagenta: (val: number) => void
    setBlack: (val: number) => void
    setHue: (val: number) => void
    setSaturation: (val: number) => void
    setLightness: (val: number) => void
    setValue: (val: number) => void
    setDecimalOpacity: (val: number) => void
    setIntOpacity: (val: number) => void
}

class Color implements IColor {
    r;
    g;
    b;
    a;

    precision = {
        rgb: 0,
        cmyk: 2,
        hsl: 2,
        hsv: 2,
        opacity: 2,
    };

    constructor(r = 255, g = 255, b = 255, a = 1) {
        let rgba = [r, g, b, a];
        let errMsg = `The given values ${rgba} are not valid color values. Read the documentation do find out more.`;
        if (!GenericsUtil.isRGBAArray(rgba)) throw new Error(errMsg);

        this.r = GenericsUtil.roundNumberToInfinity(r, this.precision.rgb);
        this.g = GenericsUtil.roundNumberToInfinity(g, this.precision.rgb);
        this.b = GenericsUtil.roundNumberToInfinity(b, this.precision.rgb);
        this.a = GenericsUtil.roundNumberToInfinity(a, this.precision.rgb);
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
        this.setRed(r + this.getRed());
    };

    addGreen = (g) => {
        this.setGreen(g + this.getGreen());
    };

    addBlue = (b) => {
        this.setBlue(b + this.getBlue());
    };
    //cmyk
    addCyan = (c) => {
        let cmyk = ParserUtil.parseRGBAToCMYK(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );

        this.setCyan(cmyk[0] + c);
    };

    addYellow = (y) => {
        let cmyk = ParserUtil.parseRGBAToCMYK(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );

        this.setYellow(cmyk[2] + y);
    };
    addMagenta = (m) => {
        let cmyk = ParserUtil.parseRGBAToCMYK(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );

        this.setMagenta(cmyk[1] + m);
    };
    addBlack = (k) => {
        let cmyk = ParserUtil.parseRGBAToCMYK(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );

        this.setBlack(cmyk[3] + k);
    };
    //hsl, hsv
    addHue = (h) => {
        let hsl = ParserUtil.parseRGBAToHSL(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );

        this.setHue(hsl[0] + h);
    };

    addSaturation = (s) => {
        let hsl = ParserUtil.parseRGBAToHSL(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );

        this.setSaturation(hsl[1] + s);
    };

    addLightness = (l) => {
        let hsl = ParserUtil.parseRGBAToHSL(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );

        this.setLightness(hsl[2] + l);
    };

    addValue = (v) => {
        let hsv = ParserUtil.parseRGBAToHSV(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );

        this.setValue(hsv[2] + v);
    };

    //additional adders for transparency
    //TODO: addHexOpacity = (o) => {};
    addDecimalOpacity = (o) => {
        this.setDecimalOpacity(o + this.getDecimalOpacity());
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
        let [c, m, y, k] = ParserUtil.parseRGBAToCMYK(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );
        return c;
    };

    getYellow = () => {
        let [c, m, y, k] = ParserUtil.parseRGBAToCMYK(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );
        return y;
    };

    getMagenta = () => {
        let [c, m, y, k] = ParserUtil.parseRGBAToCMYK(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );
        return m;
    };

    getBlack = () => {
        let [c, m, y, k] = ParserUtil.parseRGBAToCMYK(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );
        return k;
    };
    //hsl, hsv
    getHue = () => {
        return GenericsUtil.getHueFromRGBA(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );
    };

    getSaturation = () => {
        return GenericsUtil.getSaturationFromRGBA(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );
    };

    getLightness = () => {
        return GenericsUtil.getLuminosityFromRGBA(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );
    };

    getValue = () => {
        return GenericsUtil.getValueFromRGBA(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );
    };

    //additional getters for transparency
    //TODO: getHexOpacity = () => {};
    getDecimalOpacity = () => {
        return this.a;
    };

    getIntOpacity = () => {
        return this.getDecimalOpacity() * GenericsUtil.maxIntPercentage;
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
        if (!r && r !== 0) return;
        this.r =
            r && r < GenericsUtil.zero
                ? GenericsUtil.zero
                : r && r > GenericsUtil.maxRGB
                    ? GenericsUtil.maxRGB
                    : GenericsUtil.roundNumberToInfinity(r, this.precision.rgb);
    };

    setGreen = (g) => {
        if (!g && g !== 0) return;
        this.g =
            g && g < GenericsUtil.zero
                ? GenericsUtil.zero
                : g && g > GenericsUtil.maxRGB
                    ? GenericsUtil.maxRGB
                    : GenericsUtil.roundNumberToInfinity(g, this.precision.rgb);
    };

    setBlue = (b) => {
        if (!b && b !== 0) return;
        this.b =
            b && b < GenericsUtil.zero
                ? GenericsUtil.zero
                : b && b > GenericsUtil.maxRGB
                    ? GenericsUtil.maxRGB
                    : GenericsUtil.roundNumberToInfinity(b, this.precision.rgb);
    };

    //cmyk
    setCyan = (c) => {
        if (!c && c !== 0) return;
        let cmyk = ParserUtil.parseRGBAToCMYK(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );

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
        if (!y && y !== 0) return;
        let cmyk = ParserUtil.parseRGBAToCMYK(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );

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
        if (!m && m !== 0) return;
        let cmyk = ParserUtil.parseRGBAToCMYK(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );

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
        if (!k && k !== 0) return;
        let cmyk = ParserUtil.parseRGBAToCMYK(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );

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
        if (!h && h !== 0) return;
        let hsl = ParserUtil.parseRGBAToHSL(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );

        hsl[0] =
            h && h < GenericsUtil.zero
                ? GenericsUtil.zero
                : h && h > GenericsUtil.maxHue
                    ? GenericsUtil.maxHue
                    : h;

        let rgb = ParserUtil.parseHSLToRGBA(...hsl);
        if (!rgb) return;

        let [r, g, b] = rgb;
        this.setRed(r);
        this.setGreen(g);
        this.setBlue(b);
    };

    setSaturation = (s) => {
        if (!s && s !== 0) return;
        let hsl = ParserUtil.parseRGBAToHSL(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );

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
        if (!l && l !== 0) return;
        let hsl = ParserUtil.parseRGBAToHSL(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );

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
        if (!v && v !== 0) return;
        let hsv = ParserUtil.parseRGBAToHSV(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );

        hsv[2] =
            v && v < GenericsUtil.zero
                ? GenericsUtil.zero
                : v && v > GenericsUtil.maxDecimalPercentage
                    ? GenericsUtil.maxDecimalPercentage
                    : v;

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
        if (!o && o !== 0) return;
        this.a =
            o && o < GenericsUtil.zero
                ? GenericsUtil.zero
                : o && o > GenericsUtil.maxDecimalPercentage
                    ? GenericsUtil.maxDecimalPercentage
                    : GenericsUtil.roundNumberToInfinity(o, this.precision.opacity);
    };

    setIntOpacity = (o) => {
        if (!o && o !== 0) return;
        o =
            o && o < GenericsUtil.zero
                ? GenericsUtil.zero
                : o && o > GenericsUtil.maxIntPercentage
                    ? GenericsUtil.maxIntPercentage
                    : o;
        this.setDecimalOpacity(o);
    };

    /**
     * Parsers
     */
        //hex
    toHexIntValue = () => {
        return GenericsUtil.convertHexStringToIntValue(
            ParserUtil.parseRGBAToHex(
                this.getRed(),
                this.getGreen(),
                this.getBlue(),
                this.getDecimalOpacity()
            )
        );
    };

    toHexArray = () => {
        return GenericsUtil.__convertHexToArray(
            ParserUtil.parseRGBAToHex(
                this.getRed(),
                this.getGreen(),
                this.getBlue(),
                this.getDecimalOpacity()
            )
        );
    };

    toHexCSSString = () => {
        let hex = ParserUtil.parseRGBAToHex(
            this.getRed(),
            this.getGreen(),
            this.getBlue(),
            this.getDecimalOpacity()
        );
        return CSSUtil.toHexCSSString(hex);
    };
    //rgba
    toRGBArray = () => {
        return [this.getRed(), this.getGreen(), this.getBlue()];
    };
    toRGBCSSString = () => {
        return CSSUtil.toRGBCSSString(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        );
    };

    toRGBAArray = () => {
        return [
            this.getRed(),
            this.getGreen(),
            this.getBlue(),
            this.getDecimalOpacity(),
        ];
    };
    toRGBACSSString = () => {
        return CSSUtil.toRGBACSSString(
            this.getRed(),
            this.getGreen(),
            this.getBlue(),
            this.getDecimalOpacity()
        );
    };
    //cmyk
    toCMYKArray = () => {
        return ParserUtil.parseRGBAToCMYK(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        ).map((e) => GenericsUtil.roundNumberToInfinity(e, this.precision.cmyk));
    };

    toCMYKCSSString = () => {
        let cmyk = ParserUtil.parseRGBAToCMYK(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        ).map((e) => GenericsUtil.roundNumberToInfinity(e, this.precision.cmyk));
        return CSSUtil.toCMYKCSSString(...cmyk);
    };
    //hsl
    toHSLArray = () => {
        return ParserUtil.parseRGBAToHSL(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        ).map((e, i) =>
            i === 0
                ? GenericsUtil.roundNumberToInfinity(e, this.precision.hsl - 2)
                : GenericsUtil.roundNumberToInfinity(e, this.precision.hsl)
        );
    };

    toHSLCSSString = () => {
        let hsl = ParserUtil.parseRGBAToHSL(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        ).map((e, i) =>
            i === 0
                ? GenericsUtil.roundNumberToInfinity(e, this.precision.hsl - 2)
                : GenericsUtil.roundNumberToInfinity(e, this.precision.hsl)
        );
        return CSSUtil.toHSLCSSString(...hsl);
    };
    //hsv
    toHSVArray = () => {
        return ParserUtil.parseRGBAToHSV(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        ).map((e, i) =>
            i === 0
                ? GenericsUtil.roundNumberToInfinity(e, this.precision.hsv - 2)
                : GenericsUtil.roundNumberToInfinity(e, this.precision.hsv)
        );
    };
    toHSVCSSString = () => {
        let hsv = ParserUtil.parseRGBAToHSV(
            this.getRed(),
            this.getGreen(),
            this.getBlue()
        ).map((e, i) =>
            i === 0
                ? GenericsUtil.roundNumberToInfinity(e, this.precision.hsv - 2)
                : GenericsUtil.roundNumberToInfinity(e, this.precision.hsv)
        );
        return CSSUtil.toHSVCSSString(...hsv);
    };

    //additional toCSSString for opacity
    toOpacityCSSString = () => {
        return this.getDecimalOpacity();
    };

    /**
     * Copy color
     */
    copy = () => {
        return new Color(
            this.getRed(),
            this.getGreen(),
            this.getBlue(),
            this.getDecimalOpacity()
        );
    };

    toString = () => {
        let hex = ParserUtil.parseRGBAToHex(
                this.getRed(),
                this.getGreen(),
                this.getBlue(),
                this.getDecimalOpacity()
            ),
            cmyk = ParserUtil.parseRGBAToCMYK(
                this.getRed(),
                this.getGreen(),
                this.getBlue()
            ),
            hsl = ParserUtil.parseRGBAToHSL(
                this.getRed(),
                this.getGreen(),
                this.getBlue()
            ),
            hsv = ParserUtil.parseRGBAToHSV(
                this.getRed(),
                this.getGreen(),
                this.getBlue()
            );
        return `{hex: ${hex}, rgb: [${this.getRed()},
        ${this.getGreen()},
        ${this.getBlue()}], rgba: [${this.getRed()},
        ${this.getGreen()},
        ${this.getBlue()}, ${this.getDecimalOpacity()}], cmyk: ${cmyk}, hsl: ${hsl}, hsv: ${hsv}}`;
    };
}

export default Color;
