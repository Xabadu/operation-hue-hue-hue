exports.hexToRGB = (hex) => {
  // hex = string, ff0000, 2d2d2d, 0000ff
  // 233456
  // fff
  // r -> = 0x23, g-> 0x34, b-> 0x56
  if (hex.length < 3 || hex.length > 6) {
    return;
  }

  const r = hex.length === 3 ? `0x${hex[0]}${hex[0]}` : `0x${hex[0]}${hex[1]}`;
  const g = hex.length === 3 ? `0x${hex[1]}${hex[1]}` : `0x${hex[2]}${hex[3]}`;
  const b = hex.length === 3 ? `0x${hex[2]}${hex[2]}` : `0x${hex[4]}${hex[5]}`;

  // +r -> number

  return `rgb(${+r},${+g},${+b})`;
};

//TODO: add eng translate and more colors
exports.COLORS = {
  BLANCO: "rgb(255, 255, 255)",
  ROJO: "rgb(255, 0, 0)",
  VERDE: "rgb(0, 255, 0)",
  AZUL: "rgb(0, 0, 255)",
  MORADO: "rgb(138, 9, 237)",
  AMARILLO: "rgb(230, 230, 16)",
  CYAN: "rgb(3,248,252)",
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
