// canvas setup
var c = document.getElementById('circle');
var ctx = c.getContext('2d');
ctx.fillStyle = '#000';

// in case some weird Internet Explorer thing
if (typeof console === 'undefined') {
  console = {
    log: function() { }
  };
}

// replace individual characters with additional forms
// thanks to miladkdz in OSM issue https://github.com/openstreetmap/iD/pull/3707/
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

// increase font until the font is too big to fit the diameter
// need to calibrate this for real
function getFontForRadius(text, diameter) {
  for (var size = 12; size < 100; size += 2) {
    var innerDiameter = diameter - (2 * size);
    var innerCircumference = Math.PI * innerDiameter;
    
    // using Google Noto Font for consistent experience
    ctx.font = size + 'px Noto Naskh Arabic';
    var currentWidth = ctx.measureText(text).width;
    if (currentWidth > innerCircumference) {
      return size - 2;
    }
  }
  
  // reached 100px
  console.log('max font size');
  return size;
}

// sample text
var text = 'أستراليا';
text += ' ' + text;

// sample diameter (needs to be calibrated)
var diameter = 300;
var size = getFontForRadius(text, diameter);

// put center of rotation at center of canvas
ctx.translate(200, 200);

// use initial, medial, final forms
function replaceArabicChar(cr, position) {
  var codepoint = cr.charCodeAt(0);
  // console.log(cr + ' in ' + position);
  if (arabicChars[codepoint] && arabicChars[codepoint][position]) {
    return arabicChars[codepoint][position];
  } else {
    return cr;
  }
}

// start out in the initial position
var position = 'initial';

// keep track of characters which will connect to others via baseline
var baselineChars = [];

// calculate the radians per char once
var gapPerChar = 2 * Math.PI / text.length;

for (var c = 0; c < text.length; c++) {
  // rotate the circle evenly
  ctx.rotate(-1 * gapPerChar);
  
  // handle whitespace
  if (text[c].match(/\s/)) {
    position = 'initial';
    continue;
  }
  
  // calculate if the character I'll print is at the end of the line
  if (position !== 'initial' && (c + 1 === text.length || !arabicChars[text.charCodeAt(c + 1)] || !arabicChars[text.charCodeAt(c)].medial)) {
    position = 'final';
  }
  
  // if the previous character doesn't join to me, I must be an initial
  if (position === 'medial' && (!arabicChars[text.charCodeAt(c - 1)] || !arabicChars[text.charCodeAt(c - 1)].medial)) {
    position = 'initial';
  }
  
  // run replace function based on calculated position
  var insertChar = replaceArabicChar(text[c], position);

  // measure width of the character
  var charWidth = ctx.measureText(insertChar).width;
  
  // if I made a huge mistake and the character doesn't exist, use the original char
  if (!charWidth) {
    insertChar = text[c];
    charWidth = ctx.measureText(insertChar).width;
  }
  
  // paint onto canvas
  ctx.fillText(insertChar, (charWidth / -2), -370 + (400 - diameter / 2));
  
  if (position !== 'final' && arabicChars[text.charCodeAt(c)] && arabicChars[text.charCodeAt(c)].medial) {
    // note for baseline continuation
    baselineChars.push(c);
  }
  
  // prep for the next character position
  if (position === 'final') {
    position = 'initial';
  } else {
    position = 'medial';
  }
}

// console.log(baselineChars);

// draw all of the baseline curves now
var arcSeparationFromLetterCenter = gapPerChar / 6;
for (var b = 0; b < baselineChars.length; b++) {
  var pointTo = baselineChars[b];
  ctx.beginPath();
  var startAngle = gapPerChar * (text.length - pointTo - 1) - Math.PI / 2 + arcSeparationFromLetterCenter;
  var endAngle = startAngle - gapPerChar + arcSeparationFromLetterCenter;
  
  // still some 'magic numbers' here on distance from center, width of baseline
  // should adjust to font size / diameter
  ctx.arc(0, 0, (diameter / 2) - 18, startAngle, endAngle, true);
  ctx.arc(0, 0, (diameter / 2) - 25, endAngle, startAngle);
  ctx.closePath();
  ctx.fill();
}
