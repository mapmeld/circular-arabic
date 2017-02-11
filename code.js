var c = document.getElementById('circle');
var ctx = c.getContext('2d');
ctx.fillStyle = '#000';

if (typeof console === 'undefined') {
  console = {
    log: function() { }
  };
}

function getFontForRadius(text, diameter) {
  for (var size = 12; size < 100; size += 2) {
    var innerDiameter = diameter - (2 * size);
    var innerCircumference = Math.PI * innerDiameter;
    ctx.font = size + 'px Noto Naskh Arabic';
    var currentWidth = ctx.measureText(text).width;
    // console.log(currentWidth);
    if (currentWidth > innerCircumference) {
      // console.log(size - 2);
      return size - 2;
    }
  }
  console.log('max font size');
  return size;
}

var text = 'أستراليا';
text += ' ' + text;

var diameter = 300;

getFontForRadius(text, diameter);

ctx.translate(200, 200);

for (var char = 0; char < text.length; char++) {
  var s = document.createElement('span');
  s.innerHTML = '&zwj;' + text[char] + '&zwj;';
  var insertChar = s.innerHTML;
  // console.log(insertChar);
  var charWidth = ctx.measureText(insertChar).width;
  ctx.fillText(insertChar, (charWidth / -2), -370 + (400 - diameter / 2));

  //break;
  ctx.rotate(-2 * Math.PI / text.length);
}
