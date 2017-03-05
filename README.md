# circular-arabic

JavaScript and a web font to print Arabic script text in a circle.

This is somewhat more difficult than you'd expect... when printing Arabic characters one-by-one,
you need appropriate text-shaping (selecting the right glyph) to show the letters joining to each
other.

## 'Outie' style

Arabic printed with up = away from center.

Here's 'Australia' printed twice:

<img src="https://mapmeld.github.io/circular-arabic/sample.png"/>

```javascript
// the 'outie' style on a canvas element
var canv = document.getElementById('outie');
var ctx = canv.getContext('2d');

// set color and circle centroid
ctx.fillStyle = '#000';
ctx.translate(200, 200);

ArabicCircle(ctx, 'أستراليا أستراليا', 300, -1);
```

## 'Innie' style

Arabic printed with up = toward center

Here's 'Arabic alphabet' showing tashkil marks

<img src="https://mapmeld.github.io/circular-arabic/sample2.png?v=2"/>

```javascript
// the 'innie' style on a canvas element
var innie = document.getElementById('innie');
var ctx2 = innie.getContext('2d');

// set color and circle centroid
ctx2.fillStyle = '#000';
ctx2.translate(200, 200);

ArabicCircle(ctx2, 'الأَبْجَدِيَّة العَرَبِيَّة‎‎', 300, 1);
```

## Client and server recommendations

If you are running this in the browser, include an Arabic web font for consistently-sized letters and arcs:

```css
@import url(//fonts.googleapis.com/earlyaccess/notonaskharabic.css);
canvas {
  font-family: 'Noto Naskh Arabic';
}
```

If you are running this on a NodeJS server, install the Noto Naskh Arabic font. You will also need to install
node-canvas, which has <a href='https://github.com/Automattic/node-canvas/tree/v1.x#installation'>installation instructions</a> for several operating systems and cloud providers.

```javascript
const Canvas = require('canvas');
var canv = new Canvas(400, 400);
var ctx = canv.getContext('2d');
...
```

## License

Open source, MIT license
