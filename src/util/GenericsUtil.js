/**
 * @author DeckerM7
 * @since 20220411
 */

class GenericsUtil {
  static maxRGB = 255;

  static maxDecimalPercentage = 1;
  static maxIntPercentage = 100;

  static validArrayLength = [3, 4];

  static standardHue = 60;
  static maxHue = 360;

  static hex = 16;
  static hexPrefix = "#";
  static validHexLength = [3, 6, 8];
  static hexNoTransparency = "FF";

  static zero = 0;

  /**
   * hex
   */

  /**
   * If the parameter provided is a eight digit hexadecimal value
   * the opacity value will be returned. If it's a shorter hexadecimal
   * value the 100% opacity value FF will be returned.
   * If the parameter is not a valid hexadecimal value undefined is returned.
   *
   * @param {*} param
   * @returns a two digit hexadecimal value as a string
   */
  static getHexTransparency = (param) => {
    if (!GenericsUtil.isHexValue(param)) return;
    param = GenericsUtil.convertToHarmonizedHexValue(param);

    return GenericsUtil.isEigthDigitHexValue(param)
      ? GenericsUtil.__convertHexToArray(param)[3]
      : GenericsUtil.hexNoTransparency;
  };

  /**
   * converts a valid number or string into a standardised
   * hexadecimal equivalent
   * @param {*} param
   * @returns a hex string without leading #, uppercase
   */
  static convertToHarmonizedHexValue = (param) => {
    if (!GenericsUtil.isHexValue(param)) return;

    if (GenericsUtil.isHexIntValue(param))
      param = GenericsUtil.convertHexIntValueToString(param);

    param = GenericsUtil.__removeLeadingHashtag(param).toUpperCase();
    /*if (GenericsUtil.isThreeDigitHexValue(param))
      param = GenericsUtil.__fillThreeDigitHexString(param);*/

    return param;
  };

  /**
   * Converts a numeric value into a hexadecimal string
   * @param {*} param
   * @returns a hexadecimal string
   */
  static convertHexIntValueToString = (param) => {
    if (!GenericsUtil.__isNumeric(param)) return;

    param = param.toString(GenericsUtil.hex).toUpperCase();
    return GenericsUtil.isHexString(param) ? param : undefined;
  };

  /**
   * Converts a hexadecimal string to a numeric value
   * @param {*} param
   * @returns a numeric value
   */
  static convertHexStringToIntValue = (param) => {
    if (!GenericsUtil.isHexString(param)) return;

    return parseInt(
      GenericsUtil.__removeLeadingHashtag(param),
      GenericsUtil.hex
    );
  };

  /**
   * Checks if the given parameter is a valid hex value
   * valid hexValues are either strings in the following formats:
   * 1. eigth digits with values from 0-9 and a-f, case insensitive
   * 2. six digits with values from 0-9 and a-f, case insensitive
   * 3. three digits with values from 0-9 and a-f, case insensitive
   * 4. one of the above with a leading #
   * or numeric values whichs hex representation meets the requirements
   * above
   * @param {*} param
   * @returns
   */
  static isHexValue = (param) => {
    return GenericsUtil.isHexString(param) || GenericsUtil.isHexIntValue(param);
  };

  /**
   * Tests if the given numeric or string parameter is a three digit hex code
   * @param {*} param
   * @returns true if the param is representable by a three digit hex code
   */
  static isThreeDigitHexValue = (param) => {
    if (!GenericsUtil.isHexValue(param)) return false;
    if (GenericsUtil.isHexIntValue(param))
      param = GenericsUtil.convertHexIntValueToString(param);
    return (
      GenericsUtil.__getHexRegex(GenericsUtil.validHexLength[0]).test(param) ||
      GenericsUtil.__getHexRegexWithPrefix(GenericsUtil.validHexLength[0]).test(
        param
      )
    );
  };

  /**
   * Tests if the given numeric or string parameter is a six digit hex code
   * @param {*} param
   * @returns true if the param is representable by a six digit hex code
   */
  static isSixDigitHexValue = (param) => {
    if (!GenericsUtil.isHexValue(param)) return false;
    if (GenericsUtil.isHexIntValue(param))
      param = GenericsUtil.convertHexIntValueToString(param);

    return (
      GenericsUtil.__getHexRegex(GenericsUtil.validHexLength[1]).test(param) ||
      GenericsUtil.__getHexRegexWithPrefix(GenericsUtil.validHexLength[1]).test(
        param
      )
    );
  };

  /**
   * Tests if the given numeric or string parameter is a eight digit hex code
   * @param {*} param
   * @returns true if the param is representable by a eight digit hex code
   */
  static isEigthDigitHexValue = (param) => {
    if (!GenericsUtil.isHexValue(param)) return false;
    if (GenericsUtil.isHexIntValue(param))
      param = GenericsUtil.convertHexIntValueToString(param);
    return (
      GenericsUtil.__getHexRegex(GenericsUtil.validHexLength[2]).test(param) ||
      GenericsUtil.__getHexRegexWithPrefix(GenericsUtil.validHexLength[2]).test(
        param
      )
    );
  };

  /**
   * Tests a String for being a hex string
   * @param {*} param
   * @returns true if the given string matches the hex code requirements
   */
  static isHexString = (param) => {
    return (
      GenericsUtil.__isString(param) &&
      GenericsUtil.validHexLength.some(
        (e) =>
          GenericsUtil.__getHexRegex(e).test(param) ||
          GenericsUtil.__getHexRegexWithPrefix(e).test(param)
      )
    );
  };

  /**
   * tests a numeric value for being a valid hex equivalent
   * @param {*} param
   * @returns true if the provided numeric value is valid hex
   */
  static isHexIntValue = (param) => {
    return (
      GenericsUtil.__isNumeric(param) &&
      GenericsUtil.isHexString(GenericsUtil.convertHexIntValueToString(param))
    );
  };

  /**
   * Tests a string or numeric value against the eight digit hex pattern
   * @param {*} param
   * @returns true if the given numeric or string hex value has transparency value
   */
  static isHexWithTransparency = (param) => {
    if (!GenericsUtil.isHexValue(param)) return false;
    if (GenericsUtil.isHexIntValue(param))
      param = GenericsUtil.convertHexIntValueToString(param);

    return GenericsUtil.isEigthDigitHexValue(param);
  };

  /**
   * Converts a three digit hex string into a six digit hex string
   * @param {*} param
   * @returns a six digit equivalent hex string
   */
  static __fillThreeDigitHexString = (param) => {
    if (!GenericsUtil.isHexValue(param)) return;
    if (!GenericsUtil.isThreeDigitHexValue(param)) return param;

    return param
      .split(GenericsUtil.__getHexRegex(1))
      .map((e) => {
        return `${e}${e}`;
      })
      .join("");
  };

  /**
   * Converts a Hex Value to an array of 3 or 4 elements depending
   * on the lenght of the hex value. The Array represents hex encoded
   * RGB or RGBA. E.g.
   * ["A", "B", "C"] => for three digit hex values
   * ["AA", "BB", "CC"] => for 6 digit hex values
   * ["AA", "BB", "CC", "DD"] => for 8 digit hex values
   * @param {*} param
   * @returns an array
   */
  static __convertHexToArray = (param) => {
    if (!GenericsUtil.isHexValue(param)) return;
    if (GenericsUtil.isHexIntValue(param))
      param = GenericsUtil.convertHexIntValueToString(param);

    let conversionObjectLiteral = {
      3: GenericsUtil.__convertThreeDigitHexToArray,
      6: GenericsUtil.__convertSixOrEightDigitHexToArray,
      8: GenericsUtil.__convertSixOrEightDigitHexToArray,
    };
    param = GenericsUtil.__removeLeadingHashtag(param);

    return conversionObjectLiteral[param.length](param);
  };

  static __convertThreeDigitHexToArray = (param) => {
    if (!GenericsUtil.isHexValue(param)) return;
    let arr = GenericsUtil.__splitHexString(param, 1);
    arr = arr.map((e) => `${e}${e}`);
    return arr;
  };

  static __convertSixOrEightDigitHexToArray = (param) => {
    if (!GenericsUtil.isHexValue(param)) return;
    return GenericsUtil.__splitHexString(param, 2);
  };

  static __splitHexString = (hexString, digits) => {
    if (!GenericsUtil.isHexValue(hexString)) return;
    return hexString.match(new RegExp(`[0-9a-fA-F]{${digits}}`, "gi"));
  };

  static __removeLeadingHashtag = (param) => {
    if (!GenericsUtil.isHexValue(param)) return;

    return param.replace(GenericsUtil.hexPrefix, "").toUpperCase();
  };

  /**
   * returns a regex for a hex color which is not prefixed with #
   * and as a certain amount of digits
   * @param {*} digits
   * @returns
   */
  static __getHexRegex = (digits) => {
    return new RegExp(`^[0-9a-fA-F]{${digits}}$`, "gi");
  };

  /**
   * returns a regex for a hex color which is prefixed with #
   * and as a certain amount of digits
   * @param {*} digits
   * @returns
   */
  static __getHexRegexWithPrefix = (digits) => {
    return new RegExp(
      `^${GenericsUtil.hexPrefix}[0-9a-fA-F]{${digits}}$`,
      "gi"
    );
  };

  /**
   * rgba
   */
  //calculations
  static getValueFromRGBA = (r = 255, g = 255, b = 255) => {
    let rgb = [r, g, b];
    if (!GenericsUtil.isRGBArray(rgb)) return;

    rgb = GenericsUtil.normalizeRGBArray(rgb);
    let v = Math.max(...rgb);

    return v;
  };

  static getSaturationFromRGBA = (r = 255, g = 255, b = 255) => {
    let rgb = [r, g, b];
    if (!GenericsUtil.isRGBArray(rgb)) return;

    let l = GenericsUtil.getLuminosityFromRGBA(...rgb);
    rgb = GenericsUtil.normalizeRGBArray(rgb);

    if (Math.min(...rgb) === 1) return 1;
    if (l === 1 || Math.max(...rgb) === 0) return 0;

    return (Math.max(...rgb) - Math.min(...rgb)) / (1 - Math.abs(2 * l - 1));
  };

  static getHueFromRGBA = (r = 255, g = 255, b = 255) => {
    let rgb = [r, g, b];
    if (!GenericsUtil.isRGBArray(rgb)) return;

    rgb = GenericsUtil.normalizeRGBArray(rgb);

    let h = GenericsUtil.standardHue;

    if (rgb[0] >= rgb[1] && rgb[1] >= rgb[2]) {
      h = h * ((rgb[1] - rgb[2]) / (rgb[0] - rgb[2]));
    } else if (rgb[1] > rgb[0] && rgb[0] >= rgb[2]) {
      h = h * (2 - (rgb[0] - rgb[2]) / (rgb[1] - rgb[2]));
    } else if (rgb[1] >= rgb[2] && rgb[2] > rgb[0]) {
      h = h * (2 + (rgb[2] - rgb[0]) / (rgb[1] - rgb[0]));
    } else if (rgb[2] > rgb[1] && rgb[1] > rgb[0]) {
      h = h * (4 - (rgb[1] - rgb[0]) / (rgb[2] - rgb[0]));
    } else if (rgb[2] > rgb[0] && rgb[0] >= rgb[1]) {
      h = h * (4 + (rgb[0] - rgb[1]) / (rgb[2] - rgb[1]));
    } else if (rgb[0] >= rgb[2] && rgb[2] > rgb[1]) {
      h = h * (6 - (rgb[2] - rgb[1]) / (rgb[0] - rgb[1]));
    } else {
      h = 0;
    }

    return h === null || isNaN(h) || h === undefined ? 0 : h;
  };

  static getLuminosityFromRGBA = (r = 255, g = 255, b = 255) => {
    let rgb = [r, g, b];
    if (!GenericsUtil.isRGBArray(rgb)) return;

    rgb = GenericsUtil.normalizeRGBArray(rgb);

    return 0.5 * (Math.max(...rgb) + Math.min(...rgb));
  };

  static normalizeRGBArray = (param) => {
    if (!GenericsUtil.isRGBArray(param)) return;

    return param.map((e) => GenericsUtil.normalizeRGBValue(e));
  };

  static normalizeRGBAArray = (param) => {
    if (!GenericsUtil.isRGBAArray(param)) return;

    return param.map((e, i) =>
      i < GenericsUtil.validArrayLength[0]
        ? GenericsUtil.normalizeRGBValue(e)
        : e
    );
  };

  static normalizeRGBValue = (param) => {
    if (!GenericsUtil.isRGBValue(param)) return;

    return param / GenericsUtil.maxRGB;
  };

  static getValueFromNormalizedRGBValue = (param) => {
    if (!GenericsUtil.isNormalizedRGBValue(param)) return;

    return param * GenericsUtil.maxRGB;
  };

  // checkers
  /**
   * Returns true if param is a number between 0 and 255
   * @param {*} param
   * @returns boolean
   */
  static isRGBValue = (param) => {
    return param <= GenericsUtil.maxRGB && param >= GenericsUtil.zero;
  };

  /**
   * Returns true if param is a number between 0 and 1
   * @param {*} param
   * @returns boolean
   */
  static isNormalizedRGBValue = (param) => {
    return GenericsUtil.isDecimalPercentage(param);
  };

  /**
   * Returns true if param is a number between 0 and 1
   * @param {*} param
   * @returns boolean
   */
  static isRGBAAlphaValue = (param) => {
    return GenericsUtil.isDecimalPercentage(param);
  };

  /**
   * Returns true if param is a three elements array with each element
   * being a number between 0 and 1
   * @param {*} param
   * @returns boolean
   */
  static isRGBArray = (param) => {
    return (
      GenericsUtil.isThreeElementsArray(param) &&
      param.every((e) => GenericsUtil.isRGBValue(e))
    );
  };

  /**
   * Returns true if param is a four elements array with
   * elements 1 - 3 are numbers between 0 and 255
   * and element 4 is a number between 0 and 1
   * @param {*} param
   * @returns boolean
   */
  static isRGBAArray = (param) => {
    return (
      GenericsUtil.isFourElementsArray(param) &&
      param.every(
        (e, i) =>
          (i < GenericsUtil.validArrayLength[0] &&
            GenericsUtil.isRGBValue(e)) ||
          GenericsUtil.isRGBAAlphaValue(e)
      )
    );
  };

  /**
   * cymk
   */

  /**
   * Returns true if param is a number between 0 and 1
   * @param {*} param
   * @returns boolean
   */
  static isCYMKValue = (param) => {
    return GenericsUtil.isDecimalPercentage(param);
  };

  /**
   * Returns true if param is a three elements array with each element
   * being a number between 0 and 1
   * @param {*} param
   * @returns boolean
   */
  static isCYMKArray = (param) => {
    return (
      GenericsUtil.isFourElementsArray(param) &&
      param.every((e) => GenericsUtil.isCYMKValue(e))
    );
  };

  /**
   * hsl
   */

  /**
   * Returns true if param is a number between 0 and 1
   * @param {*} param
   * @returns boolean
   */
  static isHSLValue = (param) => {
    return GenericsUtil.isDecimalPercentage(param);
  };

  /**
   * Returns true if param is a three elements array with each element
   * being a number between 0 and 1
   * @param {*} param
   * @returns boolean
   */
  static isHSLArray = (param) => {
    return (
      GenericsUtil.isThreeElementsArray(param) &&
      param.every((e, i) =>
        i === GenericsUtil.zero
          ? GenericsUtil.isHueValue(e)
          : GenericsUtil.isHSLValue(e)
      )
    );
  };

  /**
   * hsv
   */

  /**
   * Returns true if param is a number between 0 and 1
   * @param {*} param
   * @returns boolean
   */
  static isHSVValue = (param) => {
    return GenericsUtil.isDecimalPercentage(param);
  };

  static isHueValue = (param) => {
    GenericsUtil.__isNumeric(param);
    return (
      GenericsUtil.__isNumeric(param) &&
      param >= GenericsUtil.zero &&
      param <= GenericsUtil.maxHue
    );
  };

  /**
   * Returns true if param is a three elements array with each element
   * being a number betwenn 0 and 1
   * @param {*} param
   * @returns boolean
   */
  static isHSVArray = (param) => {
    return (
      GenericsUtil.isThreeElementsArray(param) &&
      param.every((e, i) =>
        i === GenericsUtil.zero
          ? GenericsUtil.isHueValue(e)
          : GenericsUtil.isHSVValue(e)
      )
    );
  };

  /**
   * Generics
   */

  /**
   * Returns true if param is a number between 0 and 1
   * @param {*} param
   * @returns boolean
   */
  static isDecimalPercentage = (param) => {
    return (
      GenericsUtil.__isNumeric(param) &&
      param <= GenericsUtil.maxDecimalPercentage &&
      param >= GenericsUtil.zero
    );
  };

  /**
   * Returns true if param is a number between 0 and 100
   * @param {*} param
   * @returns boolean
   */
  static isIntPercentage = (param) => {
    return (
      GenericsUtil.__isNumeric(param) &&
      param <= GenericsUtil.maxIntPercentage &&
      param >= GenericsUtil.zero
    );
  };

  /**
   * Returns true if param is an array or object with length four
   * @param {*} arr
   * @returns boolean
   */
  static isFourElementsArray = (arr) => {
    return (
      GenericsUtil.isObject(arr) &&
      arr.length === GenericsUtil.validArrayLength[1]
    );
  };

  /**
   * returns true if param is an array or object with length three
   * @param {*} arr
   * @returns boolean
   */
  static isThreeElementsArray = (arr) => {
    return (
      GenericsUtil.isObject(arr) &&
      arr.length === GenericsUtil.validArrayLength[0]
    );
  };

  /**
   * Returns true if param is a array or object
   * @param {*} param
   * @returns boolean
   */
  static isObject = (param) => {
    return typeof param === "object";
  };

  /**
   * Returns true if param is either a number or a string
   * @param {*} param
   * @returns boolean
   */
  static isNumberOrString = (param) => {
    return GenericsUtil.__isNumeric(param) || GenericsUtil.____isString(param);
  };

  /**
   * Returns true if param is a number
   * @param {*} param
   * @returns boolean
   */
  static __isNumeric = (param) => {
    return typeof param === "number";
  };

  /**
   * Returns true if param is a string
   * @param {*} param
   * @returns boolean
   */
  static __isString = (param) => {
    return typeof param === "string";
  };
}

export default GenericsUtil;
