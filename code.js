var c = document.getElementById('circle');
var ctx = c.getContext('2d');
ctx.fillStyle = '#000';

if (typeof console === 'undefined') {
  console = {
    log: function() { }
  };
}

var arabicChars = {
    // madda above alef
    1570: {initial: "آ‎", isolated: "ﺁ", medial: "ﺁ", final: "ﺂ" },
    
    // hamza above and below alef
    1571: { initial: "أ", isolated: "ﺃ", medial: "", final: "ﺄ" },
    // 1572 is ؤ
    1573: { initial: "إ", isolated: "ﺇ", medial: "", final: "ﺈ" },
    // 1574 is ئ
    1575: {initial: "ا", isolated: "ا", medial: "", final: "ﺎ" },
    1576: {initial: "ﺑ", isolated: "ﺏ", medial: "ﺒ", final: "ﺐ" },

    // 1577 ة
    1577: {initial: "", isolated: "ة", medial: "", final: "ﺔ" },

    1578: {initial: "ﺗ", isolated: "ﺕ", medial: "ﺘ", final: "ﺖ" },
    1579: {initial: "ﺛ", isolated: "ﺙ", medial: "ﺜ", final: "ﺚ" },
    1580: {initial: "ﺟ", isolated: "ﺝ", medial: "ﺠ", final: "ﺞ" },
    1581: {initial: "ﺣ", isolated: "ﺡ", medial: "ﺤ", final: "ﺢ" },
    1582: {initial: "ﺧ", isolated: "ﺥ", medial: "ﺨ", final: "ﺦ" },
    1583: {initial: "ﺩ", isolated: "ﺩ", medial: "", final: "ﺪ" },
    1584: {initial: "ﺫ", isolated: "ﺫ", medial: "", final: "ﺬ" },
    1585: {initial: "ﺭ", isolated: "ﺭ", medial: "", final: "ﺮ" },
    1586: {initial: "ﺯ", isolated: "ﺯ", medial: "", final: "ﺰ" },
    1688: {initial: "ﮊ", isolated: "ﮊ", medial: "", final: "ﮋ" },
    1587: {initial: "ﺳ", isolated: "ﺱ", medial: "ﺴ", final: "ﺲ" },
    1588: {initial: "ﺷ", isolated: "ﺵ", medial: "ﺸ", final: "ﺶ" },
    1589: {initial: "ﺻ", isolated: "ﺹ", medial: "ﺼ", final: "ﺺ" },
    1590: {initial: "ﺿ", isolated: "ﺽ", medial: "ﻀ", final: "ﺾ" },
    1591: {initial: "ﻃ", isolated: "ﻁ", medial: "ﻄ", final: "ﻂ" },
    1592: {initial: "ﻇ", isolated: "ﻅ", medial: "ﻈ", final: "ﻆ" },
    1593: {initial: "ﻋ", isolated: "ﻉ", medial: "ﻌ", final: "ﻊ" },
    1594: {initial: "ﻏ", isolated: "ﻍ", medial: "ﻐ", final: "ﻎ" },

// 1595 ػ - may be very rare

    1601: {initial: "ﻓ", isolated: "ﻑ", medial: "ﻔ", final: "ﻒ" },
    1602: {initial: "ﻗ", isolated: "ﻕ", medial: "ﻘ", final: "ﻖ" },
    1604: {initial: "ﻟ", isolated: "ﻝ", medial: "ﻠ", final: "ﻞ" },
    1605: {initial: "ﻣ", isolated: "ﻡ", medial: "ﻤ", final: "ﻢ" },
    1606: {initial: "ﻧ", isolated: "ﻥ", medial: "ﻨ", final: "ﻦ" },
    1607: {initial: "ﻫ", isolated: "ﻩ", medial: "ﻬ", final: "ﻪ" },
    1608: {initial: "ﻭ", isolated: "ﻭ", medial: "", final: "ﻮ" },
    
    // 1609 ى
    1609: {initial: "ﯨ", isolated: "ﻯ", medial: "ﯩ", final: "ﻰ" }, 
    // 1610 ي
    1610: {initial: "ﻳ", isolated: "ﻱ", medial: "ﻴ", final: "ﻲ" },
    // short vowel sounds / tashkil markings

    1662: {initial: "ﭘ", isolated: "ﭖ", medial: "ﭙ", final: "ﭗ" },
    
    1670: {initial: "ﭼ", isolated: "ﭺ", medial: "ﭽ", final: "ﭻ" },    
    1603: {initial: "ﻛ", isolated: "ﻙ", medial: "ﻜ", final: "ﻚ" },
    1705: {initial: "ﻛ", isolated: "ﮎ", medial: "ﻜ", final: "ﮏ" },
    1711: {initial: "ﮔ", isolated: "ﮒ", medial: "ﮕ", final: "ﮓ" },
    1740: {initial: "ﻳ", isolated: "ﻯ", medial: "ﻴ", final: "ﻰ" },
    5000: {initial: "ﻻ", isolated: "ﻻ", medial: "", final: "ﻼ" }
};

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

var size = getFontForRadius(text, diameter);

ctx.translate(200, 200);

function replaceArabicChar(cr, position) {
  var codepoint = cr.charCodeAt(0);
  // console.log(cr + ' in ' + position);
  if (arabicChars[codepoint] && arabicChars[codepoint][position]) {
    return arabicChars[codepoint][position];
  } else {
    return cr;
  }
}

var position = 'initial';
var baselineChars = [];
var gapPerChar = 2 * Math.PI / text.length;

for (var c = 0; c < text.length; c++) {
  // rotate the circle evenly
  ctx.rotate(-1 * gapPerChar);
  
  // handle whitespace
  if (text[c].match(/\s/)) {
    position = 'initial';
    continue;
  }
  
  // calculate which characters are the end of the line
  if (position !== 'initial' && (c + 1 === text.length || !arabicChars[text.charCodeAt(c + 1)] || !arabicChars[text.charCodeAt(c)].medial)) {
    position = 'final';
  }
  if (position === 'medial' && (!arabicChars[text.charCodeAt(c - 1)] || !arabicChars[text.charCodeAt(c - 1)].medial)) {
    position = 'initial';
  }
  
  var insertChar = replaceArabicChar(text[c], position);

  // measure width of the character
  var charWidth = ctx.measureText(insertChar).width;
  
  // if I made a huge mistake and the character doesn't exist, restore original char
  if (!charWidth) {
    insertChar = text[c];
    charWidth = ctx.measureText(insertChar).width;
  }
  
  // paint onto canvas
  ctx.fillText(insertChar, (charWidth / -2), -370 + (400 - diameter / 2));
  
  // prep for the next character position
  if (position === 'final') {
    position = 'initial';
  } else {
    position = 'medial';
  }
  
  if (position !== 'final' && arabicChars[text.charCodeAt(c)] && arabicChars[text.charCodeAt(c)].medial) {
    // note for baseline continuation
    baselineChars.push(c);
  }
  
  /*
  var s = document.createElement('span');
  s.innerHTML = insertChar;
  document.body.appendChild(s);
  */
}

// console.log(baselineChars);
for (var b = 0; b < baselineChars.length; b++) {
  var pointTo = baselineChars[b];
  ctx.beginPath();
  var startAngle = gapPerChar * (text.length - pointTo - 1) - Math.PI / 2 + (gapPerChar / 6);
  var endAngle = startAngle - (gapPerChar * 5/6);
  ctx.arc(0, 0, (diameter / 2) - 18, startAngle, endAngle, true);
  ctx.arc(0, 0, (diameter / 2) - 25, endAngle, startAngle);
  ctx.closePath();
  ctx.fill();
}
