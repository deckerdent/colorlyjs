/**
 * this script is for random testing
 *
 * @author  deckerdent
 * @since   20220416
 */

import ColorFactory from "./src/ColorFactory.js";
import CSSColors from "./src/util/CSSColors.js";

//initializing color

console.log("############## initializing radnomized test ##################");
let debugMode = false;
if (debugMode) {
  let color = ColorFactory.createColor("name", "navy");
  console.log(color.toString());
  color.addGreen(-252.52556747556912);
  console.log(color.toString());
  console.log(
    color.toHexIntValue(),
    color.toHexArray(),
    color.toHexCSSString()
  );
}

if (debugMode) process.exit();

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
  console.log(`[iteration ${i}] mode ${modes[mode]}(${mode})`);
  let color = getInitialColor(mode);

  console.log(`[iteration ${i}] - initiated color: ${color.toString()} `);

  for (let j = 0; j <= 1000; j++) {
    let valMode = getRandomInt(0, val.length);
    let sign = getRandomInt(0, 2) === 0 ? -1 : 1;
    let added;

    console.log(
      `[subiteration ${i}.${j}, adding mode ${
        val[valMode]
      } ] - color: ${color.toString()} `
    );
    switch (valMode) {
      case 0:
        added = sign * getRandomArbitrary(0, 256);
        console.log(`added ${added} red`);
        color.addRed(added);
        break;
      case 1:
        added = sign * getRandomArbitrary(0, 256);
        console.log(`added ${added} green`);
        color.addGreen(added);
        break;
      case 2:
        added = sign * getRandomArbitrary(0, 256);
        console.log(`added ${added} blue`);
        color.addBlue(added);
        break;
      case 3:
        added = sign * Math.random();
        console.log(`added ${added} cyan`);
        color.addCyan(added);
        break;
      case 4:
        added = sign * Math.random();
        console.log(`added ${added} magenta`);
        color.addMagenta(added);
        break;
      case 5:
        added = sign * Math.random();
        console.log(`added ${added} yellow`);
        color.addYellow(added);
        break;
      case 6:
        added = sign * Math.random();
        console.log(`added ${added} black`);
        color.addBlack(added);
        break;
      case 7:
        added = sign * Math.random();
        console.log(`added ${added} hue`);
        color.addHue(sign * getRandomArbitrary(0, 361));
        break;
      case 8:
        added = sign * Math.random();
        console.log(`added ${added} saturation`);
        color.addSaturation(added);
        break;
      case 9:
        added = sign * Math.random();
        console.log(`added ${added} lightness`);
        color.addLightness(added);
        break;
      case 10:
        added = sign * Math.random();
        console.log(`added ${added} value`);
        color.addValue(added);
        break;
      case 11:
        added = sign * Math.random();
        console.log(`added ${added} opacity`);
        color.addDecimalOpacity(added);
    }
    console.log(
      `[iteration ${i}.${j}, adding mode ${
        val[valMode]
      } ] - new color: ${color.toString()} `
    );
  }
}
console.log(
  `processed 1000 random colors with each 1000 random changes to the color.`
);

function getInitialColor(mode) {
  let modes = ["css", "hex", "rgb", "rgba", "cmyk", "hsl", "hsv", "name"];
  let initialColor;
  switch (mode) {
    case 0:
      initialColor = ColorFactory.createColor(
        modes[mode],
        "rgb(" +
          getRandomArbitrary(0, 255) +
          "," +
          getRandomArbitrary(0, 255) +
          "," +
          getRandomArbitrary(0, 255) +
          ")"
      );
      break;
    case 1:
      while (true) {
        initialColor = getRandomInt(0, 4294967295).toString(16);
        if ([3, 4, 6, 8].some((e) => e === initialColor.length)) break;
      }
      initialColor = ColorFactory.createColor(modes[mode], initialColor);
      break;
    case 2:
      initialColor = ColorFactory.createColor(
        modes[mode],
        getRandomArbitrary(0, 255),
        getRandomArbitrary(0, 255),
        getRandomArbitrary(0, 255)
      );
      break;
    case 3:
      initialColor = ColorFactory.createColor(
        modes[mode],
        getRandomArbitrary(0, 255),
        getRandomArbitrary(0, 255),
        getRandomArbitrary(0, 255),
        Math.random()
      );
      break;
    case 4:
      initialColor = ColorFactory.createColor(
        modes[mode],
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random()
      );
      break;
    case 5:
      initialColor = ColorFactory.createColor(
        modes[mode],
        getRandomArbitrary(0, 360),
        Math.random(),
        Math.random()
      );
      break;
    case 6:
      initialColor = ColorFactory.createColor(
        modes[mode],
        getRandomArbitrary(0, 360),
        Math.random(),
        Math.random()
      );
      break;
    case 7:
      let CSSColorsKeys = Object.keys(CSSColors);
      let initialColorKey =
        CSSColorsKeys[getRandomInt(0, CSSColorsKeys.length - 1)];
      console.log(
        `Named Color ${initialColorKey} ${CSSColors[initialColorKey]}`
      );
      initialColor = ColorFactory.createColor(modes[mode], initialColorKey);
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
