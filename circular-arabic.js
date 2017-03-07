const arabicTashkil = "َِّْ‎";

// replace individual characters with additional forms
// thanks to miladkdz in OSM issue https://github.com/openstreetmap/iD/pull/3707/
const arabicChars = {
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

// skip forward or backward in word to avoid tashkil characters
function nextFullLetter(word) {
  for (var w = 0; w < word.length; w++) {
    if (arabicTashkil.indexOf(word[w]) > -1) {
      continue;
    }
    return word.charCodeAt(w);
  }
  return null;
}

function lastFullLetter(word) {
  for (var w = word.length - 1; w >= 0; w--) {
    if (arabicTashkil.indexOf(word[w]) > -1) {
      continue;
    }
    return word.charCodeAt(w);
  }
  return null;
}

function ArabicCircle(ctx, text, diameter, orientation) {
  if (!diameter) {
    diameter = 300;
  }
  if (!orientation) {
    orientation = 1;
  }
  if (orientation !== 1) {
    orientation = -1;
  }
  
  
  // increase font until the font is too big to fit the diameter
  // need to calibrate this for real
  function getFontForRadius(text, diameter) {
    for (var size = 12; size < 100; size += 2) {
      var innerDiameter = diameter - (2 * size);
      var innerCircumference = Math.PI * innerDiameter;
    
      // using Google Noto Font for consistent experience
      if (orientation === -1) {
        ctx.font = size + 'px Noto Naskh Arabic';
      } else {
        ctx.font = (size - 2) + 'px Noto Naskh Arabic';
      }
      var currentWidth = ctx.measureText(text).width;
      if (currentWidth > innerCircumference) {
        return size - 2;
      }
    }
  
    // reached 100px
    console.log('max font size');
    return size;
  }
  var size = getFontForRadius(text, diameter);

  // start out in the initial position
  var position = 'initial';

  // keep track of characters which will connect to others via baseline
  var baselineChars = [];

  // LA fixes
  var LAcombinations = [
    ['لا', 'ﻻ', 'ﻼ'], // plain alef
    ['لﺁ', 'ﻵ', 'ﻶ'], // madda above
    ['لﺃ', 'ﻷ', 'ﻸ'], // hamza above
    ['لﺇ', 'ﻹ', 'ﻺ'], // hamza below
    ['لآ', 'ﻵ', 'ﻶ'], // madda above again
    ['لأ', 'ﻷ', 'ﻸ'], // hamza above again
    ['لإ', 'ﻹ', 'ﻺ'] // hamza below again
  ];

  // calculate the radians per char once
  var letterLengthTest = text;
  for (var i = 0; i < arabicTashkil.length; i++) {
    letterLengthTest = letterLengthTest.replace(new RegExp(arabicTashkil[i], 'g'), '');
  }
  for (var i = 0; i < LAcombinations.length; i++) {
    letterLengthTest = letterLengthTest.replace(new RegExp(LAcombinations[i][0], 'g'), '_');
  }
  var letterLength = letterLengthTest.length;
  var gapPerChar = 2 * Math.PI / letterLength;

  var charWidth;
  var letterSpace = -1;
  
  for (var c = 0; c < text.length; c++) {
    // rotate the circle evenly
    if (arabicTashkil.indexOf(text[c]) === -1) {
      ctx.rotate(orientation * gapPerChar);
      letterSpace++;
    } else {
      // tashkil mark
      var insertChar = text[c];
      var charWidth = 2;
      ctx.fillText(insertChar, (charWidth / -2), (370 * orientation) - (orientation * (350 - diameter / 2)));
      continue;
    }
  
    // handle whitespace
    if (text[c].match(/\s/)) {
      position = 'initial';
      continue;
    }
    
    var insertChar = text[c];
    // modify position?
    if (arabicChars[insertChar.charCodeAt(0)]) {
      // calculate if the character I'll print is at the end of the line
      if (position !== 'initial' && (!nextFullLetter(text.substring(c + 1)) || !arabicChars[nextFullLetter(text.substring(c + 1))] || !arabicChars[text.charCodeAt(c)].medial)) {
        position = 'final';
      }
  
      // if the previous character doesn't join to me, I must be an initial
      if (position === 'medial' && (!arabicChars[lastFullLetter(text.substring(0, c))] || !arabicChars[lastFullLetter(text.substring(0, c))].medial)) {
        position = 'initial';
      }
  
      // run replace function based on calculated position
      insertChar = replaceArabicChar(text[c], position);
    }
    
    // LA check
    if (text[c] === 'ل') {
      for (var x = 0; x < LAcombinations.length; x++) {
        if (text.substring(c, c + 2) === LAcombinations[x][0]) {
          if (position === 'initial') {
            insertChar = LAcombinations[x][1];
            c++;
          } else {
            insertChar = LAcombinations[x][2];
            c++;
          }
          break;
        }
      }
    }

    // measure width of the character
    if (arabicTashkil.indexOf(insertChar) === -1) {
      charWidth = ctx.measureText(insertChar).width;
    }
  
    // if I made a huge mistake and the character doesn't exist, use the original char
    if (!charWidth) {
      insertChar = text[c];
      charWidth = ctx.measureText(insertChar).width;
    }
  
    // paint onto canvas
    var warpSize = 350;
    if (orientation === -1) {
      warpSize = 400;
    }
    ctx.fillText(insertChar, (charWidth / -2), (orientation * 370) - (orientation * (warpSize - diameter / 2)));
  
    if (position !== 'final' && arabicChars[text.charCodeAt(c)] && arabicChars[text.charCodeAt(c)].medial) {
      // note for baseline continuation
      baselineChars.push(letterSpace);
    }
  
    // prep for the next character position
    if (position === 'final') {
      position = 'initial';
    } else {
      position = 'medial';
    }
  }

  // draw all of the baseline curves now
  var arcSeparationFromLetterCenter = gapPerChar / 6;
  for (var b = 0; b < baselineChars.length; b++) {
    var pointTo = baselineChars[b];
    var startAngle = gapPerChar * (letterLength - pointTo - 1) - Math.PI / 2 + arcSeparationFromLetterCenter;
    var endAngle = startAngle - gapPerChar + arcSeparationFromLetterCenter;
  
    // still some 'magic numbers' here on distance from center, width of baseline
    // should adjust to font size / diameter  
    ctx.beginPath();
    if (orientation === 1) {
      // innie
      ctx.arc(0, 0, (diameter / 2) + 10, -1 * startAngle, -1 * endAngle + arcSeparationFromLetterCenter);
      ctx.arc(0, 0, (diameter / 2) + 16, -1 * endAngle + arcSeparationFromLetterCenter, -1 * startAngle, true);
    } else {
      // outie
      ctx.arc(0, 0, (diameter / 2) - 18, startAngle, endAngle, true);
      ctx.arc(0, 0, (diameter / 2) - 25, endAngle, startAngle);
    }
    ctx.closePath();
    ctx.fill();
  }
}

if (typeof module !== 'undefined') {
  module.exports = ArabicCircle;
}