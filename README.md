# colorly

Colorly is am easy to use color parsing library which supports rgb, rgba, hex, cymk, hsl and hsv. It aims at the web which is why it follows the CSS4 standards. 

## Installation 

Using npm
```
  $ npm install colorly 
```

## Usage

The library consists of a few utility classed which are all combined under the hood of the `Color` class. An instance of this class represents a color which you may maipulate.
See the API Reference below for all possible functions `Color` and `ColorFactory` provides. To get started do, 

```
import {ColorFactory} from Colorly 

const myColor = ColorFactory.createColor('rgb', 0, 0, 0) //represents a black color
```

From this basis you may do your calculations, e.g.

```
myColor.addRed(255) // changes the color to be 255, 0, 0 -> a red color
```
Note that the alpha value in rgba as well as the relative values in cmyk, hsl and hsv are stored as a floating number between 0 and 1, while the hue and rgb values are 
processed in a range of 0 to 360 and 0 to 255 respectively. Therefore you add cyan as 

```
myColor.addCyan(0.2) // add 20 percent Cyan to your color
```

Further, the library rounds numbers as selden as possible. But calling getter methods or toString methods leads to the numbers being rounded to a defined precision. The 
CSS rounding rules are used for this. The precision is set per color scheme and defaults to the following values

- rgb: 0, returns integers only
- cmyk, hsl, hsv: 2, returns floating numbers from 0 to one and leads to integers in CSS Strings, e.g. if c = 0, m = 0.2, y = 0.4 and k = 0.65, `getBlack()`
 would return 0.65 while `toCMYKCSSString()` would return `cmyk(0, 20%, 40%, 65%)`
 - opacity: 2, returns floating numbers from 0 to 1 

The ColorFactory only knows static methods to create colors. The easiest way is to use `ColorFactory.createColor(mode, a, b, c, d)`, where mode can be one of: 

- css: a css String which holds a rgb, rgba, hex, cmyk, hsl or hsv color, such as `'rgb(255, 255, 255)'`
- hex: either a decimal number which may represented as a 3,4,6 or 8 digit hex code, or a hexadecimal number, e.g. 423423342 or dad4ef
- rgb: a rgb color represented by three parameters for r, g and b, e.g. `128, 128, 128`
- rgba: a rgba color represented by three parameters for r, g and b and an additional parameter for the alpha value, e.g. `128, 0, 0, 0.5`
- cmyk: a cmyk color represented by four parameters for c, m, y and k, e.g. `0.5, 0.2, 0.9, 0.1`
- hsl: a hsl color represented by three parameters for h,s and l, e.g. `360, 0.5, 0.5`
- hsv: a hsv color represented by three parameters for h,s and v, e.g. `360, 0.5, 0.5`

To savely use the modes use the modes property, like `ColorFactory.createColor(ColorFactory.modes.css, 'rgba(11, 22, 33, 1)')`. 

The `createColor(mode, a, b, c, d)` function just wrapps specific functions to create colors from the certain color scheme, but all the functions return an instance of `Color`.

An instance of the `Color` class represents a certain color which may be parsed to hex, rgb, rgba, cmyk, hsl or hsv. Those schemes belong to rules which are 

- hex: has to be a 3, 4, 6 or 8 digit hex code
- rgb: rgb accepts floats in a range from 0 to 255. It's rounded to integer by default. See the next paragraph for more information about the precision.
- rgba: like rgb but accepts a fourth float parameter between 0 and 1
- cmyk: accepts four float parameters between 0 and 1
- hsl, hsv: both accept one float parameter in a range from 0 to 360 and two from 0 to 1

While floating values are possible the values are rounded to a certain precision. Rounding is done as little as possible to ensure accuracy. The precisions are set per color scheme and default to 
- rgb: 0, integer 
- rgba: like rgb but with a precision of two for the alpha value. Therefore alpha is a value between 0 and 1 with two decimal places. 
- cmyk: 2, means it defaults to a float with two decimal places
- hsl, hsv: 0 for hue, 2 for the others respectively 

Note that when calling a function that parses a color to a certain CSS string the values in a range of 0 to 1 are multiplied by 100, so they default to integers. That means that a color with c = 10%, m = 20%, y = 30%, k = 40% has `myColor.getCyan() === 0.1` but `toCMYKCSSString() === 'cmyk(10%, 20%, 30%, 40%)'`. Further, changing a property may affect the value of other properties. 

Use adder functions to add or substract a certain value, e.g. 
```
myColor.addRed(25) // adds 25 red to the the color 
myColor.addGreen(-10) // substracts 10 green from the color
```
or setters to set the value of a certain property. 
```
myColor.setCyan(0.9) // sets Cyan to 90% 
```
or get a certain value by 
```
myColor.getSaturation() // returns the saturation of the current color 
```

You may want to keep a color and calculate a second color on the basis of it. You can use the `copy()` function to get a exact clone of your color, like so 
```
const myColor2 = myColor.copy() // returns a clone of myColor
```
## API Reference 

### ColorFactory 

| Field | props | example |
| -------- | ---------- | ------- |
| `mode` | `{css, hex, rgb, rgba, cmyk, hsl, hsv, opacity, name}`, is a string used for the mode of `createColor(mode, a, b, c, d)` | `ColorFactory.modes.css === 'css'` |

| Function | parameters | example |
| -------- | ---------- | ------- |
| `createColor(mode, a, [b, c, d])` | values depending on the mode | `createColor('cmky', 0.2, 0.4, 0.6, 0.8)` |
| `createColorFromHex(hex)` | a hex string or an integer that may be represented as a 3, 4, 6 or 8 digit hex string | `createColorFromHex('12ABCDFF')` |
| `createColorFromRGB(r, g, b)` | values between 0 and 255 for r, g and b | `createColorFromRGB(11, 22, 33)` |
| `createColorFromRGBA(r, g, b, a)` | values between 0 and 255 for r, g and b and a value between 0 and 1 for a | `createColorFromRGBA( 44, 55, 66, 1)` |
| `createColorFromCMYK(c, m, y, k)` | values between 0 and 1 for c, m, y and k | `createColorFromCMYK(0.1, 0.2, 0.3, 0.4)` |
| `createColorFromHSL(h, s, l)` | a value between 0 and 360 for h and values between 0 and 1 for s and l | `createColorFromHSL(270, 0.5, 0.6)` |
| `createColorFromHSV(h, s, v)` | a value between 0 and 360 for h and values between 0 and 1 for s and v | `createColorFromHSV(60, 0.7, 0.8)` |

### Color 

| Field | props | example |
| -------- | ---------- | ------- |
| `precision` | `{rgb, rgba, cmyk, hsl, hsv, opacity}`, is a number specifying the number of decimal places of a property | `myColor.precision.rgb = 2 // sets the precision for rgb values to 2 decimal places, e.g. 200.12` |

| Function | parameters | example |
| -------- | ---------- | ------- |
| `addRed(r)` | a value which is added to the red property | `addRed(r)` |
| `addGreen(g)` | a value which is added to the green property | `addGreen(g)` |
| `addBlue(b)` | a value which is added to the blue property | `addBlue(b)` |
| `addCyan(c)` | a value which is added to the cyan property | `addCyan(c)` |
| `addMagenta(m)` | a value which is added to the magenta property | `addMagenta(m)` |
| `addYellow(y)` | a value which is added to the yellow property | `addYellow(y)` |
| `addBlack(k)` | a value which is added to the black property | `addBlack(k)` |
| `addHue(h)` | a value which is added to the hue property | `addHue(h)` |
| `addSaturation(s)` | a value which is added to the saturation property | `addSaturation(s)` |
| `addLightness(l)` | a value which is added to the lightness (luminosity) property | `addLightness(l)` |
| `addValue(v)` | a value which is added to the value property | `addValue(v)` |
| `addDecimalOpacity(o)` | a value which is added to the opacity property | `addDecimalOpacity(o)` |
| `setRed(r)` | a value between 0 and 255 which is set to the red property | `setRed(r)` |
| `setGreen(g)` | a value between 0 and 255 which is set to the green property | `setGreen(g)` |
| `setBlue(b)` | a value between 0 and 255 which is set to the blue property | `setBlue(b)` |
| `setCyan(c)` | a value between 0 and 1 which is set to the cyan property | `setCyan(c)` |
| `setMagenta(m)` | a value between 0 and 1 which is set to the magenta property | `setMagenta(m)` |
| `setYellow(y)` | a value between 0 and 1 which is set to the yellow property | `setYellow(y)` |
| `setBlack(k)` | a value between 0 and 1 which is set to the black property | `setBlack(k)` |
| `setHue(h)` | a value between 0 and 360 which is set to the hue property | `setHue(h)` |
| `setSaturation(s)` | a value between 0 and 1 which is set to the saturation property | `setSaturation(s)` |
| `setLightness(l)` | a value between 0 and 1 which is set to the lightness (luminosity) property | `setLightness(l)` |
| `setValue(v)` | a value between 0 and 1 which is set to the value property | `setValue(v)` |
| `setDecimalOpacity(o)` | a value between 0 and 1 which is set to the opacity property | `setDecimalOpacity(o)` |
| `getRed(r)` |  none  | none |
| `getGreen(g)` |  none  | none |
| `getBlue(b)` |  none  | none |
| `getCyan(c)` |  none  | none |
| `getMagenta(m)` |  none  | none |
| `getYellow(y)` |  none  | none |
| `getBlack(k)` |  none  | none |
| `getHue(h)` |  none  | none |
| `getSaturation(s)` |  none  | none |
| `getLightness(l)` |  none  | none |
| `getValue(v)` |  none  | none |
| `getDecimalOpacity(o)` |  none  | none |
| `copy()` | none | none |
