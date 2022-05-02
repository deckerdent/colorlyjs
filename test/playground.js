/**
 * this script is for random testing
 *
 * @author  deckerdent
 * @since   20220416
 */

import ColorFactory from "../src/ColorFactory.js";
import CSSColors from "../src/util/CSSColors.js";

//initializing color

console.log("############## initializing radnomized test ##################");

let modes = ["css", "hex", "rgb", "rgba", "cmyk", "hsl", "hsv", "name"];
let val = [
  "red",
  "green",
  "blue",
  "cyan",
  "magenta",
  "yellow",
  "black",
  "hue",
  "saturation",
  "lightness",
  "value",
  "opacity",
];

for (let i = 0; i <= 1000; i++) {
  let mode = getRandomInt(0, modes.length);
  let color = getInitialColor(mode);

  console.log(
    `[iteration ${i}, color created through mode ${modes[mode]} ] - initiated color: ${color} `
  );

  for (let j = 0; j <= 1000; j++) {
    let valMode = getRandomInt(0, val.length);
    let sign = getRandomInt(0, 2) === 0 ? -1 : 1;
    switch (valMode) {
      case 0:
        color.addRed(sign * getRandomArbitrary(0, 256));
      case 1:
        color.addGreen(sign * getRandomArbitrary(0, 256));
      case 0:
        color.addBlue(sign * getRandomArbitrary(0, 256));
      case 0:
        color.addCyan(sign * Math.random());
      case 0:
        color.addMagenta(sign * Math.random());
      case 0:
        color.addYellow(sign * Math.random());
      case 0:
        color.addBlack(sign * Math.random());
      case 0:
        color.addHue(sign * getRandomArbitrary(0, 361));
      case 0:
        color.addSaturation(sign * Math.random());
      case 0:
        color.addLightness(sign * Math.random());
      case 0:
        color.addValue(sign * Math.random());
      case 0:
        color.addDecimalOpacity(sign * Math.random());
    }
    console.log(
      `[iteration ${i}.${j}, adding mode ${val[valMode]} ] - color: ${color} `
    );
  }
}

function getInitialColor(mode) {
  let modes = ["css", "hex", "rgb", "rgba", "cmyk", "hsl", "hsv", "name"];
  let initialColor;
  switch (mode) {
    case 0:
      initialColor = ColorFactory.createColor(
        modes[mode],
        "rgb(" +
          getRandomArbitrary(0, 256) +
          "," +
          getRandomArbitrary(0, 256) +
          "," +
          getRandomArbitrary(0, 256) +
          ")"
      );
      break;
    case 1:
      while (true) {
        initialColor = getRandomInt(0, 4294967295).toString(16);
        if ([3, 4, 6, 8].contains[initialColor.length]) break;
      }
      initialColor = ColorFactory.createColor(modes[mode], initialColor);
      break;
    case 2:
      initialColor = ColorFactory.createColor(
        modes[mode],
        getRandomArbitrary(0, 256),
        getRandomArbitrary(0, 256),
        getRandomArbitrary(0, 256)
      );
    case 3:
      initialColor = ColorFactory.createColor(
        modes[mode],
        getRandomArbitrary(0, 256),
        getRandomArbitrary(0, 256),
        getRandomArbitrary(0, 256),
        Math.random()
      );
    case 4:
      initialColor = ColorFactory.createColor(
        modes[mode],
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random()
      );
    case 5:
      initialColor = ColorFactory.createColor(
        modes[mode],
        getRandomArbitrary(0, 361),
        Math.random(),
        Math.random()
      );
    case 6:
      initialColor = ColorFactory.createColor(
        modes[mode],
        getRandomArbitrary(0, 361),
        Math.random(),
        Math.random()
      );
    case 7:
      let CSSColorsKeys = Object.keys(CSSColors);
      let initialColorKey =
        CSSColorsKeys[getRandomInt(0, CSSColorsKeys.length - 1)];
      initialColor = CSSColors[initialColorKey];
      break;

    default:
      break;
  }

  return initialColor;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
