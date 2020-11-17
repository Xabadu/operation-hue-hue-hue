require("dotenv").config();

const tmi = require("tmi.js");

const { hexToRGB, COLORS } = require("./hue_colors");
const { updateColorLights, setColorLoop } = require("./hue_commands");

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: process.env.TWITCH_CHANNELS.split(","),
});

client.connect();

client.on("message", (channel, tags, message, self) => {
  // !color rgb(255, 255, 255)
  // !color #ffffff #fff
  // !color blue

  let rgbColorMessage;
  if (message.startsWith("!color")) {
    // comando para cambiar la luz
    colorMessage = message.split("!color ")[1];

    if (COLORS.hasOwnProperty(colorMessage.toUpperCase())) {
      rgbColorMessage = COLORS[colorMessage.toUpperCase()];
    }
    if (message.indexOf("rgb") !== -1) {
      rgbColorMessage = colorMessage;
    }
    if (message.indexOf("#") !== -1) {
      rgbColorMessage = hexToRGB(message.split("!color #")[1]);
    }

    if (rgbColorMessage) {
      updateColorLights(rgbColorMessage);
    }
  }
  // !loop
  if (message.startsWith("!loop")) {
    setColorLoop(true);
  }
});
