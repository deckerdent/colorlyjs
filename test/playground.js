/**
 * this script is for random testing
 *
 * @author  deckerdent
 * @since   20220416
 */

import ColorFactory from "../src/ColorFactory.js";

//initializing color

console.log(
  "############## initializing color from hex string #445e87 ##################"
);

const color = ColorFactory.createColorFromHex("#445E87");

console.log("hexArr", color.toHexArray());
console.log("hexStr", color.toHexCSSString());

console.log("rgbArr", color.toRGBArray());
console.log("rgbStr", color.toRGBCSSString());
console.log("rgbaArr", color.toRGBAArray());
console.log("rgbStr", color.toRGBACSSString());

console.log("cymkArr", color.toCYMKArray());
console.log("cymkStr", color.toCYMKCSSString());

console.log("hslArr", color.toHSLArray());
console.log("hslStr", color.toHSLSSString());

console.log("hsvArr", color.toHSVArray());
console.log("hsvStr", color.toHSVCSSString());

console.log("r", color.getRed());
console.log("g", color.getBlue());
console.log("b", color.getGreen());

console.log("c", color.getCyan());
console.log("y", color.getYellow());
console.log("m", color.getMagenta());
console.log("k", color.getBlack());

console.log("hue", color.getHue());
console.log("sat", color.getSaturation());
console.log("light", color.getLightness());
console.log("val", color.getValue());

console.log("intOp", color.getIntOpacity());
console.log("decOp", color.getDecimalOpacity());

//adding values

console.log("############## adding values ##################");

console.log("addRed", color.addRed(10));
console.log("r", color.getRed());
console.log("hexStr", color.toHexCSSString());
console.log("rgbStr", color.toRGBCSSString());
console.log("rgbStr", color.toRGBACSSString());
console.log("cymkStr", color.toCYMKCSSString());
console.log("hslStr", color.toHSLSSString());
console.log("hsvStr", color.toHSVCSSString());

console.log("addBlue", color.addBlue(10));
console.log("g", color.getBlue());
console.log("hexStr", color.toHexCSSString());
console.log("rgbStr", color.toRGBCSSString());
console.log("rgbStr", color.toRGBACSSString());
console.log("cymkStr", color.toCYMKCSSString());
console.log("hslStr", color.toHSLSSString());
console.log("hsvStr", color.toHSVCSSString());

console.log("addGreen", color.addGreen(10));
console.log("b", color.getGreen());
console.log("hexStr", color.toHexCSSString());
console.log("rgbStr", color.toRGBCSSString());
console.log("rgbStr", color.toRGBACSSString());
console.log("cymkStr", color.toCYMKCSSString());
console.log("hslStr", color.toHSLSSString());
console.log("hsvStr", color.toHSVCSSString());

console.log("addCyan", color.addCyan(0.2));
console.log("c", color.getCyan());
console.log("hexStr", color.toHexCSSString());
console.log("rgbStr", color.toRGBCSSString());
console.log("rgbStr", color.toRGBACSSString());
console.log("cymkStr", color.toCYMKCSSString());
console.log("hslStr", color.toHSLSSString());
console.log("hsvStr", color.toHSVCSSString());

console.log("addYello", color.addYellow(0.2));
console.log("y", color.getYellow());
console.log("hexStr", color.toHexCSSString());
console.log("rgbStr", color.toRGBCSSString());
console.log("rgbStr", color.toRGBACSSString());
console.log("cymkStr", color.toCYMKCSSString());
console.log("hslStr", color.toHSLSSString());
console.log("hsvStr", color.toHSVCSSString());

console.log("addMagenta", color.add(0.2));
console.log("m", color.getMagenta());
console.log("hexStr", color.toHexCSSString());
console.log("rgbStr", color.toRGBCSSString());
console.log("rgbStr", color.toRGBACSSString());
console.log("cymkStr", color.toCYMKCSSString());
console.log("hslStr", color.toHSLSSString());
console.log("hsvStr", color.toHSVCSSString());

console.log("addBlack", color.add(0.2));
console.log("k", color.getBlack());
console.log("hexStr", color.toHexCSSString());
console.log("rgbStr", color.toRGBCSSString());
console.log("rgbStr", color.toRGBACSSString());
console.log("cymkStr", color.toCYMKCSSString());
console.log("hslStr", color.toHSLSSString());
console.log("hsvStr", color.toHSVCSSString());

console.log("addHue", color.addHue(10));
console.log("hue", color.getHue());
console.log("hexStr", color.toHexCSSString());
console.log("rgbStr", color.toRGBCSSString());
console.log("rgbStr", color.toRGBACSSString());
console.log("cymkStr", color.toCYMKCSSString());
console.log("hslStr", color.toHSLSSString());
console.log("hsvStr", color.toHSVCSSString());

console.log("addSaturation", color.addSaturation(0.2));
console.log("sat", color.getSaturation());
console.log("hexStr", color.toHexCSSString());
console.log("rgbStr", color.toRGBCSSString());
console.log("rgbStr", color.toRGBACSSString());
console.log("cymkStr", color.toCYMKCSSString());
console.log("hslStr", color.toHSLSSString());
console.log("hsvStr", color.toHSVCSSString());

console.log("addLightness", color.addLightness(0.2));
console.log("light", color.getLightness());
console.log("hexStr", color.toHexCSSString());
console.log("rgbStr", color.toRGBCSSString());
console.log("rgbStr", color.toRGBACSSString());
console.log("cymkStr", color.toCYMKCSSString());
console.log("hslStr", color.toHSLSSString());
console.log("hsvStr", color.toHSVCSSString());

console.log("addValue", color.addValue(0.2));
console.log("val", color.getValue());
console.log("hexStr", color.toHexCSSString());
console.log("rgbStr", color.toRGBCSSString());
console.log("rgbStr", color.toRGBACSSString());
console.log("cymkStr", color.toCYMKCSSString());
console.log("hslStr", color.toHSLSSString());
console.log("hsvStr", color.toHSVCSSString());

console.log("addOpacity", color.addDecimalOpacity(-0.1));
console.log("addOpacity", color.addIntOpacity(-5));
console.log("intOp", color.getIntOpacity());
console.log("decOp", color.getDecimalOpacity());

console.log("hexArr", color.toHexArray());
console.log("hexStr", color.toHexCSSString());

console.log("rgbArr", color.toRGBArray());
console.log("rgbStr", color.toRGBCSSString());
console.log("rgbaArr", color.toRGBAArray());
console.log("rgbStr", color.toRGBACSSString());

console.log("cymkArr", color.toCYMKArray());
console.log("cymkStr", color.toCYMKCSSString());

console.log("hslArr", color.toHSLArray());
console.log("hslStr", color.toHSLSSString());

console.log("hsvArr", color.toHSVArray());
console.log("hsvStr", color.toHSVCSSString());

console.log("r", color.getRed());
console.log("g", color.getBlue());
console.log("b", color.getGreen());

console.log("c", color.getCyan());
console.log("y", color.getYellow());
console.log("m", color.getMagenta());
console.log("k", color.getBlack());

console.log("hue", color.getHue());
console.log("sat", color.getSaturation());
console.log("light", color.getLightness());
console.log("val", color.getValue());

console.log("intOp", color.getIntOpacity());
console.log("decOp", color.getDecimalOpacity());
