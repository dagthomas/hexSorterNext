# hexSorter v1.5.0

### Original:
![alt text](https://raw.githubusercontent.com/dagthomas/hexSorter/master/images/unsorted_hexSorter.png "Unsorted Color Array")

### Sorted:
![alt text](https://raw.githubusercontent.com/dagthomas/hexSorter/master/images/sorted_hexSorter.png "Sorted Color Array")

## Installation
In a browser:
```html
<script src="hexSorter.js"></script>
```

Using npm:
```shell
$ npm i --save hexsorter
```

In Node.js:
```js
// Load the module.
const hexSorter = require('hexSorter');
```

## Why hexSorter?

hexSorterNext is a typescript implementation of hexsorter.js.<br>

Its usage is to automagically sort colors by luminosity, to generate style<br>
sheets or vector fill/strokes.<br>

 * Sort colors by luminosity
 * Get brightest color from array
 * Get most saturated color from array
 * Mix hexadecimal color values to create/diffuse colors
 * Choose conversion type for RGB->Y. BT.601, BT709, BT2020
 <br>

## Usage
```shell
node test
```

```js
import { colorMixer, sortColors, mixSortColors } from './hexSorterNext';
const log = console.log;
var colorArray = ["#516373", "#f2b999", "#f2e8c9", "#6c838c", "#f2f2f2"];

var mixColor = colorMixer(colorArray[0], "#fff", 50);
var mostBright = sortColors(colorArray, 'mostBrightColor');
var mostSaturatedColor = sortColors(colorArray, 'mostSaturatedColor');
var colorMixed = colorMixer("#516373", "#fff", 50);
var mixSort = mixSortColors(colorArray, 'mostBrightColor', "#fff", 50);

log("Mixed with 50% white: ", mixColor);
log("Sorted by brightness: ", mostBright);
log("Sorted by saturation: ", mostSaturatedColor);
log("Mix #fff sorted: ", mixSort);
log("Mix #516373 with #fff - 50%: ", colorMixed);

```


![alt text](https://raw.githubusercontent.com/dagthomas/hexSorter/master/images/output_hexSorter.png "Sorted Color Array")

### Example of CSS file used on SVG in HTML
![alt text](https://raw.githubusercontent.com/dagthomas/hexSorter/master/images/example_hexSorter.png "Example of palette applied to SVG")

