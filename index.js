const axios = require("axios");
const Color = require("color");
const tmi = require("tmi.js");

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: ["xabadu"],
});

client.connect();

function hexToRGB(hex) {
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
}

client.on("message", (channel, tags, message, self) => {
  // !color rgb(255, 255, 255)
  // !color #ffffff #fff

  // !loop
  let parsedMessage;
  if (message.startsWith("!color")) {
    // comando para cambiar la luz
    if (message.indexOf("rgb") !== -1) {
      parsedMessage = message.split("!color ")[1];
    }
    if (message.indexOf("#") !== -1) {
      parsedMessage = hexToRGB(message.split("!color #")[1]);
    }

    const rgbColor = Color.rgb(parsedMessage);
    const [h, s, v] = rgbColor.hsv().color;

    axios({
      method: "put",
      url:
        "http://10.0.0.220/api/G-vbAfzffh30DzmkuLzpMc1YV74rWFCxIgpQcKeo/lights/6/state",
      data: {
        on: true,
        hue: parseInt((65535 * h) / 360, 10),
        sat: parseInt(254 * (s / 100), 10),
        bri: parseInt(254 * (v / 100), 10),
        transitiontime: 10,
      },
    })
      .then((res) => console.log("res", res.status))
      .catch((err) => console.log(err));
  }
  if (message.startsWith("!loop")) {
    axios({
      method: "put",
      url:
        "http://10.0.0.220/api/G-vbAfzffh30DzmkuLzpMc1YV74rWFCxIgpQcKeo/lights/6/state",
      data: {
        on: true,
        effect: "colorloop",
      },
    })
      .then((res) => console.log("res", res.status))
      .catch((err) => console.log(err));
  }
});

// const rgbColor = Color.rgb(3, 252, 11);
// const [h, s, v] = rgbColor.hsv().color;

// // HSV - HSB

// // HUE = DEGREES => INTEGERS (0, 65535)
// // SAT = PERCENTAGES  => INTEGERS (0, 254)
// // BRIGHTNESS/VALUE = PERCENTAGES => INTEGERS (0, 254)

// // 360 => 65535
// // 121.92 => X    X = 65535 * 121.92 / 360
