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
  static getHexTransparency = (param) => {
    if (!GenericsUtil.isHexValue(param)) return;
    param = GenericsUtil.convertToHarmonizedHexValue(param);

    return GenericsUtil.isEigthDigitHexValue(param)
      ? GenericsUtil.__convertHexToArray(param)[3]
      : GenericsUtil.hexNoTransparency;
  };

  static convertToHarmonizedHexValue = (param) => {
    if (!GenericsUtil.isHexValue(param)) return;

    if (GenericsUtil.isHexIntValue(param))
      param = GenericsUtil.convertHexIntValueToString(param);

    param = GenericsUtil.__removeLeadingHashtag(param).toUpperCase();

    if (GenericsUtil.isThreeDigitHexValue(param))
      param = GenericsUtil.__fillThreeDigitHexString(param);

    return param;
  };

  static convertHexIntValueToString = (param) => {
    if (!GenericsUtil.isNumber(param)) return;

    return param.toString(GenericsUtil.hex).toUpperCase();
  };

  static convertHexStringToIntValue = (param) => {
    if (!GenericsUtil.isString(param)) return;

    return parseInt(param, GenericsUtil.hex);
  };

  static isHexValue = (param) => {
    return GenericsUtil.isHexString(param) || GenericsUtil.isHexIntValue(param);
  };

  static isThreeDigitHexValue = (param) => {
    if (!GenericsUtil.isHexValue(param)) return;

    return GenericsUtil.__getHexRegex(GenericsUtil.validHexLength[0]).test(
      GenericsUtil.convertToHarmonizedHexValue(param)
    );
  };

  static isSixDigitHexValue = (param) => {
    if (!GenericsUtil.isHexValue(param)) return;

    return GenericsUtil.__getHexRegex(GenericsUtil.validHexLength[1]).test(
      GenericsUtil.convertToHarmonizedHexValue(param)
    );
  };

  static isEigthDigitHexValue = (param) => {
    if (!GenericsUtil.isHexValue(param)) return;

    return GenericsUtil.__getHexRegex(GenericsUtil.validHexLength[2]).test(
      GenericsUtil.convertToHarmonizedHexValue(param)
    );
  };

  static isHexString = (param) => {
    return (
      GenericsUtil.isString(param) &&
      GenericsUtil.validHexLength.some((e) =>
        GenericsUtil.__getHexRegex(e).test(param)
      )
    );
  };

  static isHexIntValue = (param) => {
    return (
      GenericsUtil.isNumber(param) &&
      GenericsUtil.isHexString(GenericsUtil.convertHexIntValueToString(param))
    );
  };

  static isHexWithTransparency = (param) => {
    if (!GenericsUtil.isHexValue(param)) return;
    param = GenericsUtil.convertToHarmonizedHexValue(param);

    return GenericsUtil.isEigthDigitHexValue(param);
  };

  static __fillThreeDigitHexString = (param) => {
    if (!GenericsUtil.isHexValue(param)) return;
    if (!GenericsUtil.isThreeDigitHexValue(param)) return param;

    return param
      .split(this.__getOnlyNumberRegex(1))
      .map((e) => {
        return `${e}${e}`;
      })
      .join("");
  };

  static __convertHexToArray = (param) => {
    if (!GenericsUtil.isHexValue(param)) return;

    param = GenericsUtil.convertToHarmonizedHexValue(param);
    return GenericsUtil.__convertSixOrEightDigitHexToArray(param);
  };

  static __convertThreeDigitHexToArray = (param) => {
    if (!GenericsUtil.isHexValue(param)) return;
    return param.matches(GenericsUtil.__getHexRegex(1));
  };

  static __convertSixOrEightDigitHexToArray = (param) => {
    if (!GenericsUtil.isHexValue(param)) return;
    return param.matches(GenericsUtil.__getHexRegex(2));
  };

  static __removeLeadingHashtag = (param) => {
    if (!GenericsUtil.isHexValue(param)) return;

    return param.replace(GenericsUtil.hexPrefix, "");
  };

  static __getHexRegex = (digits) => {
    return new RegExp(`/[0-9A-F]{${digits}}/gi`);
  };

  static __getHexRegexWithPrefix = (digits) => {
    return new RegExp(`/${GenericsUtil.hexPrefix}[0-9A-F]{${digits}}/gi`);
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

    rgb = GenericsUtil.normalizeRGBArray(rgb);

    let l = this.getLuminosityFromRGBA(rgb);

    if (l === 1) return 0;

    return (Math.max(...rgb) - Math.min(...rgb)) / (1 - Math.abs(2 * l - 1));
  };

  static getHueFromRGBA = (r = 255, g = 255, b = 255) => {
    let rgb = [r, g, b];
    if (!GenericsUtil.isRGBArray(rgb)) return;

    rgb = GenericsUtil.normalizeRGBArray(rgb);

    let h = GenericsUtil.standardHue;

    switch (rgb) {
      case rgb[0] >= rgb[1] && rgb[1] >= rgb[2]:
        h = h * ((rgb[1] - rgb[2]) / (rgb[0] - rgb[2]));
        break;

      case rgb[1] > rgb[0] && rgb[0] >= rgb[2]:
        h = h * (2 - (rgb[0] - rgb[2]) / (rgb[1] - rgb[2]));
        break;

      case rgb[1] >= rgb[2] && rgb[2] > rgb[0]:
        h = h * (2 + (rgb[2] - rgb[0]) / (rgb[1] - rgb[0]));
        break;

      case rgb[2] > rgb[1] && rgb[1] > rgb[0]:
        h = h * (4 - (rgb[1] - rgb[0]) / (rgb[2] - rgb[0]));
        break;

      case rgb[2] > rgb[0] && rgb[0] >= rgb[1]:
        h = h * (4 + (rgb[0] - rgb[1]) / (rgb[2] - rgb[1]));
        break;

      case rgb[0] >= rgb[2] && rgb[2] > rgb[1]:
        h = h * (6 - (rgb[2] - rgb[1]) / (rgb[0] - rgb[1]));
        break;

      default:
        break;
    }

    return h;
  };

  static getLuminosityFromRGBA = (r = 255, g = 255, b = 255) => {
    let rgb = [r, g, b];
    if (!GenericsUtil.isRGBArray(rgb)) return;

    rgb = GenericsUtil.normalizeRGBArray(rgb);

    return 0.5 * (Math.max(...rgb) + Math.min(...rgb));
  };

  static normalizeRGBArray = (param) => {
    if (!GenericsUtil.isRGBArray(param)) return;

    return param.every((e) => GenericsUtil.normalizeRGBValue(e));
  };

  static normalizeRGBAArray = (param) => {
    if (!GenericsUtil.isRGBArray(param)) return;

    return param.some((e, i) =>
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
    if (!GenericsUtil.isNormalizedRBGValue(param)) return;

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
          ? GenericsUtil.isHueValue
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
    GenericsUtil.__isNumber(param);
    return (
      GenericsUtil.__isNumber(param) &&
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
          ? GenericsUtil.isHueValue
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
      GenericsUtil.isNumber(param) &&
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
      GenericsUtil.isNumber(param) &&
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
      arr.length === GenericsUtil.validArrayLength[3]
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
    return GenericsUtil.__isNumber(param) || GenericsUtil.__isString(param);
  };

  /**
   * Returns true if param is a number
   * @param {*} param
   * @returns boolean
   */
  static isNumber = (param) => {
    return typeof param === "number";
  };

  /**
   * Returns true if param is a string
   * @param {*} param
   * @returns boolean
   */
  static isString = (param) => {
    return typeof param === "string";
  };
}

export default GenericsUtil;
