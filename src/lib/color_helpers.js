exports.hexToRGB = (hex) => {
  // hex = string, ff0000, 2d2d2d, 0000ff
  // 233456
  // fff
  // r -> = 0x23, g-> 0x34, b-> 0x56
  if (!hex.match(/^#([A-Fa-f0-9]{6})$/)) {
    return;
  }

  const r = `0x${hex[1]}${hex[2]}`;
  const g = `0x${hex[3]}${hex[4]}`;
  const b = `0x${hex[5]}${hex[6]}`;

  // +r -> number

  return `rgb(${+r},${+g},${+b})`;
};

// const rgbColor = Color.rgb(3, 252, 11);
// const [h, s, v] = rgbColor.hsv().color;

// // HSV - HSB

// // HUE = DEGREES => INTEGERS (0, 65535)
// // SAT = PERCENTAGES  => INTEGERS (0, 254)
// // BRIGHTNESS/VALUE = PERCENTAGES => INTEGERS (0, 254)

// // 360 => 65535
// // 121.92 => X    X = 65535 * 121.92 / 360

exports.HSB = (h, s, v) => {
  return [
    parseInt((65535 * h) / 360, 10),
    parseInt(254 * (s / 100), 10),
    parseInt(254 * (v / 100), 10),
  ];
};
